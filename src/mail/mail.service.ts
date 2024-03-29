import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { LocalizationService } from '@/localization/localization.service';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly localizationService: LocalizationService,
  ) {}

  async sendWelcomeEmail(name: string, email: string, locale: string) {
    try {
      return this.mailerService.sendMail({
        to: email,
        subject: this.localizationService.getString(
          'mail_welcome_subject',
          locale,
        ),
        text: this.localizationService.getString('mail_welcome_body', locale, {
          name,
        }),
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
