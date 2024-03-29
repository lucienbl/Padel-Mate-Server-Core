import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { LocalizationModule } from '@/localization/localization.module';

@Module({
  imports: [LocalizationModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
