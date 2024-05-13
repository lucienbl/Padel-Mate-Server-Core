import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { AwsService } from '@/aws/aws.service';
import { Player } from '@/entities/player.entity';

export enum Roles {
  DELETED = 1 << 0,
  USER = 1 << 1,
  ADMIN = 1 << 2,
}

@Entity()
@Exclude()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: true })
  firebaseUid: string | null;

  @Column({ nullable: false })
  @Expose()
  firstName: string;

  @Column({ nullable: false })
  @Expose()
  @Transform(({ options, value }) => {
    if (!value) return;
    if (!options.groups?.includes('private')) {
      return value[0] + '.';
    } else {
      return value;
    }
  })
  lastName: string;

  @Column({
    nullable: true,
    unique: true,
  })
  @Expose({
    groups: ['private'],
  })
  phoneNumber: string | null;

  @Column()
  @Expose({
    groups: ['private'],
  })
  birthdate: Date;

  @Column({ nullable: false, default: 'fr' })
  @Expose({
    groups: ['private'],
  })
  locale: string;

  @Column({ nullable: true })
  avatarStorageKey: string;

  @Expose()
  get avatarUrl(): string {
    if (!this.avatarStorageKey) return undefined;
    return new AwsService().s3.getSignedUrl('getObject', {
      Bucket: process.env.MEDIAS_BUCKET_NAME,
      Key: this.avatarStorageKey,
      Expires: 60 * 5,
    });
  }

  hasRole(role: Roles) {
    return (this.roles & role) === role;
  }

  addRole(role: Roles) {
    return this.roles | role;
  }

  removeRole(role: Roles) {
    return this.roles & ~role;
  }

  @Column({ nullable: true })
  fcmToken: string | null;

  @Column({ default: Roles.USER })
  @Expose()
  roles: number;

  @OneToMany(() => Player, (player) => player.user)
  games: Player[];
}
