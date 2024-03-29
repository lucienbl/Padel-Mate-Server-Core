import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Module({
  imports: [],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
