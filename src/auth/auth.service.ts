import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from 'firebase-admin';
import { User } from '@/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getUserFromBearerToken(token: string): Promise<User> {
    try {
      const firebaseUser: any = await auth().verifyIdToken(token, true);
      return this.usersService.findUserByFirebaseUid(firebaseUser.uid);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
