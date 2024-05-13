import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { RolesAllowed } from '@/auth/decorators/roles.decorator';
import { FirebaseAuthGuard } from '@/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/entities/user.entity';

@ApiTags('Clubs')
@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get('/clubs')
  @RolesAllowed(Roles.USER)
  getAllUsers() {
    return this.clubsService.findAllClubs();
  }
}
