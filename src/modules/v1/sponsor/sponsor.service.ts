import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SponsorV1 } from './sponsor.schema';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import {
  CreateSponsorV1OwnerOptions,
  SponsorV1Document,
} from './sponsor.types';
import { CreateSponsorV1Dto } from './sponsor.dto';

@Injectable()
export class SponsorServiceV1 {
  constructor(
    @InjectModel(SponsorV1.name)
    private readonly sponsorModel: Model<SponsorV1>,
  ) {}

  async createSponsor(
    dto: CreateSponsorV1Dto,
    ownerOptions: CreateSponsorV1OwnerOptions,
  ): Promise<SponsorV1Document> {
    const createdSponsor = await this.sponsorModel.create({
      ...dto,
      ownerId: ownerOptions.id,
      ownerStoreName: ownerOptions.storeName,
    });
    await createdSponsor.save();
    return createdSponsor;
  }

  findAll(
    filter?: RootFilterQuery<SponsorV1>,
    projection?: ProjectionType<SponsorV1>,
    options?: QueryOptions<SponsorV1>,
  ): Promise<SponsorV1Document[]> {
    return this.sponsorModel.find(filter, projection, options);
  }

  findOne(
    filter?: RootFilterQuery<SponsorV1>,
    projection?: ProjectionType<SponsorV1>,
    options?: QueryOptions<SponsorV1>,
  ): Promise<SponsorV1Document | null> {
    return this.sponsorModel.findOne(filter, projection, options);
  }
}
