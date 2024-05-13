import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { UsersRepository } from './repositories/users.repository';
import { User } from '@/entities/user.entity';
import { auth } from 'firebase-admin';
import { AwsService } from '@/aws/aws.service';
import { Transactional } from 'typeorm-transactional';
import { verifyMedia } from '@/utils/media';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly awsService: AwsService,
  ) {}

  @Transactional()
  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { phoneNumber } = await auth().getUser(registerUserDto.firebaseUid);
    return this.usersRepository.registerUser(registerUserDto, phoneNumber);
  }

  async findUserByFirebaseUid(firebaseUid: string) {
    return this.usersRepository.findUserByFirebaseUid(firebaseUid);
  }

  async getAllUsers() {
    return this.usersRepository.find({ order: { firstName: 'ASC' } });
  }

  async updateUserDevice(
    user: User,
    updateUserDeviceDto: UpdateUserDeviceDto,
  ): Promise<User> {
    return this.usersRepository.updateUserDevice(user, updateUserDeviceDto);
  }

  async getMe(user: User) {
    return user;
  }

  async setAvatar(user: User, media: Buffer) {
    const { extension, id } = await verifyMedia(media, ['image']);

    if (user.avatarStorageKey) {
      await this.awsService.s3
        .deleteObject({
          Bucket: process.env.MEDIAS_BUCKET_NAME,
          Key: user.avatarStorageKey,
        })
        .promise();
    }

    const uploadResult = await this.awsService.s3
      .upload({
        Bucket: process.env.MEDIAS_BUCKET_NAME,
        Body: media,
        Key: `${process.env.MODE}/users/${user.id}/avatar-${id}.${extension}`,
        ACL: 'private',
      })
      .promise();

    return this.usersRepository.setAvatar(user, uploadResult.Key);
  }

  @Transactional()
  async deleteUser(user: User): Promise<any> {
    if (process.env.MODE === 'prod') {
      await auth().deleteUser(user.firebaseUid);
    }

    // TODO delete actions

    return this.usersRepository.deleteUser(user);
  }
}
