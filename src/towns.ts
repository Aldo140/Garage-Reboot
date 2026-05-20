export type Corridor = 'north' | 'south' | 'east' | 'northeast' | 'west' | 'foothills';

export interface Town {
  slug: string;
  name: string;
  driveMin: number;
  km: number;
  corridor: Corridor;
}

export const TOWNS: Town[] = [
  // North – Hwy 2 North / QEII
  { slug: 'airdrie',              name: 'Airdrie',               driveMin: 30,  km: 40,  corridor: 'north' },
  { slug: 'crossfield',           name: 'Crossfield',            driveMin: 40,  km: 52,  corridor: 'north' },
  { slug: 'carstairs',            name: 'Carstairs',             driveMin: 50,  km: 65,  corridor: 'north' },
  { slug: 'didsbury',             name: 'Didsbury',              driveMin: 60,  km: 82,  corridor: 'north' },
  { slug: 'olds',                 name: 'Olds',                  driveMin: 70,  km: 95,  corridor: 'north' },
  { slug: 'innisfail',            name: 'Innisfail',             driveMin: 80,  km: 110, corridor: 'north' },
  { slug: 'red-deer',             name: 'Red Deer',              driveMin: 95,  km: 130, corridor: 'north' },
  { slug: 'lacombe',              name: 'Lacombe',               driveMin: 110, km: 145, corridor: 'north' },
  { slug: 'sylvan-lake',          name: 'Sylvan Lake',           driveMin: 120, km: 155, corridor: 'north' },
  { slug: 'ponoka',               name: 'Ponoka',                driveMin: 130, km: 165, corridor: 'north' },
  { slug: 'wetaskiwin',           name: 'Wetaskiwin',            driveMin: 150, km: 185, corridor: 'north' },
  { slug: 'camrose',              name: 'Camrose',               driveMin: 165, km: 200, corridor: 'north' },
  { slug: 'sundre',               name: 'Sundre',                driveMin: 90,  km: 115, corridor: 'north' },

  // South – Hwy 2 South
  { slug: 'de-winton',            name: 'De Winton',             driveMin: 20,  km: 25,  corridor: 'south' },
  { slug: 'okotoks',              name: 'Okotoks',               driveMin: 25,  km: 30,  corridor: 'south' },
  { slug: 'high-river',           name: 'High River',            driveMin: 40,  km: 50,  corridor: 'south' },
  { slug: 'nanton',               name: 'Nanton',                driveMin: 55,  km: 70,  corridor: 'south' },
  { slug: 'vulcan',               name: 'Vulcan',                driveMin: 75,  km: 95,  corridor: 'south' },
  { slug: 'claresholm',           name: 'Claresholm',            driveMin: 80,  km: 100, corridor: 'south' },
  { slug: 'fort-macleod',         name: 'Fort Macleod',          driveMin: 110, km: 145, corridor: 'south' },
  { slug: 'lethbridge',           name: 'Lethbridge',            driveMin: 120, km: 155, corridor: 'south' },
  { slug: 'coaldale',             name: 'Coaldale',              driveMin: 130, km: 165, corridor: 'south' },
  { slug: 'taber',                name: 'Taber',                 driveMin: 160, km: 195, corridor: 'south' },
  { slug: 'cardston',             name: 'Cardston',              driveMin: 150, km: 185, corridor: 'south' },

  // East – Hwy 1 TransCanada East
  { slug: 'chestermere',          name: 'Chestermere',           driveMin: 20,  km: 20,  corridor: 'east' },
  { slug: 'langdon',              name: 'Langdon',               driveMin: 35,  km: 45,  corridor: 'east' },
  { slug: 'strathmore',           name: 'Strathmore',            driveMin: 45,  km: 55,  corridor: 'east' },
  { slug: 'gleichen',             name: 'Gleichen',              driveMin: 60,  km: 75,  corridor: 'east' },
  { slug: 'bassano',              name: 'Bassano',               driveMin: 90,  km: 115, corridor: 'east' },
  { slug: 'brooks',               name: 'Brooks',                driveMin: 120, km: 155, corridor: 'east' },
  { slug: 'medicine-hat',         name: 'Medicine Hat',          driveMin: 165, km: 285, corridor: 'east' },

  // Northeast – Drumheller / Three Hills corridor
  { slug: 'irricana',             name: 'Irricana',              driveMin: 45,  km: 55,  corridor: 'northeast' },
  { slug: 'beiseker',             name: 'Beiseker',              driveMin: 50,  km: 65,  corridor: 'northeast' },
  { slug: 'acme',                 name: 'Acme',                  driveMin: 60,  km: 80,  corridor: 'northeast' },
  { slug: 'three-hills',          name: 'Three Hills',           driveMin: 80,  km: 105, corridor: 'northeast' },
  { slug: 'trochu',               name: 'Trochu',                driveMin: 95,  km: 120, corridor: 'northeast' },
  { slug: 'drumheller',           name: 'Drumheller',            driveMin: 85,  km: 135, corridor: 'northeast' },
  { slug: 'stettler',             name: 'Stettler',              driveMin: 150, km: 195, corridor: 'northeast' },

  // West – Hwy 1 / 1A Rockies
  { slug: 'cochrane',             name: 'Cochrane',              driveMin: 30,  km: 40,  corridor: 'west' },
  { slug: 'canmore',              name: 'Canmore',               driveMin: 60,  km: 105, corridor: 'west' },
  { slug: 'banff',                name: 'Banff',                 driveMin: 85,  km: 130, corridor: 'west' },
  { slug: 'rocky-mountain-house', name: 'Rocky Mountain House',  driveMin: 120, km: 175, corridor: 'west' },

  // Foothills / Southwest
  { slug: 'bragg-creek',          name: 'Bragg Creek',           driveMin: 40,  km: 50,  corridor: 'foothills' },
  { slug: 'millarville',          name: 'Millarville',           driveMin: 45,  km: 55,  corridor: 'foothills' },
  { slug: 'black-diamond',        name: 'Black Diamond',         driveMin: 50,  km: 65,  corridor: 'foothills' },
  { slug: 'turner-valley',        name: 'Turner Valley',         driveMin: 55,  km: 68,  corridor: 'foothills' },
];

export const CORRIDOR_LABELS: Record<Corridor, string> = {
  north:     'North — Hwy 2 / QEII',
  south:     'South — Hwy 2 South',
  east:      'East — TransCanada Hwy 1',
  northeast: 'Northeast — Drumheller Corridor',
  west:      'West — Rockies / Hwy 1A',
  foothills: 'Foothills / Southwest',
};

export const SERVICES = [
  'Garage Cleanout',
  'Junk Removal',
  'Estate Cleanout',
  'Moving Service',
  'Appliance Removal',
  'Furniture Removal',
];

export function driveLabel(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
