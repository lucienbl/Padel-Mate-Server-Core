import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Club } from '@/entities/club.entity';

@Injectable()
export class ClubRepository extends Repository<Club> {
  constructor(private dataSource: DataSource) {
    super(Club, dataSource.createEntityManager());
  }
}
