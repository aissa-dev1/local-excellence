import { TranslationStructure } from 'src/types/translation';

type SponsorV1TranslationType = TranslationStructure<
  {
    'cannot-create-sponsor-without-store': string;
    'not-authorized-to-create': string;
    'sponsor-exists': string;
    'invalid-bg': string;
    'invalid-color': string;
    'bg-and-color-must-differ': string;
  },
  {
    'sponsor-from': string;
    'created-successfully': string;
  },
  {
    'store-id': string;
    bg: string;
    color: string;
    description: string;
  }
>;

export const sponsorV1Translation: SponsorV1TranslationType = {
  en: {
    errors: {
      'cannot-create-sponsor-without-store':
        'You cannot create a sponsor without a store',
      'not-authorized-to-create':
        'You are not authorized to create a sponsor from this store',
      'sponsor-exists': 'Sponsor from this store already exists',
      'invalid-bg': 'Invalid background color',
      'invalid-color': 'Invalid color',
      'bg-and-color-must-differ':
        'Background color and color must be different',
    },
    messages: {
      'sponsor-from': 'Sponsor from',
      'created-successfully': 'created successfully',
    },
    dtos: {
      'store-id': 'Provide a valid store id',
      bg: 'Background color must be 2-25 characters long',
      color: 'Color must be 2-25 characters long',
      description: 'Description must be at least 2 characters long',
    },
  },
  ar: {
    errors: {
      'cannot-create-sponsor-without-store': 'لا يمكن إنشاء اعلان بدون للمتجر',
      'not-authorized-to-create':
        'ليس لديك الصلاحية لإنشاء اعلان من هذا المتجر',
      'sponsor-exists': 'الاعلان من هذا المتجر موجود مسبقاً',
      'invalid-bg': 'لون الخلفية غير صحيح',
      'invalid-color': 'لون غير صحيح',
      'bg-and-color-must-differ': 'لون الخلفية ولون يجب أن يكون مختلفاً',
    },
    messages: {
      'sponsor-from': 'اعلان من',
      'created-successfully': 'تم الإنشاء بنجاح',
    },
    dtos: {
      'store-id': 'أدخل معرف متجر صحيح',
      bg: 'لون الخلفية يجب أن يكون 2-25 حرفاً',
      color: 'لون يجب أن يكون 2-25 حرفاً',
      description: 'الوصف يجب أن يكون على الأقل 2 حرفاً',
    },
  },
};
