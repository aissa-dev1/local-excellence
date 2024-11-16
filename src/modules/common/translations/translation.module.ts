import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {
  constructor(private readonly translationService: TranslationService) {
    this.onModuleInit();
  }

  private async onModuleInit() {
    await this.translationService.transformTranslationsToTree('client');
    await this.translationService.transformTranslationsToTree('server');
  }
}
