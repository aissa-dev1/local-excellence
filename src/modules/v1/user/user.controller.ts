import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserServiceV1 } from './user.service';
import { UserV1 } from './user.schema';

@Controller({ path: 'users', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserServiceV1) {}

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
}
