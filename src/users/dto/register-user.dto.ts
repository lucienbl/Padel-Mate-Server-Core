import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  readonly firebaseUid: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsDateString()
  readonly birthdate: Date;
}
