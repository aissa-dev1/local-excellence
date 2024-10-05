import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserV1 } from './user.schema';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { CreateUserV1Dto } from './user.dto';
import { UserV1Document } from './user.types';

@Injectable()
export class UserServiceV1 {
  constructor(
    @InjectModel(UserV1.name) private readonly userModel: Model<UserV1>,
  ) {}

  async createUser(dto: CreateUserV1Dto): Promise<UserV1Document> {
    const createdUser = await this.userModel.create(dto);
    await createdUser.save();
    return createdUser;
  }

  findAll(
    filter?: RootFilterQuery<UserV1>,
    projection?: ProjectionType<UserV1>,
    options?: QueryOptions<UserV1> & { lean: true },
  ): Promise<UserV1Document[]> {
    return this.userModel.find(filter, projection, options);
  }

  findOne(
    filter?: RootFilterQuery<UserV1>,
    projection?: ProjectionType<UserV1>,
    options?: QueryOptions<UserV1> & { lean: true },
  ): Promise<UserV1Document | null> {
    return this.userModel.findOne(filter, projection, options);
  }

  findOneByEmail(
    email: string,
    projection?: ProjectionType<UserV1>,
    options?: QueryOptions<UserV1> & { lean: true },
  ): Promise<UserV1Document | null> {
    return this.findOne({ email }, projection, options);
  }
}
