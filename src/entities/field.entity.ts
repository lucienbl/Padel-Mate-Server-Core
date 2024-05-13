import { Column, Entity, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Club } from '@/entities/club.entity';

@Entity()
@Exclude()
export class Field extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @ManyToOne(() => Club, (club) => club.fields)
  club: Club;
}
