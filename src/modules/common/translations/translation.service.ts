import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { SUPPORTED_LANGUAGES } from 'src/constants';
import { TranslationLanguage } from 'src/types/translation';
import { withTryCatch } from 'src/utils/with-try-catch';

type TranslationFrom = 'client' | 'server';

@Injectable()
export class TranslationService {
  async readTranslation(
    from: TranslationFrom,
    lang: TranslationLanguage,
  ): Promise<any> {
    if (!Object.values(SUPPORTED_LANGUAGES).includes(lang)) {
      lang = 'en';
    }

    const filePath = path.resolve(`translations/${from}`, `${lang}.json`);

    const [response, error] = await withTryCatch(() => {
      return fs.promises.readFile(filePath, 'utf-8');
    });

    if (error || !response) {
      console.error(`Error loading translations for language: ${lang}`, error);
      return {};
    }

    return JSON.parse(response) as any;
  }

  async transformTranslationsToTree(from: TranslationFrom) {
    const tree: Record<string, any> = {};

    await fs.promises.mkdir('translations-tree', { recursive: true });

    for (const lang of Object.values(SUPPORTED_LANGUAGES)) {
      const translations = await this.readTranslation(from, lang);
      const filePath = path.resolve(
        `translations-tree/${from}`,
        `${lang}.json`,
      );

      for (const [key, value] of Object.entries(translations)) {
        const levels = key.split('@').filter(Boolean);

        let currentLevel = tree;

        for (let i = 0; i < levels.length; i++) {
          const level = levels[i];

          if (i === levels.length - 1) {
            currentLevel[level] = value;
          } else {
            currentLevel[level] = currentLevel[level] || {};
            currentLevel = currentLevel[level];
          }
        }
      }

      await fs.promises.writeFile(filePath, JSON.stringify(tree, null, 2));
    }
  }

  async readTranslationTree(
    from: TranslationFrom,
    lang: TranslationLanguage,
  ): Promise<any> {
    const filePath = path.resolve(`translations-tree/${from}`, `${lang}.json`);

    const [fileContent, error] = await withTryCatch(() => {
      return fs.promises.readFile(filePath, 'utf-8');
    });

    if (error || !fileContent) {
      console.error(
        `Error loading translations tree for language: ${lang}`,
        error,
      );
      return {};
    }

    return JSON.parse(fileContent);
  }
}
