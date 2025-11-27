# دليل إضافة لغات جديدة للموقع

## اللغات المتاحة حالياً
- العربية (ar)
- الإنجليزية (en)

## كيفية إضافة لغة جديدة

### الخطوة 1: إضافة ملف الترجمة
قم بإنشاء ملف JSON جديد في مجلد `messages/` باسم كود اللغة الجديدة.

مثال: لإضافة اللغة الفرنسية، قم بإنشاء ملف `messages/fr.json`:

```json
{
  "HomePage": {
    "title": "Bienvenue dans notre bibliothèque",
    "about": "À propos de nous"
  },
  "Navigation": {
    "home": "Accueil",
    "books": "Livres",
    "signIn": "Se connecter"
  },
  "LocaleSwitcher": {
    "label": "Changer la langue",
    "en": "Anglais",
    "ar": "Arabe",
    "fr": "Français"
  }
}
```

### الخطوة 2: تحديث ملف التوجيه (routing)
افتح ملف `i18n/routing.ts` وأضف كود اللغة الجديدة إلى مصفوفة `locales`:

```typescript
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'fr'], // أضف 'fr' هنا
 
  // Used when no locale matches
  defaultLocale: 'en'
});
```

### الخطوة 3: تحديث Middleware
افتح ملف `middleware.ts` وأضف كود اللغة الجديدة إلى matcher:

```typescript
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en|fr)/:path*'] // أضف 'fr' هنا
};
```

### الخطوة 4: تحديث ملفات الترجمة الأخرى
قم بتحديث ملفات الترجمة الموجودة (`messages/ar.json` و `messages/en.json`) لإضافة اسم اللغة الجديدة:

في `messages/ar.json`:
```json
{
  "LocaleSwitcher": {
    "label": "تغيير اللغة",
    "en": "الإنجليزية",
    "ar": "العربية",
    "fr": "الفرنسية"
  }
}
```

في `messages/en.json`:
```json
{
  "LocaleSwitcher": {
    "label": "Change Language",
    "en": "English",
    "ar": "Arabic",
    "fr": "French"
  }
}
```

### الخطوة 5: تحديث مكون تبديل اللغة (اختياري)
إذا كنت تريد إضافة خيار اللغة الجديدة في قائمة منسدلة بدلاً من زر التبديل، يمكنك تعديل `components/LanguageSwitcher.tsx`.

### الخطوة 6: إعادة تشغيل الخادم
بعد إجراء جميع التغييرات، أعد تشغيل خادم التطوير:

```bash
npm run dev
```

## ملاحظات مهمة

1. **اتجاه النص (RTL/LTR)**: 
   - إذا كانت اللغة الجديدة تُكتب من اليمين إلى اليسار (مثل العربية)، قم بتحديث ملف `app/[locale]/layout.tsx`:
   ```typescript
   dir={locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr'}
   ```

2. **الخطوط**: 
   - قد تحتاج إلى إضافة خطوط مخصصة لبعض اللغات في `app/[locale]/layout.tsx`

3. **الترجمات**: 
   - تأكد من ترجمة جميع النصوص في ملف JSON الجديد
   - استخدم نفس البنية الموجودة في الملفات الأخرى

## استخدام الترجمات في المكونات

### في Server Components:
```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('HomePage');
  
  return <h1>{t('title')}</h1>;
}
```

### في Client Components:
```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations('Navigation');
  
  return <nav>{t('home')}</nav>;
}
```

## الروابط متعددة اللغات

استخدم مكون `Link` من `i18n/routing` بدلاً من `next/link`:

```typescript
import { Link } from '@/i18n/routing';

<Link href="/books">Books</Link>
```

سيتم تلقائياً إضافة بادئة اللغة الحالية للرابط.
