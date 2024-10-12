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
import { Request as RequestType } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWTUserV1Type } from '../user/user.types';
import { StoreServiceV1 } from '../store/store.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SponsorV1 } from './sponsor.schema';

@Controller({ path: 'sponsors', version: '1' })
export class SponsorControllerV1 {
  constructor(
    private readonly sponsorService: SponsorServiceV1,
    private readonly jwtService: JwtService,
    private readonly storeService: StoreServiceV1,
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedUser = await this.jwtService.verifyAsync<JWTUserV1Type>(token);
    const userStore = await this.storeService.findOne({
      filter: {
        ownerId: decodedUser.sub,
      },
    });

    if (!userStore) {
      throw new UnauthorizedException(
        'You cannot create sponsor without store',
      );
    }

    const createdSponsor = await this.sponsorService.createSponsor(dto, {
      id: decodedUser.sub,
      storeName: userStore.name,
    });
    return `Sponsor from ${createdSponsor.ownerStoreName} created successfully`;
  }
}
