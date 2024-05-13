import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { AwsModule } from '@/aws/aws.module';
import { NotificationsModule } from '@/notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard } from '@/utils/rate-limiter.guard';
import { MailModule } from '@/mail/mail.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import dataSource from '@/ormconfig';
import { ClubsModule } from '@/clubs/clubs.module';
import { TournamentsModule } from '@/tournaments/tournaments.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...config,
          autoLoadEntities: true,
        };
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(dataSource);
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    MailModule,
    AwsModule,
    NotificationsModule,
    ClubsModule,
    TournamentsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
