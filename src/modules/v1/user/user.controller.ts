import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserServiceV1 } from './user.service';
import { UserV1 } from './user.schema';

@Controller({ path: 'users', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserServiceV1) {}

  // TODO: delete this endpoint
  @Get()
  getUsers(): Promise<UserV1[]> {
    return this.userService.findManyWithoutPassword();
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: string): Promise<UserV1> {
    const user = await this.userService.findOneWithoutPassword({
      filter: { _id: id },
    });

    if (!user) {
      throw new NotFoundException('No user found with this id');
    }

    return user;
  }

  @Get('minimized/:id')
  async getMinimizedUser(@Param('id') id: string): Promise<UserV1> {
    const user = await this.userService.findOneWithoutPassword({
      filter: { _id: id },
      projection: {
        email: false,
      },
    });

    if (!user) {
      throw new NotFoundException('No user found with this id');
    }

    return user;
  }

  // TODO: delete this endpoint
  @Post('setup')
  async setupUsers(): Promise<string> {
    await this.userService.deleteMany();
    return 'ok';
  }
}
