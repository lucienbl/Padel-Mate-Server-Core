import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty()
  @IsUUID()
  readonly clubId: string;

  @ApiProperty()
  @IsDateString()
  readonly startDate: string;

  @ApiProperty()
  @IsDateString()
  readonly endDate: string;

  @ApiProperty()
  @IsArray()
  readonly fieldIds: string[];

  @ApiProperty()
  @IsNumber()
  readonly points: number;

  @ApiProperty()
  @IsArray()
  readonly playerIds: string[];

  @ApiProperty()
  @IsString()
  readonly tournamentOption: 'Classic';

  @ApiProperty()
  @IsString()
  readonly tournamentType: 'Americano';

  @ApiProperty()
  @IsString()
  readonly name: string;
}
