import { Column, Entity, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { User } from '@/entities/user.entity';
import { Tournament } from '@/entities/tournament.entity';

@Entity()
@Exclude()
export class Round extends BaseEntity {
  @ManyToOne(() => Tournament, (tournament) => tournament.rounds)
  @Expose()
  tournament: Tournament;
}
