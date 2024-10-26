import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SponsorServiceV1 } from './sponsor.service';
import { CreateSponsorV1Dto } from './sponsor.dto';
import { StoreServiceV1 } from '../store/store.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SponsorV1 } from './sponsor.schema';
import { Request as RequestType } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWTUserV1Type } from '../user/user.types';

@Controller({ path: 'sponsors', version: '1' })
export class SponsorControllerV1 {
  constructor(
    private readonly sponsorService: SponsorServiceV1,
    private readonly storeService: StoreServiceV1,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getSponsors(): Promise<SponsorV1[]> {
    return this.sponsorService.findMany();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSponsor(
    @Body() dto: CreateSponsorV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const store = await this.storeService.findOne({
      filter: {
        _id: dto.storeId,
      },
    });
    const sponsor = await this.sponsorService.findOne({
      filter: {
        storeId: dto.storeId,
      },
    });

    if (!store) {
      throw new UnauthorizedException(
        'No store found, you cannot create a sponsor without a store',
      );
    }
    if (sponsor) {
      throw new UnauthorizedException('Sponsor from this store already exists');
    }
    if (store.userId !== (req.user as JWTUserV1Type).sub) {
      throw new UnauthorizedException(
        'You are not authorized to create a sponsor from this store',
      );
    }

    await this.sponsorService.createSponsor(dto, store._id.toString());
    return `Sponsor from ${store.name} created successfully`;
  }

  // TODO: delete this endpoint
  @Post('setup')
  @UseGuards(JwtAuthGuard)
  async setupSponsors(): Promise<string> {
    await this.sponsorService.deleteMany();
    return 'Sponsors setted up successfully';
  }
}
