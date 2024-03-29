import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Roles, User } from '@/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateUserDeviceDto } from '../dto/update-user-device.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Set user avatar
   *
   * @param user
   * @param storageKey
   */
  async setAvatar(user: User, storageKey: string): Promise<User> {
    user.avatarStorageKey = storageKey;

    return this.save(user);
  }

  /**
   * Register a new user
   *
   * @param registerUserDto
   * @param phoneNumber
   */
  async registerUser(
    registerUserDto: RegisterUserDto,
    phoneNumber: string,
  ): Promise<User> {
    const userEntity = new User();
    userEntity.firebaseUid = registerUserDto.firebaseUid;
    userEntity.firstName = registerUserDto.firstName.trim();
    userEntity.lastName = registerUserDto.lastName.trim();
    userEntity.phoneNumber = phoneNumber;
    userEntity.birthdate = registerUserDto.birthdate;

    return this.save(userEntity);
  }

  /**
   * Update a users device information
   *
   * @param user
   * @param updateUserDeviceDto
   */
  async updateUserDevice(
    user: User,
    updateUserDeviceDto: UpdateUserDeviceDto,
  ): Promise<User> {
    user.fcmToken = updateUserDeviceDto.fcmToken;
    user.locale = updateUserDeviceDto.locale;

    return this.save(user);
  }

  /**
   * Return user by firebase UID
   *
   * @param firebaseUid
   */
  async findUserByFirebaseUid(firebaseUid: string): Promise<User> {
    return this.findOne({
      where: { firebaseUid },
    });
  }

  /**
   * Delete a user
   *
   * @param user
   */
  async deleteUser(user: User): Promise<any> {
    user.firebaseUid = null;
    user.fcmToken = null;
    user.roles = Roles.DELETED;
    user.phoneNumber = null;

    await this.save(user);

    return this.softDelete({ id: user.id });
  }

  /**
   * Return a user by its phone number
   *
   * @param phoneNumber
   */
  async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.findOne({ where: { phoneNumber } });
  }

  /**
   * Return a user by its ID
   *
   * @param id
   */
  async findUserById(id: string): Promise<User> {
    return this.findOne({ where: { id } });
  }
}
