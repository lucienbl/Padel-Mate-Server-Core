import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { AwsModule } from '@/aws/aws.module';
import { ClubRepository } from '@/clubs/repositories/club.repository';

@Module({
  imports: [AwsModule],
  controllers: [ClubsController],
  providers: [ClubsService, ClubRepository],
  exports: [ClubsService, ClubRepository],
})
export class ClubsModule {}
