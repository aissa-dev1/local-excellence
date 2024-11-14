import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SponsorServiceV1 } from './sponsor.service';
import { CreateSponsorV1Dto, ICreateSponsorV1Dto } from './sponsor.dto';
import { StoreServiceV1 } from '../store/store.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SponsorV1 } from './sponsor.schema';
import { Request as RequestType } from 'express';
import { JWTUserV1Type } from '../user/user.types';
import { isValidCSSColor } from 'src/utils/is-valid-css-color';
import { TranslationManager } from 'src/utils/translation-manager';
import { sponsorV1Translation } from './sponsor.translation';
import { validateDto } from 'src/utils/validate-dto';

@Controller({ path: 'sponsors', version: '1' })
export class SponsorControllerV1 {
  private readonly translation = new TranslationManager({
    translation: sponsorV1Translation,
    language: 'en',
  });

  constructor(
    private readonly sponsorService: SponsorServiceV1,
    private readonly storeService: StoreServiceV1,
  ) {}

  @Get()
  getSponsors(): Promise<SponsorV1[]> {
    return this.sponsorService.findMany();
  }

  @Get('storeId/:storeId')
  async getSponsorByStoreId(@Request() req: RequestType): Promise<SponsorV1> {
    const sponsor = await this.sponsorService.findOne({
      filter: {
        storeId: req.params.storeId,
      },
    });
    return sponsor;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSponsor(
    @Body() body: ICreateSponsorV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const dto = new CreateSponsorV1Dto(body);

    await validateDto(dto);

    this.translation.setLanguage(dto.language);

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
      throw new BadRequestException(
        this.translation.errors['cannot-create-sponsor-without-store'],
      );
    }
    if (store.userId !== (req.user as JWTUserV1Type).sub) {
      throw new UnauthorizedException(
        this.translation.errors['not-authorized-to-create'],
      );
    }
    if (sponsor) {
      throw new BadRequestException(this.translation.errors['sponsor-exists']);
    }
    if (!isValidCSSColor(dto.backgroundColor)) {
      throw new BadRequestException(this.translation.errors['invalid-bg']);
    }
    if (!isValidCSSColor(dto.color)) {
      throw new BadRequestException(this.translation.errors['invalid-color']);
    }
    if (dto.backgroundColor === dto.color) {
      throw new BadRequestException(
        this.translation.errors['bg-and-color-must-differ'],
      );
    }

    await this.sponsorService.createSponsor(dto, store._id.toString());
    return `${this.translation.messages['sponsor-from']} ${store.name} ${this.translation.messages['created-successfully']}`;
  }

  // TODO: delete this endpoint
  @Post('setup')
  @UseGuards(JwtAuthGuard)
  async setupSponsors(): Promise<string> {
    await this.sponsorService.deleteMany();
    return 'Sponsors setted up successfully';
  }
}
