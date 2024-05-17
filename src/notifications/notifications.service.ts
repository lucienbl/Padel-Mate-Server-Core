import { Injectable, Logger } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { User } from '@/entities/user.entity';
import { LocalizationService } from '@/localization/localization.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly localizationService: LocalizationService) {}

  private getNotificationTitle = (
    type: string,
    data: any,
    locale: string,
  ): string => {
    return this.localizationService.getString(
      `${type.toLowerCase()}_title`,
      locale,
      data,
    );
  };

  private getNotificationBody = (
    type: string,
    data: any,
    locale: string,
  ): string => {
    return this.localizationService.getString(
      `${type.toLowerCase()}_body`,
      locale,
      data,
    );
  };

  async sendUserNotification(
    user: Partial<User>,
    type?: string,
    payload: any = {},
    uri?: string,
  ) {
    // eslint-disable-next-line prefer-const
    let { body, title, ...data } = payload;

    this.logger.log(
      `Sending ${type} with ${JSON.stringify(payload)} to ${
        user.firstName ? `${user.firstName} ${user.lastName}` : user.phoneNumber
      } (${user.id})`,
    );

    if (!title) {
      title = this.getNotificationTitle(type, data, user.locale);
    }

    if (!body) {
      body = this.getNotificationBody(type, data, user.locale);
    }

    if (user.fcmToken) {
      const data: any = {};
      if (type) {
        data.type = type;
      }
      if (uri) {
        data.uri = uri;
      }
      return messaging().sendToDevice(user.fcmToken, {
        notification: {
          title,
          body,
          sound: 'default',
          //badge: '1',
        },
        data,
      });
    }

    return null;
  }
}
