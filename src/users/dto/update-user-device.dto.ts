import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDeviceDto {
  @ApiProperty()
  @IsString()
  readonly fcmToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly locale?: string;
}
