import { sumAllPrices } from '../cartSum';

test('All prices get correctly summed in the cart, rounded to two decimals', () => {
  const testSum = sumAllPrices([
    {
      id: 1,
      quantity: 3,
      name: 'Rigatoni',
      description:
        'Rigatoni, which comes from the word "rigato" meaning ridged, are short, wide tubes of pasta that have ridges on the outside, but are smooth on the inside. Rigatoni are perfect for big chunkier sauces as their ridges and wide center help capture the sauce perfectly. This also helps them contain meats and large vegetables.',
      price: 390,
      category: '',
      weight: 500,
      cookingTime: 12,
      image: 'rigatoni.jpg',
    },
    {
      id: 2,
      quantity: 6,
      name: "Tagliatelle all''uovo",
      description:
        'Tagliatelle is an egg-dough-based long, ribbon shaped pasta. Tagliatelle pair really well with chunky sauces, like ragù alla bolognese.',
      price: 420,
      category: '',
      weight: 1000,
      cookingTime: 8,
      image: 'tagliatelle.jpg',
    },
  ]);
  expect(testSum).toBe(36.9);
});
