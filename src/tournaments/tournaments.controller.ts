import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TournamentsService } from './tournaments.service';
import { RolesAllowed } from '@/auth/decorators/roles.decorator';
import { FirebaseAuthGuard } from '@/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles, User } from '@/entities/user.entity';
import { GetUser } from '@/users/decorators/get-user.decorator';
import { CreateTournamentDto } from '@/tournaments/dto/create-tournament.dto';

@ApiTags('Tournaments')
@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get('/tournaments')
  @RolesAllowed(Roles.USER)
  getTournaments(@GetUser() user: User) {
    return this.tournamentsService.findTournaments(user);
  }

  @Post('/tournaments')
  @RolesAllowed(Roles.USER)
  createTournament(
    @GetUser() user: User,
    @Body() createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentsService.createTournament(user, createTournamentDto);
  }
}
