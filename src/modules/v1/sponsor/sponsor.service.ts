import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SponsorV1 } from './sponsor.schema';
import { Model } from 'mongoose';
import {
  CreateSponsorV1OwnerOptions,
  SponsorV1Document,
} from './sponsor.types';
import { CreateSponsorV1Dto } from './sponsor.dto';
import { DBQueryFindParams } from 'src/modules/shared/types';

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

  findMany(
    params: DBQueryFindParams<SponsorV1> = {},
  ): Promise<SponsorV1Document[]> {
    return this.sponsorModel.find(
      params.filter,
      params.projection,
      params.options,
    );
  }

  findOne(
    params: DBQueryFindParams<SponsorV1> = {},
  ): Promise<SponsorV1Document | null> {
    return this.sponsorModel.findOne(
      params.filter,
      params.projection,
      params.options,
    );
  }
}
