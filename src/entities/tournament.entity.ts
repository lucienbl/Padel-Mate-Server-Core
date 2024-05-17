import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Club } from '@/entities/club.entity';
import { Field } from '@/entities/field.entity';
import { User } from '@/entities/user.entity';
import { Player } from '@/entities/player.entity';
import { Round } from '@/entities/round.entity';

@Entity()
@Exclude()
export class Tournament extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @ManyToOne(() => Club, (club) => club.fields)
  @Expose()
  club: Club;

  @Column()
  @Expose()
  startDate: Date;

  @Column()
  @Expose()
  endDate: Date;

  @ManyToMany(() => Field)
  @Expose()
  @JoinTable()
  fields: Field[];

  @Column()
  @Expose()
  points: number;

  @Column()
  @Expose()
  option: 'Classic';

  @Column()
  @Expose()
  type: 'Americano';

  @OneToMany(() => Player, (player) => player.tournament, {
    cascade: true,
  })
  @Expose()
  players: Player[];

  @OneToMany(() => Round, (round) => round.tournament, {
    cascade: true,
  })
  @Expose()
  rounds: Round[];

  @ManyToOne(() => User)
  @Expose()
  author: User;
}
