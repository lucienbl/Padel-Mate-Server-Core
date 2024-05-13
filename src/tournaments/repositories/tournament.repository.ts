import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Tournament } from '@/entities/tournament.entity';

@Injectable()
export class TournamentRepository extends Repository<Tournament> {
  constructor(private dataSource: DataSource) {
    super(Tournament, dataSource.createEntityManager());
  }
}
