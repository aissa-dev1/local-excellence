import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserControllerV1 } from 'src/modules/v1/user/user.controller';
import { UserSchemaV1, UserV1 } from 'src/modules/v1/user/user.schema';
import { UserServiceV1 } from 'src/modules/v1/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserV1.name,
        schema: UserSchemaV1,
      },
    ]),
  ],
  providers: [UserServiceV1],
  controllers: [UserControllerV1],
  exports: [UserServiceV1],
})
export class UserModule {}
