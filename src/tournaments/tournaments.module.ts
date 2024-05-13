import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { AwsModule } from '@/aws/aws.module';
import { TournamentRepository } from '@/tournaments/repositories/tournament.repository';

@Module({
  imports: [AwsModule],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentRepository],
  exports: [TournamentsService, TournamentRepository],
})
export class TournamentsModule {}
