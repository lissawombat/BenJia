import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf, Wheat, Nut, CircleDot } from 'lucide-react';
import { LanguageContext } from '../App';

type Category = 'bbq' | 'accompaniment' | 'drinks';
type BbqSubCategory = 'pork' | 'beef' | 'chicken' | 'side' | 'set';
type AccompanimentSubCategory = 'meal' | 'noodle' | 'rice' | 'stew';

interface MenuItem {
  id: string;
  nameZh: string;
  nameEn: string;
  nameKo?: string;
  price: string;
  descZh: string;
  descEn: string;
  textureZh: string;
  textureEn: string;
  weight: string;
  image: string;
  tags: string[];
  isNew?: boolean;
}

const categories: { id: Category; nameZh: string; nameEn: string }[] = [
  { id: 'bbq', nameZh: '炭火烤肉', nameEn: 'Table BBQ' },
  { id: 'accompaniment', nameZh: '菜品', nameEn: 'Dishes' },
  { id: 'drinks', nameZh: '饮品&甜品', nameEn: 'Drink & Dessert' },
];

const bbqSubCategories: { id: BbqSubCategory; nameZh: string; nameEn: string }[] = [
  { id: 'set', nameZh: '套餐', nameEn: 'SET' },
  { id: 'pork', nameZh: '猪肉', nameEn: 'PORK' },
  { id: 'beef', nameZh: '牛肉', nameEn: 'BEEF' },
  { id: 'chicken', nameZh: '鸡肉', nameEn: 'CHICKEN' },
  { id: 'side', nameZh: '配菜', nameEn: 'SIDE' },
];

const accompanimentSubCategories: { id: AccompanimentSubCategory; nameZh: string; nameEn: string }[] = [
  { id: 'meal', nameZh: '特色菜', nameEn: 'MEAL' },
  { id: 'noodle', nameZh: '面食', nameEn: 'NOODLE' },
  { id: 'rice', nameZh: '米饭', nameEn: 'RICE' },
  { id: 'stew', nameZh: '汤类', nameEn: 'STEW & SOUP' },
];

const bbqMenuData: Record<BbqSubCategory, MenuItem[]> = {
  pork: [
    {
      id: 'p1',
      nameZh: '猪五花',
      nameEn: 'PORK BELLY',
      nameKo: 'SAMGYEOPSAL',
      price: '1,280 RSD',
      descZh: 'Medium thick-cut pork belly. Thicker version of uncured bacon.',
      descEn: 'Medium thick-cut pork belly. Thicker version of uncured bacon.',
      textureZh: 'Tender meat and crispy skin',
      textureEn: 'Tender meat and crispy skin',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-27/1777319547423-%E7%8C%AA%E4%BA%94%E8%8A%B12.JPEG?auth_key=01219e9bd693ebe2118385f64c7b28eb5839b69cd9dbfeb4680bdc1354660751',
      tags: [],
    },
    {
      id: 'p4',
      nameZh: '秘制梅花肉',
      nameEn: 'MARINATED SHOULDER BUTT',
      nameKo: 'YANGNYEOM MOKSAL',
      price: '1,380 RSD',
      descZh: 'Lean and tender with a savory marinade.',
      descEn: 'Lean and tender with a savory marinade.',
      textureZh: 'Chewy',
      textureEn: 'Chewy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-27/1777319556003-%E6%A2%85%E8%8A%B1%E8%82%892.JPEG?auth_key=70ba5432429eee3820bf87c41eefbcef447b506ddf7ba3642ddc04ab7b078756',
      tags: [],
    },
  ],
  beef: [
    {
      id: 'b1',
      nameZh: '浇汁牛短肋',
      nameEn: 'BEEF BONELESS SHORT RIB',
      nameKo: 'GALBISAL',
      price: '2,080 RSD',
      descZh: 'Thin-medium cut',
      descEn: 'Thin-medium cut',
      textureZh: 'Tender & Juicy',
      textureEn: 'Tender & Juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388095670-%E7%89%9B%E7%9F%AD%E8%82%8B2.png?auth_key=09f557f72b7b7c9a3107358e601048b449488373c4661b28bc0360c4edf00c78',
      tags: [],
    },
    {
      id: 'b9',
      nameZh: '老式肥牛',
      nameEn: 'BULGOGI',
      price: '1,880 RSD',
      descZh: 'Marinated thin-medium slices beef ribs',
      descEn: 'Marinated thin-medium slices beef ribs',
      textureZh: 'Tender & Juicy',
      textureEn: 'Tender & Juicy',
      weight: 'One serving (175g / 6.1oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388025750-%E8%80%81%E5%BC%8F%E8%82%A5%E7%89%9B2.JPG?auth_key=de3a1997df04e403d07551ed7a804674be1e87845900de7239c6d76fcacabf82',
      tags: [],
    },
    {
      id: 'b2',
      nameZh: '秘制牛五花',
      nameEn: 'KOREAN SAUCE SHORT PLATE',
      nameKo: 'YANGNYEOM USAMGYEOB',
      price: '1,580 RSD',
      descZh: 'Thin sliced beef belly with sweet taste sauce.',
      descEn: 'Thin sliced beef belly with sweet taste sauce.',
      textureZh: 'Fatty and juicy',
      textureEn: 'Fatty and juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388122446-%E7%89%B9%E5%91%B3%E7%89%9B%E4%BA%94%E8%8A%B12.JPG?auth_key=8e515062891df248e942bd512a71ac84482593e7e7bca7faa72a895d01236049',
      tags: [],
    },
    {
      id: 'b3',
      nameZh: '黑椒牛五花',
      nameEn: 'BLACK PEPPER SHORT PLATE',
      nameKo: 'YANGNYEOM USAMGYEOB',
      price: '1,580 RSD',
      descZh: 'Thin sliced beef belly with black pepper.',
      descEn: 'Thin sliced beef belly with black pepper.',
      textureZh: 'Fatty and juicy',
      textureEn: 'Fatty and juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388122446-%E7%89%B9%E5%91%B3%E7%89%9B%E4%BA%94%E8%8A%B12.JPG?auth_key=8e515062891df248e942bd512a71ac84482593e7e7bca7faa72a895d01236049',
      tags: [],
    },
    {
      id: 'b4',
      nameZh: '特味牛五花',
      nameEn: 'SPECIAL SAUCE SHORT PLATE',
      nameKo: 'YANGNYEOM USAMGYEOB',
      price: '1,580 RSD',
      descZh: 'Thin sliced beef belly with sweet and sour taste sauce.',
      descEn: 'Thin sliced beef belly with sweet and sour taste sauce.',
      textureZh: 'Fatty and juicy',
      textureEn: 'Fatty and juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388122446-%E7%89%B9%E5%91%B3%E7%89%9B%E4%BA%94%E8%8A%B12.JPG?auth_key=8e515062891df248e942bd512a71ac84482593e7e7bca7faa72a895d01236049',
      tags: [],
    },
    {
      id: 'b5',
      nameZh: '浇汁牛上脑',
      nameEn: 'BEEF CHUCK STEAK',
      nameKo: 'CHEOK AI ROL',
      price: '1,580 RSD',
      descZh: 'Thin-medium slices that strike a balance between tenderness and meatiness.',
      descEn: 'Thin-medium slices that strike a balance between tenderness and meatiness.',
      textureZh: 'Tender & Juicy',
      textureEn: 'Tender & Juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388048211-%E7%89%9B%E4%B8%8A%E8%84%91vrat2.JPG?auth_key=6327ee7223f0fc7643447cd45bae0f8a824ae1abda05a6d51196ad02d18f4343',
      tags: [],
    },
    {
      id: 'b6',
      nameZh: '安格斯牛仔骨',
      nameEn: 'BONE-IN BEEF SHORT RIB',
      nameKo: 'LA GALBI',
      price: '1,380 RSD',
      descZh: 'Thin-medium slices with the rib bone.',
      descEn: 'Thin-medium slices with the rib bone.',
      textureZh: 'Tender & Juicy',
      textureEn: 'Tender & Juicy',
      weight: 'One serving (180g / 6.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388109439-%E7%89%9B%E4%BB%94%E9%AA%A82.JPG?auth_key=0c8eb7ae836d615e4d0cc755226b2831e6d54d56345ed319698455d92c3208c1',
      tags: [],
    },
    {
      id: 'b7',
      nameZh: '蒜香泡汁牛肋排',
      nameEn: 'ANGUS RIB FINGER MEAT',
      nameKo: 'YANGNYEOM NUKGANSAL',
      price: '1,580 RSD',
      descZh: 'Boneless, flavorful meat found between the bones of a beef rib cage.',
      descEn: 'Boneless, flavorful meat found between the bones of a beef rib cage.',
      textureZh: 'Tender & Juicy',
      textureEn: 'Tender & Juicy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388080467-%E7%89%9B%E9%95%BF%E8%82%8B2.JPG?auth_key=7572dc11869c402c852aaf54a69d189c1779a607b8186ed1a8332b89b6f677cf',
      tags: [],
    },
    {
      id: 'b8',
      nameZh: '牛舌',
      nameEn: 'ANGUS BEEF TONGUE',
      nameKo: 'USEOL',
      price: '1,280 RSD',
      descZh: 'Thin slices beef tongue',
      descEn: 'Thin slices beef tongue',
      textureZh: 'Chewy',
      textureEn: 'Chewy',
      weight: 'One serving (150g / 5.3oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388613134-%E7%89%9B%E8%88%8C2.JPG?auth_key=c09db2a277f4e5c485a9fa9f3f0e6090c29a3fcd57f345d99170570fe61ff4f6',
      tags: [],
    },
  ],
  chicken: [
    {
      id: 'c1',
      nameZh: '蒜香鸡腿肉',
      nameEn: 'GARLIC CHICKEN THIGH',
      price: '1,280 RSD',
      descZh: 'Perfectly seasoned chicken thigh, sliced thin-medium',
      descEn: 'Perfectly seasoned chicken thigh, sliced thin-medium',
      textureZh: 'Tender',
      textureEn: 'Tender',
      weight: 'One serving (200g / 7oz)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777388150506-%E9%B8%A1%E8%85%BF%E8%82%892.JPG?auth_key=d14771cc3f91ddcc07d761395856eaa540137e54bff521b171073fe78aaf1853',
      tags: [],
    },
  ],
  side: [
    {
      id: 's0',
      nameZh: '生菜',
      nameEn: 'LETTUCE',
      price: '120 RSD',
      descZh: 'Fresh lettuce for wrapping grilled meat',
      descEn: 'Fresh lettuce for wrapping grilled meat',
      textureZh: 'Crisp and fresh',
      textureEn: 'Crisp and fresh',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777723936706-%E7%94%9F%E8%8F%9C.jpg?auth_key=7ce4e24bc2378ac4de608b04f8a955960c960bb9380c76f4f1c4820e98de5c91',
      tags: ['vegan'],
    },
    {
      id: 's1',
      nameZh: '口蘑',
      nameEn: 'MUSHROOM',
      price: '680 RSD',
      descZh: 'Fresh mushrooms for grilling',
      descEn: 'Fresh mushrooms for grilling',
      textureZh: 'Juicy and tender',
      textureEn: 'Juicy and tender',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777387544183-%E5%8F%A3%E8%8F%872.JPG?auth_key=535fe47fd60ca9bb2dd6d3406e8e69a42b6d4922ec5dfd6c558e26ed66cb1044',
      tags: ['vegan'],
    },
    {
      id: 's3',
      nameZh: '角瓜',
      nameEn: 'ZUCCHINI SLICE',
      price: '500 RSD',
      descZh: 'Fresh zucchini slices',
      descEn: 'Fresh zucchini slices',
      textureZh: 'Crisp and fresh',
      textureEn: 'Crisp and fresh',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777387386481-%E8%A7%92%E7%93%9C2.JPG?auth_key=bd9f3f5f181643c58b4c68ac56f587e555a770e81fa4a1541c581e0ed267b5f3',
      tags: ['vegan'],
    },
    {
      id: 's4',
      nameZh: '菠萝',
      nameEn: 'PINEAPPLE SLICE',
      price: '490 RSD',
      descZh: 'Sweet pineapple slices',
      descEn: 'Sweet pineapple slices',
      textureZh: 'Sweet and juicy',
      textureEn: 'Sweet and juicy',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777387367159-%E8%8F%A0%E8%90%9D2.JPG?auth_key=524fac015e00926afce6eb1f07c3a6fab5927dc675791bf92ff6ebfceb3a4681',
      tags: ['vegan'],
    },
    {
      id: 's5',
      nameZh: '土豆',
      nameEn: 'POTATO SLICE',
      price: '450 RSD',
      descZh: 'Fresh potato slices',
      descEn: 'Fresh potato slices',
      textureZh: 'Crispy when grilled',
      textureEn: 'Crispy when grilled',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777387329127-%E5%9C%9F%E8%B1%862.JPG?auth_key=0935ef7040b32ecb0e5a302294f46257c69f3fd050f07bb5138c1729436b086c',
      tags: ['vegan'],
    },
  ],
  set: [
    {
      id: 'set1',
      nameZh: '冠军套餐',
      nameEn: 'MEAT SET',
      price: '5,880 RSD',
      descZh: 'Pork belly / Beef boneless short rib / Bulgogi / Korean sauce short plate / Black pepper short plate / Pineapple slice / Mushroom',
      descEn: 'Pork belly / Beef boneless short rib / Bulgogi / Korean sauce short plate / Black pepper short plate / Pineapple slice / Mushroom',
      textureZh: 'Premium meat selection',
      textureEn: 'Premium meat selection',
      weight: '525g (for 2)',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777392669383-%E5%86%A0%E5%86%9B%E5%A5%97%E9%A4%902.JPG?auth_key=1ab2d51407abc9ed225776fbf2ccd794c607780f698cccb11e6ff403c7086f39',
      tags: [],
    },
  ],
};

const accompanimentMenuData: Record<AccompanimentSubCategory, MenuItem[]> = {
  meal: [
    {
      id: 'm4',
      nameZh: '芝士熔岩火辣鸡',
      nameEn: 'CHEESE SPICY CHICKEN',
      price: '1,580 RSD',
      descZh: 'Fried chicken thigh 500g / Stir fried onion & kimchi / Chilli / Bread / Milk / Cheese / Sesame oil',
      descEn: 'Fried chicken thigh 500g / Stir fried onion & kimchi / Chilli / Bread / Milk / Cheese / Sesame oil',
      textureZh: 'Spicy and cheesy',
      textureEn: 'Spicy and cheesy',
      weight: '500g',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390496104-%E8%8A%9D%E5%A3%AB%E7%86%94%E5%B2%A9%E7%81%AB%E8%BE%A3%E9%B8%A12.JPG?auth_key=770c8957bd7acb492e31bae956925fccd5236ac8aca7fd2990a0a7c0dbc2f5b5',
      tags: ['spicy'],
    },
    {
      id: 'm3',
      nameZh: '火辣鸡爪',
      nameEn: 'SPICY CHICKEN FEET',
      price: '1,080 RSD',
      descZh: '5 chicken feet / 5 tteokbokki',
      descEn: '5 chicken feet / 5 tteokbokki',
      textureZh: 'Spicy and chewy',
      textureEn: 'Spicy and chewy',
      weight: '5 pieces',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390121583-%E7%81%AB%E8%BE%A3%E9%B8%A1%E7%88%AA2.JPG?auth_key=f9becd1eb4f3be662c89e9801e400ab5590f4bc001cec4155f8e2ec71a2df809',
      tags: ['spicy'],
    },
    {
      id: 'm2',
      nameZh: '海鲜饼',
      nameEn: 'GREEN ONION PANCAKE WITH SEAFOOD',
      price: '1,080 RSD',
      descZh: 'Green onion / Mixed seafood',
      descEn: 'Green onion / Mixed seafood',
      textureZh: 'Crispy outside, soft inside',
      textureEn: 'Crispy outside, soft inside',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389070405-%E6%B5%B7%E9%B2%9C%E9%A5%BC2.JPG?auth_key=68bb95b1d444fcc2a2e86f1b4f86d7cef808257da8421fa943a231edc6037bdf',
      tags: [],
    },
    {
      id: 'm1',
      nameZh: '火山PUPU鸡蛋糕',
      nameEn: 'VOLCANO LAVA EGG',
      price: '880 RSD',
      descZh: 'Egg / Crab stick / Milk / Corn',
      descEn: 'Egg / Crab stick / Milk / Corn',
      textureZh: 'Soft and fluffy',
      textureEn: 'Soft and fluffy',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389083923-%E9%B8%A1%E8%9B%8B%E7%B3%952egg_lava.JPG?auth_key=ddd5a4288c2f396acce13d66ad4a1d29a28eb962fbf49eeda88b3415e7cdcc1c',
      tags: [],
    },
  ],
  noodle: [
    {
      id: 'n1',
      nameZh: '韩国辛拉面',
      nameEn: 'KOREAN SHIN RAMEN',
      price: '680 RSD',
      descZh: 'Shin ramen with mild spicy soup / Egg / Slice of cheese / Slice of ham',
      descEn: 'Shin ramen with mild spicy soup / Egg / Slice of cheese / Slice of ham',
      textureZh: 'Spicy and savory',
      textureEn: 'Spicy and savory',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389076873-%E8%BE%9B%E6%8B%89%E9%9D%A22__2_.JPG?auth_key=2f28bd21bb5680e032346161fa510560b3f3defb47b04af308014a7f348bf816',
      tags: ['spicy'],
    },
    {
      id: 'n2',
      nameZh: '奶香芝士火鸡面',
      nameEn: 'CHEESE SPICY RAMEN',
      price: '750 RSD',
      descZh: 'Very spicy Samyang buldak ramen / Fried egg / Sesame topping',
      descEn: 'Very spicy Samyang buldak ramen / Fried egg / Sesame topping',
      textureZh: 'Spicy and creamy',
      textureEn: 'Spicy and creamy',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389109306-%E7%81%AB%E9%B8%A1%E9%9D%A22spicy_ramen.JPG?auth_key=d13c6857a7b248bd063d81c637499918d3b204be20a1819bf940f565487ef343',
      tags: ['spicy'],
    },
    {
      id: 'n3',
      nameZh: '韩国冷面',
      nameEn: 'COLD NOODLE SOUP WITH KIMCHI',
      price: '1,080 RSD',
      descZh: 'Thin noodles / Kimchi / Boiled egg / Shrimp / Sesame topping',
      descEn: 'Thin noodles / Kimchi / Boiled egg / Shrimp / Sesame topping',
      textureZh: 'Chewy and refreshing',
      textureEn: 'Chewy and refreshing',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390562145-%E5%86%B7%E9%9D%A22cold_noodle.JPG?auth_key=98f0ac6aab8596a25a2275ecda58de44a82ed479f32b0419c8593da5340b0455',
      tags: [],
    },
  ],
  rice: [
    {
      id: 'r1',
      nameZh: '辣白菜炒饭',
      nameEn: 'KIMCHI FRIED RICE',
      price: '1,080 RSD',
      descZh: 'Stir fried pork & Kimchi / Black rice / Fried egg / Sesame topping',
      descEn: 'Stir fried pork & Kimchi / Black rice / Fried egg / Sesame topping',
      textureZh: 'Savory and spicy',
      textureEn: 'Savory and spicy',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389062330-%E8%BE%A3%E7%99%BD%E8%8F%9C%E7%82%92%E9%A5%AD2kimchi_fried_rice.JPG?auth_key=21f19cc389047c01bf522e3d6440a81a50f1fb9dd65f91bcedb96d14de7a76b2',
      tags: ['spicy'],
    },
    {
      id: 'r2',
      nameZh: '石锅拌饭',
      nameEn: 'HOT STONE BIBIMBAP',
      price: '1,080 RSD',
      descZh: 'Black Rice / Bean sprouts / Carrots / Shiitake mushrooms / Zucchini / Radish / Sunny side up egg / Sesame oil / Sesame topping / Gochujang sauce',
      descEn: 'Black Rice / Bean sprouts / Carrots / Shiitake mushrooms / Zucchini / Radish / Sunny side up egg / Sesame oil / Sesame topping / Gochujang sauce',
      textureZh: 'Colorful and nutritious',
      textureEn: 'Colorful and nutritious',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389052982-%E7%9F%B3%E9%94%85%E6%8B%8C%E9%A5%AD2.JPG?auth_key=9c9e63c5065a939778abfdacffe2a47d1d1b1f1a4ea9c7879933903bef62b818',
      tags: [],
    },
    {
      id: 'r3',
      nameZh: '营养紫米饭',
      nameEn: 'STEAMED RICE',
      price: '380 RSD',
      descZh: 'Steamed sticky rice with mix of white and black rice',
      descEn: 'Steamed sticky rice with mix of white and black rice',
      textureZh: 'Soft and sticky',
      textureEn: 'Soft and sticky',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389032717-%E7%B4%AB%E7%B1%B3%E9%A5%AD2rice.JPG?auth_key=e547db5d4a143b4a9f901942aba6b243411b74ff5f88ee055838dde4d9d604c3',
      tags: [],
    },
  ],
  stew: [
    {
      id: 'st1',
      nameZh: '大酱汤',
      nameEn: 'KOREAN SOYBEAN PASTE SOUP',
      price: '1,080 RSD',
      descZh: 'Soft tofu / House sauce / Bean sprouts/ Zucchini / Egg / Mushroom / Clam',
      descEn: 'Soft tofu / House sauce / Bean sprouts/ Zucchini / Egg / Mushroom / Clam',
      textureZh: 'Savory and hearty',
      textureEn: 'Savory and hearty',
      weight: 'One serving',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390579981-%E5%A4%A7%E9%85%B1%E6%B1%A43soybean_paste_soup.JPG?auth_key=3dbd531c5465d8aaf7cb262b3b3adb3d17fb68598f6676886c756a69e88a39b0',
      tags: [],
    },
  ],
};

const dessertMenu: MenuItem[] = [];

type DrinkSubCategory = 'koreanAlcohol' | 'beer' | 'beverage' | 'dessert';

const drinkSubCategories: { id: DrinkSubCategory; nameZh: string; nameEn: string }[] = [
  { id: 'koreanAlcohol', nameZh: '韩式酒', nameEn: 'KOREAN ALCOHOL' },
  { id: 'beer', nameZh: '啤酒', nameEn: 'BEER' },
  { id: 'beverage', nameZh: '饮料', nameEn: 'BEVERAGE' },
  { id: 'dessert', nameZh: '甜品', nameEn: 'DESSERT' },
];

const drinkMenuData: Record<DrinkSubCategory, MenuItem[]> = {
  koreanAlcohol: [
    {
      id: 'dr1',
      nameZh: '口味烧酒',
      nameEn: 'FLAVOURED SOJU (350ML)',
      price: '1,200 RSD',
      descZh: 'Green Grape / Peach / Strawberry / Original / Fresh',
      descEn: 'Green Grape / Peach / Strawberry / Original / Fresh',
      textureZh: 'Smooth and clean',
      textureEn: 'Smooth and clean',
      weight: '350ml',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390619548-%E7%9C%9F%E9%9C%B22.JPG?auth_key=bc57c27f68a149dde3456bc752aa346acb5a001fd427e72da66b0a60e128faab',
      tags: [],
    },
  ],
  beer: [
    {
      id: 'dr2',
      nameZh: '喜力啤酒',
      nameEn: 'HEINEKEN (250ML)',
      price: '280 RSD',
      descZh: 'Premium lager beer',
      descEn: 'Premium lager beer',
      textureZh: 'Crisp and refreshing',
      textureEn: 'Crisp and refreshing',
      weight: '250ml',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390610808-%E5%96%9C%E5%8A%9B%E5%95%A4%E9%85%92.png?auth_key=28e820ebc79a3970fa5ff5ea8f3405af468f85923108881c2a34a5bd6881069c',
      tags: [],
    },
    {
      id: 'dr3',
      nameZh: '小鹿啤酒',
      nameEn: 'JELEN (500ML)',
      price: '200 RSD',
      descZh: 'Serbian beer',
      descEn: 'Serbian beer',
      textureZh: 'Light and refreshing',
      textureEn: 'Light and refreshing',
      weight: '500ml',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390600828-Jelen%E5%95%A4%E9%85%92.png?auth_key=e1c856187c496df000c44aa5ebfd424deddad30854892fa4f723f5f69f35b936',
      tags: [],
    },
  ],
  beverage: [
    {
      id: 'dr4',
      nameZh: '可乐',
      nameEn: 'COCA COLA (330ML)',
      price: '150 RSD',
      descZh: 'Classic cola',
      descEn: 'Classic cola',
      textureZh: 'Sweet and fizzy',
      textureEn: 'Sweet and fizzy',
      weight: '330ml',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777723076489-%E5%8F%AF%E4%B9%90.JPG?auth_key=4585aee612f9770209e690b1e51786e03b5e5747e9084d3a586b16cf26ad6861',
      tags: [],
    },
    {
      id: 'dr5',
      nameZh: '水',
      nameEn: 'ROSA (500ML)',
      price: '100 RSD',
      descZh: 'Still water',
      descEn: 'Still water',
      textureZh: 'Pure and clean',
      textureEn: 'Pure and clean',
      weight: '500ml',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390633891-rosa%E6%B0%B4.png?auth_key=a88f000993dbcbd8543cf343a40d03897dfb493a7eaecd0d5ee0be49d1215446',
      tags: [],
    },
    {
      id: 'dr6',
      nameZh: '气泡水',
      nameEn: 'SPARKLING WATER (250ML)',
      price: '100 RSD',
      descZh: 'Sparkling mineral water',
      descEn: 'Sparkling mineral water',
      textureZh: 'Crisp and bubbly',
      textureEn: 'Crisp and bubbly',
      weight: '500ml',
      image: '',
      tags: [],
    },
  ],
  dessert: [
    {
      id: 'd1',
      nameZh: '奥利奥雪媚娘',
      nameEn: 'OREO MOCHI',
      price: '300 RSD',
      descZh: 'Soft mochi with Oreo cream filling',
      descEn: 'Soft mochi with Oreo cream filling',
      textureZh: 'Soft and sweet',
      textureEn: 'Soft and sweet',
      weight: '1 piece',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777723411081-%E5%A5%A5%E5%88%A9%E5%A5%A5%E9%9B%AA%E5%AA%9A%E5%A8%98%E4%BE%A7%E9%9D%A22.JPG?auth_key=5c11c2e57be51d16a9028397c878802392b794b00afc3a850fc0115f1ae196ad',
      tags: [],
    },
    {
      id: 'd2',
      nameZh: '桃子雪媚娘',
      nameEn: 'PEACH MOCHI',
      price: '300 RSD',
      descZh: 'Soft mochi with peach cream filling',
      descEn: 'Soft mochi with peach cream filling',
      textureZh: 'Soft and fruity',
      textureEn: 'Soft and fruity',
      weight: '1 piece',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777724320066-%E6%A1%83%E5%AD%90%E9%9B%AA%E6%A2%85%E5%A8%98%E4%BE%A7%E9%9D%A22.JPG?auth_key=c619b07381d5ed0dd011d1c7e309e679eeb83c2851c13324e29b0dd3bcabec6e',
      tags: [],
    },
    {
      id: 'd3',
      nameZh: '芒果雪媚娘',
      nameEn: 'MANGO MOCHI',
      price: '300 RSD',
      descZh: 'Soft mochi with mango cream filling',
      descEn: 'Soft mochi with mango cream filling',
      textureZh: 'Soft and tropical',
      textureEn: 'Soft and tropical',
      weight: '1 piece',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777721780450-%E8%8A%92%E6%9E%9C%E9%9B%AA%E5%AA%9A%E5%A8%98%E4%BE%A7%E9%9D%A22.JPG?auth_key=dd652f24d4f3461f67af8936754579e2041004c0940ee8b607d745aefd13b579',
      tags: [],
    },
    {
      id: 'd4',
      nameZh: '草莓雪媚娘',
      nameEn: 'STRAWBERRY MOCHI',
      price: '300 RSD',
      descZh: 'Soft mochi with strawberry cream filling',
      descEn: 'Soft mochi with strawberry cream filling',
      textureZh: 'Soft and fruity',
      textureEn: 'Soft and fruity',
      weight: '1 piece',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777724164356-dji_mimo_20000119_030924_20000119090923_1777723611449_photo.JPG?auth_key=9d2a0532e1dc3dfe387cb9d83e6f486ab5f9f1f9e182e50f5234408d2f70d3b6',
      tags: [],
    },
    {
      id: 'd5',
      nameZh: '抹茶雪媚娘',
      nameEn: 'MATCHA MOCHI',
      price: '380 RSD',
      descZh: 'Soft mochi with matcha cream filling',
      descEn: 'Soft mochi with matcha cream filling',
      textureZh: 'Soft and aromatic',
      textureEn: 'Soft and aromatic',
      weight: '1 piece',
      image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777723240152-%E6%8A%B9%E8%8C%B6%E9%9B%AA%E6%A2%85%E5%A8%98%E4%BE%A7%E9%9D%A22.JPG?auth_key=664beb5c05307118c76a3f64a345306f62d46f366fde03f147d93042e1cec713',
      tags: [],
    },
  ],
};

const tagIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  spicy: { icon: <Flame size={14} />, label: 'Spicy' },
  gluten: { icon: <Wheat size={14} />, label: 'Gluten' },
  nuts: { icon: <Nut size={14} />, label: 'Nuts' },
  halal: { icon: <CircleDot size={14} />, label: 'Halal' },
  vegan: { icon: <Leaf size={14} />, label: 'Vegan' },
};

const tagColors: Record<string, string> = {
  spicy: 'bg-burgundy',
  gluten: 'bg-burgundy-light',
  nuts: 'bg-burgundy',
  halal: 'bg-burgundy',
  vegan: 'bg-burgundy-light',
};

function BbqMenuSection({ lang }: { lang: 'zh' | 'en' }) {
  const [activeSubCategory, setActiveSubCategory] = useState<BbqSubCategory>('pork');

  return (
    <div>
      {/* Sub Category Tabs */}
      <div className="flex flex-nowrap justify-center gap-3 sm:gap-6 mb-8 border-b border-gray-200 pb-4 overflow-x-auto px-2">
        {bbqSubCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubCategory(sub.id)}
            className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 pb-2 whitespace-nowrap ${
              activeSubCategory === sub.id
                ? 'text-burgundy border-b-2 border-burgundy'
                : 'text-gray-600 hover:text-burgundy'
            }`}
          >
            {sub.nameEn}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
        <h2 className="text-gray-900 text-xl font-bold tracking-wider uppercase">
          {bbqSubCategories.find(s => s.id === activeSubCategory)?.nameEn}
        </h2>
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
      </div>

      {/* Menu Items Grid - 1 column on mobile, 2 on desktop */}
      <motion.div
        key={activeSubCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8"
      >
        {bbqMenuData[activeSubCategory].map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 group">
            {/* Image Placeholder */}
            <div className="w-full sm:w-40 h-48 sm:h-32 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-burgundy/10">
              {item.image ? (
                <img
                  src={item.image}
                  alt={lang === 'zh' ? item.nameZh : item.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-burgundy/30 text-xs text-center px-2">${lang === 'zh' ? '图片占位' : 'Image Placeholder'}</div>`;
                  }}
                />
              ) : (
                <div className="text-burgundy/30 text-xs text-center px-2">
                  {lang === 'zh' ? '图片占位' : 'Image Placeholder'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1">
                  {item.nameKo ? (
                    <>
                      <h3 className="text-gray-900 font-bold text-base sm:text-lg uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                        {item.nameKo}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{item.nameEn}</p>
                    </>
                  ) : (
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                      {lang === 'zh' ? item.nameZh : item.nameEn}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.isNew && (
                    <span className="text-xs bg-burgundy text-cream px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">{item.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-relaxed">
                {lang === 'zh' ? item.descZh : item.descEn}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm italic mb-2">
                Texture: {lang === 'zh' ? item.textureEn : item.textureEn}
              </p>

              <p className="text-gray-400 text-xs">
                {item.weight}
              </p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${tagColors[tag]} text-cream text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                    >
                      {tagIcons[tag].icon}
                      {tagIcons[tag].label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AccompanimentMenuSection({ lang }: { lang: 'zh' | 'en' }) {
  const [activeSubCategory, setActiveSubCategory] = useState<AccompanimentSubCategory>('meal');

  return (
    <div>
      {/* Sub Category Tabs */}
      <div className="flex flex-nowrap justify-center gap-3 sm:gap-6 mb-8 border-b border-gray-200 pb-4 overflow-x-auto px-2">
        {accompanimentSubCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubCategory(sub.id)}
            className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 pb-2 whitespace-nowrap ${
              activeSubCategory === sub.id
                ? 'text-burgundy border-b-2 border-burgundy'
                : 'text-gray-600 hover:text-burgundy'
            }`}
          >
            {sub.nameEn}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
        <h2 className="text-gray-900 text-xl font-bold tracking-wider uppercase">
          {accompanimentSubCategories.find(s => s.id === activeSubCategory)?.nameEn}
        </h2>
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
      </div>

      {/* Menu Items Grid - 1 column on mobile, 2 on desktop */}
      <motion.div
        key={activeSubCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8"
      >
        {accompanimentMenuData[activeSubCategory].map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 group">
            {/* Image Placeholder */}
            <div className="w-full sm:w-40 h-48 sm:h-32 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-burgundy/10">
              {item.image ? (
                <img
                  src={item.image}
                  alt={lang === 'zh' ? item.nameZh : item.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-burgundy/30 text-xs text-center px-2">${lang === 'zh' ? '图片占位' : 'Image Placeholder'}</div>`;
                  }}
                />
              ) : (
                <div className="text-burgundy/30 text-xs text-center px-2">
                  {lang === 'zh' ? '图片占位' : 'Image Placeholder'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1">
                  {item.nameKo ? (
                    <>
                      <h3 className="text-gray-900 font-bold text-base sm:text-lg uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                        {item.nameKo}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{item.nameEn}</p>
                    </>
                  ) : (
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                      {lang === 'zh' ? item.nameZh : item.nameEn}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.isNew && (
                    <span className="text-xs bg-burgundy text-cream px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">{item.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-relaxed">
                {lang === 'zh' ? item.descZh : item.descEn}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm italic mb-2">
                Texture: {lang === 'zh' ? item.textureEn : item.textureEn}
              </p>

              <p className="text-gray-400 text-xs">
                {item.weight}
              </p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${tagColors[tag]} text-cream text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                    >
                      {tagIcons[tag].icon}
                      {tagIcons[tag].label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

    </div>
  );
}

function DrinkMenuSection({ lang }: { lang: 'zh' | 'en' }) {
  const [activeSubCategory, setActiveSubCategory] = useState<DrinkSubCategory>('koreanAlcohol');

  return (
    <div>
      {/* Sub Category Tabs */}
      <div className="flex flex-nowrap justify-center gap-3 sm:gap-6 mb-8 border-b border-gray-200 pb-4 overflow-x-auto px-2">
        {drinkSubCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubCategory(sub.id)}
            className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 pb-2 whitespace-nowrap ${
              activeSubCategory === sub.id
                ? 'text-burgundy border-b-2 border-burgundy'
                : 'text-gray-600 hover:text-burgundy'
            }`}
          >
            {sub.nameEn}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
        <h2 className="text-gray-900 text-xl font-bold tracking-wider uppercase">
          {drinkSubCategories.find(s => s.id === activeSubCategory)?.nameEn}
        </h2>
        <div className="h-px bg-gray-300 flex-1 max-w-md" />
      </div>

      {/* Menu Items Grid - 1 column on mobile, 2 on desktop */}
      <motion.div
        key={activeSubCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8"
      >
        {drinkMenuData[activeSubCategory].map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 group">
            {/* Image Placeholder */}
            <div className="w-full sm:w-40 h-48 sm:h-32 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-burgundy/10">
              {item.image ? (
                <img
                  src={item.image}
                  alt={lang === 'zh' ? item.nameZh : item.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-burgundy/30 text-xs text-center px-2">${lang === 'zh' ? '图片占位' : 'Image Placeholder'}</div>`;
                  }}
                />
              ) : (
                <div className="text-burgundy/30 text-xs text-center px-2">
                  {lang === 'zh' ? '图片占位' : 'Image Placeholder'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1">
                  {item.nameKo ? (
                    <>
                      <h3 className="text-gray-900 font-bold text-base sm:text-lg uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                        {item.nameKo}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{item.nameEn}</p>
                    </>
                  ) : (
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                      {lang === 'zh' ? item.nameZh : item.nameEn}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.isNew && (
                    <span className="text-xs bg-burgundy text-cream px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">{item.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-relaxed">
                {lang === 'zh' ? item.descZh : item.descEn}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm italic mb-2">
                Texture: {lang === 'zh' ? item.textureEn : item.textureEn}
              </p>

              <p className="text-gray-400 text-xs">
                {item.weight}
              </p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${tagColors[tag]} text-cream text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                    >
                      {tagIcons[tag].icon}
                      {tagIcons[tag].label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SimpleMenuSection({ items, lang, title }: { items: MenuItem[]; lang: 'zh' | 'en'; title?: string }) {
  return (
    <div>
      {title && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-gray-300 flex-1 max-w-md" />
          <h2 className="text-gray-900 text-xl font-bold tracking-wider uppercase">{title}</h2>
          <div className="h-px bg-gray-300 flex-1 max-w-md" />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 group">
            {/* Image Placeholder */}
            <div className="w-full sm:w-40 h-48 sm:h-32 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-burgundy/10">
              {item.image ? (
                <img
                  src={item.image}
                  alt={lang === 'zh' ? item.nameZh : item.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="text-burgundy/30 text-xs text-center px-2">${lang === 'zh' ? '图片占位' : 'Image Placeholder'}</div>`;
                  }}
                />
              ) : (
                <div className="text-burgundy/30 text-xs text-center px-2">
                  {lang === 'zh' ? '图片占位' : 'Image Placeholder'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-gray-900 font-bold text-base uppercase tracking-wide leading-tight group-hover:text-burgundy transition-colors">
                  {lang === 'zh' ? item.nameZh : item.nameEn}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.isNew && (
                    <span className="text-xs bg-burgundy text-cream px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  <span className="text-gray-900 font-semibold text-base">{item.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                {lang === 'zh' ? item.descZh : item.descEn}
              </p>

              <p className="text-gray-500 text-sm italic mb-2">
                Texture: {lang === 'zh' ? item.textureEn : item.textureEn}
              </p>

              <p className="text-gray-400 text-xs">
                {item.weight}
              </p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${tagColors[tag]} text-cream text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                    >
                      {tagIcons[tag].icon}
                      {tagIcons[tag].label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('bbq');
  const { lang } = React.useContext(LanguageContext);

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === 'zh' ? '菜单' : 'Menu'}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '每桌赠送一份生菜和4种小菜'
              : 'Complimentary one serving lettuce & 4 side dishes included'}
          </p>
        </motion.div>

        {/* Main Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-burgundy text-cream'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'zh' ? cat.nameZh : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeCategory === 'bbq' && <BbqMenuSection lang={lang} />}
          {activeCategory === 'accompaniment' && <AccompanimentMenuSection lang={lang} />}
          {activeCategory === 'drinks' && <DrinkMenuSection lang={lang} />}
        </motion.div>
      </div>
    </div>
  );
}
