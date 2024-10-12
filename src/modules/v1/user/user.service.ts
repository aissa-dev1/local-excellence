import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserV1 } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserV1Dto } from './user.dto';
import { UserV1Document } from './user.types';
import { DBQueryFindParams } from 'src/modules/shared/types';

@Injectable()
export class UserServiceV1 {
  constructor(
    @InjectModel(UserV1.name) private readonly userModel: Model<UserV1>,
  ) {}

  async createUser(dto: CreateUserV1Dto): Promise<UserV1Document> {
    const createdUser = await this.userModel.create({
      ...dto,
      joinedAt: Date.now(),
    });
    await createdUser.save();
    return createdUser;
  }

  findMany(params: DBQueryFindParams<UserV1> = {}): Promise<UserV1Document[]> {
    return this.userModel.find(
      params.filter,
      params.projection,
      params.options,
    );
  }

  findOne(
    params: DBQueryFindParams<UserV1> = {},
  ): Promise<UserV1Document | null> {
    return this.userModel.findOne(
      params.filter,
      params.projection,
      params.options,
    );
  }

  findOneWithoutPassword(
    params: DBQueryFindParams<UserV1> = {},
  ): Promise<UserV1Document | null> {
    const projection: { [key: string]: number | boolean } = {
      password: false,
    };

    if (params.projection) {
      Object.assign(projection, params.projection);
    }

    return this.findOne({
      filter: params.filter,
      projection,
      options: params.options,
    });
  }
}
