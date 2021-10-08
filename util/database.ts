export type pastasType = pastaType[];

export type pastaType = {
  id: number;
  quantity?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  weight: number;
  cooking_time: number;
  image: string;
};

export const pastas: pastasType = [
  {
    id: 1,
    name: 'Rigatoni',
    description:
      'Rigatoni, which comes from the word “rigato” meaning ridged, are short, wide tubes of pasta that have ridges on the outside, but are smooth on the inside. Rigatoni are perfect for big chunkier sauces as their ridges and wide center help capture the sauce perfectly. This also helps them contain meats and large vegetables.',
    price: 3.9,
    category: 'Durum wheat semolina flour',
    weight: 500,
    cooking_time: 12,
    image: '/images/rigatoni.jpg',
  },
  {
    id: 2,
    name: "Tagliatelle all'uovo",
    description: '2 is the best pasta ever',
    price: 4.2,
    category: 'Fresh pasta',
    weight: 1000,
    cooking_time: 8,
    image: '/images/tagliatelle.jpg',
  },
  {
    id: 3,
    name: 'Spaghetti',
    description: '3 is the best pasta ever',
    price: 3.9,
    category: 'Durum wheat semolina flour',
    weight: 500,
    cooking_time: 14,
    image: '/images/spaghetti.jpg',
  },
  {
    id: 4,
    name: 'Fusilli integrali',
    description: '4 is the best pasta ever',
    price: 4.5,
    category: 'Whole wheat flour',
    weight: 500,
    cooking_time: 10,
    image: '/images/rigatoni.jpg',
  },
  {
    id: 5,
    name: 'Bucatini',
    description: '5 is the best pasta ever',
    price: 4.5,
    category: 'Durum wheat semolina flour',
    weight: 500,
    cooking_time: 11,
    image: '/images/rigatoni.jpg',
  },
  {
    id: 6,
    name: 'Conchiglie',
    description: '6 is the best pasta ever',
    price: 3.9,
    category: 'Durum wheat semolina flour',
    weight: 500,
    cooking_time: 8,
    image: '/images/rigatoni.jpg',
  },
  {
    id: 7,
    name: 'Tortellini',
    description: '7 is the best pasta ever',
    price: 5.0,
    category: 'Fresh pasta',
    weight: 500,
    cooking_time: 7,
    image: '/images/rigatoni.jpg',
  },
];
