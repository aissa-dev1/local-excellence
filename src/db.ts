import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export function connectDBForRootAsync(): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>(
        config.get('NODE_ENV') === 'development' ? 'DB_URI_DEV' : 'DB_URI',
      ),
      dbName: 'local-excellence-db',
    }),
    inject: [ConfigService],
  };
}
