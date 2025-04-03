import { BaseProductType } from '../types/products';

import babyBlueIcon from '../assets/products/baby-blue/baby-blue-icon.png';
import bikerCrankIcon from '../assets/products/biker-crank/biker-crank-icon.png';
import cocaineIcon from '../assets/products/cocaine/cocaine-icon.png';
import glassIcon from '../assets/products/glass/glass-icon.png';
import grandDaddyPurpleIcon from '../assets/products/grand-daddy-purple/grand-daddy-purple-icon.png';
import greenCrackIcon from '../assets/products/green-crack/green-crack-icon.png';
import methIcon from '../assets/products/meth/meth-icon.png';
import ogKushIcon from '../assets/products/og-kush/og-kush-icon.png';
import sourDieselIcon from '../assets/products/sour-diesel/sour-diesel-icon.png';

export const data: BaseProductType[] = [
  { id: 'baby-blue', name: 'Baby Blue', image: babyBlueIcon },
  { id: 'biker-crank', name: 'Biker Crank', image: bikerCrankIcon },
  { id: 'cocaine', name: 'Cocaine', image: cocaineIcon },
  { id: 'glass', name: 'Glass', image: glassIcon },
  { id: 'grand-daddy-purple', name: 'Grand Daddy Purp', image: grandDaddyPurpleIcon },
  { id: 'green-crack', name: 'Green Crack', image: greenCrackIcon },
  { id: 'meth', name: 'Meth', image: methIcon },
  { id: 'og-kush', name: 'OG Kush', image: ogKushIcon },
  { id: 'sour-diesel', name: 'Sour Diesel', image: sourDieselIcon }
];
