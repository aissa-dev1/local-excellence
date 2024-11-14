import { TranslationStructure } from 'src/types/translation';

type UserV1TranslationType = TranslationStructure<
  unknown,
  unknown,
  {
    email: string;
    password: string;
    'user-name': string;
  }
>;

export const userV1Translation: UserV1TranslationType = {
  en: {
    errors: {},
    messages: {},
    dtos: {
      email: 'Provide a valid Email please',
      password: 'Password must be at least 4 characters long',
      'user-name': 'User Name must be 2-25 characters long',
    },
  },
  ar: {
    errors: {},
    messages: {},
    dtos: {
      email: 'يرجى إدخال بريد إلكتروني صحيح',
      password: 'يجب أن تكون كلمة المرور على الأقل 4 حروف',
      'user-name': 'اسم المستخدم يجب أن يكون بين 2 و 25 حرف',
    },
  },
};
