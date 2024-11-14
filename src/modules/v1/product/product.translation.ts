import { TranslationStructure } from 'src/types/translation';

type ProductV1TranslationType = TranslationStructure<
  {
    'product-not-found': string;
    'not-authorized-to-create': string;
  },
  {
    product: string;
    'created-successfully': string;
  },
  {
    'store-id': string;
    name: string;
    description: string;
    'price-int': string;
    'price-min': string;
  }
>;

export const productV1Translation: ProductV1TranslationType = {
  en: {
    errors: {
      'product-not-found': 'Product not found',
      'not-authorized-to-create':
        'You are not authorized to create a product from this store',
    },
    messages: {
      product: 'Product',
      'created-successfully': 'created successfully',
    },
    dtos: {
      'store-id': 'Provide a valid store id',
      name: 'Product Name must be 2-25 characters long',
      description: 'Description must be 2-100 characters long',
      'price-int': 'Price must be an integer value (DZD)',
      'price-min': 'Price must be at least 10 DZD',
    },
  },
  ar: {
    errors: {
      'product-not-found': 'المنتج غير موجود',
      'not-authorized-to-create':
        'ليس لديك الصلاحية لإنشاء منتج من هذا المتجر',
    },
    messages: {
      product: 'المنتج',
      'created-successfully': 'تم الإنشاء بنجاح',
    },
    dtos: {
      'store-id': 'يرجى إدخال متجر صحيح',
      name: 'اسم المنتج يجب أن يكون بين 2 و 25 حرف',
      description: 'وصف يجب أن يكون بين 2 و 100 حرف',
      'price-int': 'السعر يجب أن يكون رقم صحيح (دج)',
      'price-min': 'السعر يجب أن يكون على الأقل 10 دج',
    },
  },
};
