import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StoreServiceV1 } from './store.service';
import { CreateStoreV1Dto, ICreateStoreV1Dto } from './store.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JWTUserV1Type } from '../user/user.types';
import { Request as RequestType } from 'express';
import { decodeStoreName } from 'src/utils/store-name';
import { StoreV1 } from './store.schema';
import { STORE_V1_TYPE } from './store.constants';
import { hasSpecialCharacters } from 'src/utils/has-special-characters';
import { TranslationManager } from 'src/utils/translation-manager';
import { storeV1Translation } from './store.translation';
import { TranslationLanguage } from 'src/types/translation';
import { validateDto } from 'src/utils/validate-dto';

@Controller({ path: 'stores', version: '1' })
export class StoreControllerV1 {
  private readonly homeStoresSize = 6;
  private readonly translation = new TranslationManager({
    translation: storeV1Translation,
    language: 'en',
  });

  constructor(private readonly storeService: StoreServiceV1) {}

  @Get()
  getStores(): Promise<StoreV1[]> {
    return this.storeService.findMany();
  }

  @Get('/paginated')
  async getPaginatedStores(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<StoreV1[]> {
    const stores = await this.storeService.getPaginatedStores(page, limit);
    return stores;
  }

  @Get('/size')
  async getStoresSize(): Promise<number> {
    const stores = await this.storeService.findMany();
    return stores.length;
  }

  @Get('/home')
  async getHomeStores(): Promise<StoreV1[]> {
    const stores = await this.storeService.getRandomStores();
    const homeStores = stores.slice(0, this.homeStoresSize);
    return homeStores;
  }

  @Get('types')
  async getStoreTypes(): Promise<string[]> {
    return Object.values(STORE_V1_TYPE);
  }

  @Get('/userId/:userId')
  async getUserStoresById(@Request() req: RequestType): Promise<StoreV1[]> {
    return this.storeService.findMany({
      filter: {
        userId: req.params.userId,
      },
    });
  }

  @Get('/name/:name')
  async getStoreByName(
    @Request() req: RequestType,
    @Param('language') language: TranslationLanguage = 'en',
  ): Promise<StoreV1> {
    this.translation.setLanguage(language);

    const store = await this.storeService.findOne({
      filter: {
        name: decodeStoreName(req.params.name),
      },
    });

    if (!store) {
      throw new NotFoundException(this.translation.errors['store-not-found']);
    }

    return store;
  }

  @Get('/id/:id')
  async getStoreById(
    @Request() req: RequestType,
    @Param('language') language: TranslationLanguage = 'en',
  ): Promise<StoreV1> {
    this.translation.setLanguage(language);

    const store = await this.storeService.findOne({
      filter: {
        _id: req.params.id,
      },
    });

    if (!store) {
      throw new NotFoundException(this.translation.errors['store-not-found']);
    }

    return store;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStore(
    @Body() body: ICreateStoreV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const dto = new CreateStoreV1Dto(body);

    await validateDto(dto);

    this.translation.setLanguage(dto.language);

    const store = await this.storeService.findOne({
      filter: {
        name: dto.name,
      },
    });

    if (store) {
      throw new BadRequestException(
        this.translation.errors['store-name-already-exists'],
      );
    }
    if (hasSpecialCharacters(dto.name)) {
      throw new BadRequestException(
        this.translation.errors['store-name-special-characters'],
      );
    }

    const createdStore = await this.storeService.createStore(
      dto,
      (req.user as JWTUserV1Type).sub,
    );
    return `${this.translation.messages['store']} ${createdStore.name} ${this.translation.messages['created-successfully']}`;
  }

  @Post('/search')
  async searchStores(@Query('query') query: string): Promise<StoreV1[]> {
    const stores = await this.storeService.findMany({
      filter: {
        name: { $regex: query, $options: 'i' },
      },
    });
    return stores;
  }

  // TODO: delete this endpoint
  @Post('/setup')
  @UseGuards(JwtAuthGuard)
  async setupStores(@Request() req: RequestType) {
    await this.storeService.deleteMany();
    return 'Stores setted up successfully';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const types = Object.values(STORE_V1_TYPE);
    const foundCharacters = [];

    const randomCharacter = () => {
      const foundChar = characters.charAt(
        Math.floor(Math.random() * characters.length),
      );

      if (!foundCharacters.includes(foundChar)) {
        foundCharacters.push(foundChar);
        return foundChar;
      }

      return randomCharacter();
    };
    const randomType = () => {
      return types[Math.floor(Math.random() * types.length)];
    };

    for (let i = 0; i < 20; i++) {
      await this.storeService.createStore(
        {
          name: `${randomCharacter()} Store ${i + 1}`,
          description: `This is a store description ${i + 1}`,
          type: randomType(),
          language: 'en',
        },
        (req.user as JWTUserV1Type).sub,
      );
    }

    return 'Stores setted up successfully';
  }
}
