import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { UsersModule } from '@/users/users.module';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-auth' }),
    forwardRef(() => UsersModule),
  ],
  providers: [FirebaseAuthStrategy, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
