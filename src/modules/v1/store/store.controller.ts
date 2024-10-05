import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StoreServiceV1 } from './store.service';
import { CreateStoreV1Dto } from './store.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JWTUserV1Type } from '../user/user.types';
import { Request as RequestType } from 'express';
import { UserServiceV1 } from '../user/user.service';
import { StoreV1Document, StoreV1WithId } from './store.types';

@Controller({ path: 'stores', version: '1' })
export class StoreControllerV1 {
  private homeStoresSize = 6;

  constructor(
    private readonly storeService: StoreServiceV1,
    private readonly jwtService: JwtService,
    private readonly userService: UserServiceV1,
  ) {}

  @Get()
  getStores(): Promise<StoreV1WithId[]> {
    return this.storeService.getShuffledStores();
  }

  @Get('/size')
  async getStoresSize(): Promise<number> {
    const stores = await this.storeService.findAll();
    return stores.length;
  }

  @Get('/home')
  async getHomeStores(): Promise<(StoreV1WithId & { ownerName: string })[]> {
    const stores = await this.storeService.getShuffledStores();
    const homeStores = new Set<StoreV1Document>();

    while (homeStores.size < this.homeStoresSize) {
      const store = stores[Math.floor(Math.random() * stores.length)];
      homeStores.add(store);
    }

    const filteredStores = [...homeStores].map(async (store) => {
      const owner = await this.userService.findOne({ _id: store.ownerId });
      return {
        _id: store._id,
        name: store.name,
        ownerId: store.ownerId,
        type: store.type,
        ownerName: owner.userName,
      };
    });
    return Promise.all(filteredStores);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStore(
    @Body() dto: CreateStoreV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const token = req.headers.authorization.split(' ')[1];
    const decodedUser = await this.jwtService.verifyAsync<JWTUserV1Type>(token);
    const foundStore = await this.storeService.findOne({
      name: dto.name,
    });

    if (foundStore) {
      throw new BadRequestException('Store with this name already exists');
    }

    const createdStore = await this.storeService.createStore(
      dto,
      decodedUser.sub,
    );
    return `Store ${createdStore.name} created successfully`;
  }

  //   @Post('/setup')
  //   @UseGuards(JwtAuthGuard)
  //   async setupStores(@Request() req: RequestType) {
  //     await this.storeService.deleteMany({});
  //     const token = req.headers.authorization.split(' ')[1];
  //     const decodedUser = await this.jwtService.verifyAsync<JWTUserV1Type>(token);
  //     const characters =
  //       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     const types = Object.values(StoreV1Type);
  //     const foundCharacters = [];

  //     const randomCharacter = () => {
  //       const foundChar = characters.charAt(
  //         Math.floor(Math.random() * characters.length),
  //       );

  //       if (!foundCharacters.includes(foundChar)) {
  //         foundCharacters.push(foundChar);
  //         return foundChar;
  //       }

  //       return randomCharacter();
  //     };
  //     const randomType = () => {
  //       return types[Math.floor(Math.random() * types.length)];
  //     };

  //     for (let i = 0; i < 20; i++) {
  //       await this.storeService.createStore(
  //         {
  //           name: `${randomCharacter()} Store ${i + 1}`,
  //           type: randomType(),
  //         },
  //         decodedUser.sub,
  //       );
  //     }

  //     return 'Stores setted up successfully';
  //   }
}
