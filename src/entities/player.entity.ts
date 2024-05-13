import { Column, Entity, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { User } from '@/entities/user.entity';
import { Tournament } from '@/entities/tournament.entity';

@Entity()
@Exclude()
export class Player extends BaseEntity {
  @ManyToOne(() => User, (user) => user.games)
  @Expose()
  user: User;

  @Column()
  @Expose()
  points: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.players)
  @Expose()
  tournament: Tournament;
}
