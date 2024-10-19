import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DBQueryDeleteParams,
  DBQueryFindParams,
} from 'src/modules/shared/types';
import { ProductV1Document } from './product.types';
import { ProductV1 } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductV1Dto } from './product.dto';

@Injectable()
export class ProductServiceV1 {
  private shuffledProducts: ProductV1Document[] = [];
  private lastShuffleTime: number = 0;
  private shuffleInterval: number = 1000 * 60;

  constructor(
    @InjectModel(ProductV1.name)
    private readonly productModel: Model<ProductV1>,
  ) {}

  async createProduct(dto: CreateProductV1Dto): Promise<ProductV1Document> {
    const createdProduct = await this.productModel.create({
      ...dto,
      createdAt: Date.now(),
    });
    await createdProduct.save();
    return createdProduct;
  }

  async getPaginatedProducts(
    page: number,
    limit: number,
  ): Promise<ProductV1Document[]> {
    if (
      Date.now() - this.lastShuffleTime > this.shuffleInterval ||
      this.shuffledProducts.length === 0
    ) {
      await this.shuffleProducts();
    }
    const start = (page - 1) * limit;
    const end = page * limit;
    return this.shuffledProducts.slice(start, end);
  }

  async getRandomProducts(): Promise<ProductV1Document[]> {
    const products = await this.findMany();

    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    return products;
  }

  private async shuffleProducts() {
    const products = await this.findMany();
    this.shuffledProducts = products.sort(() => Math.random() - 0.5);
    this.lastShuffleTime = Date.now();
  }

  findMany(
    params: DBQueryFindParams<ProductV1> = {},
  ): Promise<ProductV1Document[]> {
    return this.productModel.find(
      params.filter,
      params.projection,
      params.options,
    );
  }

  findOne(
    params: DBQueryFindParams<ProductV1> = {},
  ): Promise<ProductV1Document | null> {
    return this.productModel.findOne(
      params.filter,
      params.projection,
      params.options,
    );
  }

  deleteMany(
    params: DBQueryDeleteParams<ProductV1> = {},
  ): Promise<{ deletedCount?: number }> {
    return this.productModel.deleteMany(params.filter, params.options);
  }
}
