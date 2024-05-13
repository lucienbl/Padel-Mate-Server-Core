import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { RolesAllowed } from '@/auth/decorators/roles.decorator';
import { FirebaseAuthGuard } from '@/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Public } from '@/auth/decorators/public.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { Roles, User } from '@/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/users/register')
  @Public()
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Get('/users')
  @RolesAllowed(Roles.USER)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/@me')
  @SerializeOptions({
    groups: ['private'],
  })
  @RolesAllowed(Roles.USER)
  getMe(@GetUser() user: User) {
    return this.usersService.getMe(user);
  }

  @Delete('/@me')
  @RolesAllowed(Roles.USER)
  deleteUser(@GetUser() user: User) {
    return this.usersService.deleteUser(user);
  }

  @Post('/@me/avatar')
  @RolesAllowed(Roles.USER)
  @UseInterceptors(FileInterceptor('file'))
  setUserAvatar(
    @GetUser() user: User,
    @UploadedFile() media: Express.Multer.File,
  ) {
    return this.usersService.setAvatar(user, media.buffer);
  }

  @Put('/@me/device')
  @RolesAllowed(Roles.USER)
  updateUserDevice(
    @GetUser() user: User,
    @Body() updateUserDeviceDto: UpdateUserDeviceDto,
  ) {
    return this.usersService.updateUserDevice(user, updateUserDeviceDto);
  }
}
