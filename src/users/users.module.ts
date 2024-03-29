import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AwsModule } from '@/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
