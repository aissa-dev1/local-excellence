import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SponsorV1 } from './sponsor.schema';
import { Model } from 'mongoose';
import { SponsorV1Document } from './sponsor.types';
import { CreateSponsorV1Dto } from './sponsor.dto';
import {
  DBQueryDeleteParams,
  DBQueryFindParams,
} from 'src/modules/shared/types';

@Injectable()
export class SponsorServiceV1 {
  constructor(
    @InjectModel(SponsorV1.name)
    private readonly sponsorModel: Model<SponsorV1>,
  ) {}

  async createSponsor(
    dto: CreateSponsorV1Dto,
    storeId: string,
  ): Promise<SponsorV1Document> {
    const createdSponsor = await this.sponsorModel.create({
      ...dto,
      storeId,
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

  deleteMany(
    params: DBQueryDeleteParams<SponsorV1> = {},
  ): Promise<{ deletedCount?: number }> {
    return this.sponsorModel.deleteMany(params.filter, params.options);
  }
}
