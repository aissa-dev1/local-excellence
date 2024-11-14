import { TranslationStructure } from 'src/types/translation';

type AuthV1TranslationType = TranslationStructure<
  {
    'email-exists': string;
    'invalid-credentials': string;
  },
  {
    'thanks-for-joining': string;
    welcome: string;
    'signed-out': string;
  },
  {
    email: string;
    password: string;
    'user-name': string;
  }
>;

export const authV1Translation: AuthV1TranslationType = {
  en: {
    errors: {
      'email-exists': 'This email is already linked with another account',
      'invalid-credentials': 'Invalid credentials',
    },
    messages: {
      'thanks-for-joining': 'Thanks for joining',
      welcome: 'Welcome',
      'signed-out': 'You have been signed out',
    },
    dtos: {
      email: 'Provide a valid Email please',
      password: 'Password must be at least 4 characters long',
      'user-name': 'User Name must be 2-25 characters long',
    },
  },
  ar: {
    errors: {
      'email-exists': 'هذا البريد الإلكتروني مرتبط بحساب آخر',
      'invalid-credentials': 'بيانات الدخول غير صحيحة',
    },
    messages: {
      'thanks-for-joining': 'شكرا لك على الانضمام',
      welcome: 'مرحبا',
      'signed-out': 'تم تسجيل خروجك من الحساب',
    },
    dtos: {
      email: 'يرجى إدخال بريد إلكتروني صحيح',
      password: 'يجب أن تكون كلمة المرور على الأقل 4 أحرف',
      'user-name': 'يجب أن يكون اسم المستخدم بين 2 و 25 حرفاً',
    },
  },
};
