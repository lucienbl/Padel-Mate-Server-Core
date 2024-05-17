import { Injectable } from '@nestjs/common';
import { TournamentRepository } from './repositories/tournament.repository';
import { User } from '@/entities/user.entity';
import { CreateTournamentDto } from '@/tournaments/dto/create-tournament.dto';
import { Tournament } from '@/entities/tournament.entity';
import { Player } from '@/entities/player.entity';
import { Field } from '@/entities/field.entity';
import { Club } from '@/entities/club.entity';

@Injectable()
export class TournamentsService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}

  async findTournaments(user: User) {
    return this.tournamentRepository.find({
      where: { players: { user: { id: user.id } } },
    });
  }

  async createTournament(user: User, createTournamentDto: CreateTournamentDto) {
    const tournament = new Tournament();
    tournament.players = createTournamentDto.playerIds.map((id) => {
      const player = new Player();
      player.user = new User();
      player.user.id = id;
      player.points = 0;

      return player;
    });
    tournament.fields = createTournamentDto.fieldIds.map((fieldId) => {
      const field = new Field();
      field.id = fieldId;

      return field;
    });
    const club = new Club();
    club.id = createTournamentDto.clubId;
    tournament.club = club;

    tournament.points = createTournamentDto.points;
    tournament.endDate = new Date(createTournamentDto.endDate);
    tournament.startDate = new Date(createTournamentDto.startDate);
    tournament.name = createTournamentDto.name;
    tournament.option = createTournamentDto.tournamentOption;
    tournament.type = createTournamentDto.tournamentType;
    tournament.author = user;

    //TODO organize rounds & matchmaking

    return this.tournamentRepository.save(tournament);
  }
}
