import { Injectable } from '@nestjs/common';
import { ClubRepository } from './repositories/club.repository';

@Injectable()
export class ClubsService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async findAllClubs() {
    return this.clubRepository.find({ order: { name: 'ASC' } });
  }
}
