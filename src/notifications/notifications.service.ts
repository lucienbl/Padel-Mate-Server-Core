import { Injectable, Logger } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { User } from '@/entities/user.entity';
import { LocalizationService } from '@/localization/localization.service';

@Injectable()
export class NotificationsService {
  // notification types here
  public static NOTIFICATION_ALBUM_START_SOON = 'NOTIFICATION_ALBUM_START_SOON';
  public static NOTIFICATION_ALBUM_ONGOING = 'NOTIFICATION_ALBUM_ONGOING';
  public static NOTIFICATION_ALBUM_END_SOON = 'NOTIFICATION_ALBUM_END_SOON';
  public static NOTIFICATION_ALBUM_REVIEWED = 'NOTIFICATION_ALBUM_REVIEWED';
  public static NOTIFICATION_ALBUM_USER_JOINED =
    'NOTIFICATION_ALBUM_USER_JOINED';
  public static NOTIFICATION_ALBUM_CREATE_REMINDER =
    'NOTIFICATION_ALBUM_CREATE_REMINDER';

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
