import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StoreServiceV1 } from './store.service';
import { CreateStoreV1Dto } from './store.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JWTUserV1Type } from '../user/user.types';
import { Request as RequestType } from 'express';
import { decodeStoreName } from 'src/utils/store-name';
import { StoreV1 } from './store.schema';
import { STORE_V1_TYPE } from './store.constants';
import { hasSpecialCharacters } from 'src/utils/has-special-characters';

@Controller({ path: 'stores', version: '1' })
export class StoreControllerV1 {
  private readonly homeStoresSize = 6;

  constructor(
    private readonly storeService: StoreServiceV1,
    private readonly jwtService: JwtService,
  ) {}

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

  @Get('/name/:name')
  async getStoreByName(@Request() req: RequestType): Promise<StoreV1> {
    const store = await this.storeService.findOne({
      filter: {
        name: decodeStoreName(req.params.name),
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  @Get('/id/:id')
  async getStoreById(@Request() req: RequestType): Promise<StoreV1> {
    const store = await this.storeService.findOne({
      filter: {
        _id: req.params.id,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStore(
    @Body() dto: CreateStoreV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const token = req.headers.authorization.split(' ')[1];
    const decodedUser = await this.jwtService.verifyAsync<JWTUserV1Type>(token);
    const store = await this.storeService.findOne({
      filter: {
        name: dto.name,
      },
    });

    if (store) {
      throw new BadRequestException('Store with this name already exists');
    }
    if (hasSpecialCharacters(dto.name)) {
      throw new BadRequestException(
        'Store name cannot contain special characters',
      );
    }

    const createdStore = await this.storeService.createStore(
      dto,
      decodedUser.sub,
    );
    return `Store ${createdStore.name} created successfully`;
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedUser = await this.jwtService.verifyAsync<JWTUserV1Type>(token);
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
        },
        decodedUser.sub,
      );
    }

    return 'Stores setted up successfully';
  }
}
