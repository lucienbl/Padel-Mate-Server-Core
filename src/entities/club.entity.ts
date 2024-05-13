import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Field } from '@/entities/field.entity';

@Entity()
@Exclude()
export class Club extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @OneToMany(() => Field, (field) => field.club, {
    eager: true,
  })
  @Expose()
  fields: Field[];
}
