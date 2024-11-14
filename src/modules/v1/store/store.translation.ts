import { TranslationStructure } from 'src/types/translation';

type StoreV1TranslationType = TranslationStructure<
  {
    'store-not-found': string;
    'store-name-already-exists': string;
    'store-name-special-characters': string;
  },
  {
    store: string;
    'created-successfully': string;
  },
  {
    name: string;
    description: string;
    type: string;
  }
>;

export const storeV1Translation: StoreV1TranslationType = {
  en: {
    errors: {
      'store-not-found': 'Store not found',
      'store-name-already-exists': 'Store with this name already exists',
      'store-name-special-characters':
        'Store name cannot contain special characters',
    },
    messages: {
      store: 'Store',
      'created-successfully': 'created successfully',
    },
    dtos: {
      name: 'Store Name must be 2-25 characters long',
      description: 'Description must be 2-100 characters long',
      type: 'Type must be one of the following:',
    },
  },
  ar: {
    errors: {
      'store-not-found': 'المتجر غير موجود',
      'store-name-already-exists': 'متجر بنفس الاسم موجود بالفعل',
      'store-name-special-characters':
        'اسم المتجر لا يمكن أن يحتوي على أحرف خاصة',
    },
    messages: {
      store: 'المتجر',
      'created-successfully': 'تم الإنشاء بنجاح',
    },
    dtos: {
      name: 'يجب أن يكون اسم المتجر بين 2 و 25 حرفًا',
      description: 'يجب أن يكون الوصف بين 2 و 100 حرفًا',
      type: 'يجب أن يكون نوع المتجر ما بين:',
    },
  },
};
