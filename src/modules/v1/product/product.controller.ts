import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request as RequestType } from 'express';
import { ProductV1 } from './product.schema';
import { ProductServiceV1 } from './product.service';
import { CreateProductV1Dto } from './product.dto';
import { StoreServiceV1 } from '../store/store.service';
import { JWTUserV1Type } from '../user/user.types';

@Controller({ path: 'products', version: '1' })
export class ProductControllerV1 {
  private readonly homeProductsSize = 6;

  constructor(
    private readonly productService: ProductServiceV1,
    private readonly storeService: StoreServiceV1,
  ) {}

  @Get()
  getProducts(): Promise<ProductV1[]> {
    return this.productService.findMany();
  }

  @Get('/paginated')
  async getPaginatedProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<ProductV1[]> {
    const products = await this.productService.getPaginatedProducts(
      page,
      limit,
    );
    return products;
  }

  @Get('/size')
  async getProductsSize(): Promise<number> {
    const products = await this.productService.findMany();
    return products.length;
  }

  @Get('/home')
  async getHomeProducts(): Promise<ProductV1[]> {
    const products = await this.productService.getRandomProducts();
    const homeProducts = products.slice(0, this.homeProductsSize);
    return homeProducts;
  }

  @Get('/id/:id')
  async getProductById(@Request() req: RequestType): Promise<ProductV1> {
    const product = await this.productService.findOne({
      filter: {
        _id: req.params.id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Get('storeId/:storeId')
  async getProductsByStoreId(
    @Request() req: RequestType,
  ): Promise<ProductV1[]> {
    const products = await this.productService.findMany({
      filter: {
        storeId: req.params.storeId,
      },
    });
    return products;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() dto: CreateProductV1Dto,
    @Request() req: RequestType,
  ): Promise<string> {
    const store = await this.storeService.findOne({
      filter: {
        _id: dto.storeId,
      },
    });

    if (store.userId !== (req.user as JWTUserV1Type).sub) {
      throw new UnauthorizedException(
        'You are not authorized to create a product from this store',
      );
    }

    const createdProduct = await this.productService.createProduct(dto);
    return `Product ${createdProduct.name} created successfully`;
  }

  @Post('/search')
  async searchProducts(@Query('query') query: string): Promise<ProductV1[]> {
    const products = await this.productService.findMany({
      filter: {
        name: { $regex: query, $options: 'i' },
      },
    });
    return products;
  }

  // TODO: delete this endpoint
  @Post('/setup')
  @UseGuards(JwtAuthGuard)
  async setupProducts() {
    await this.productService.deleteMany();
    return 'Products setted up successfully';
  }
}
