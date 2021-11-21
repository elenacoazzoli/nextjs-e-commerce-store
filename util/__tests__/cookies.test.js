import {
  addNewItemToCookies,
  removeItemFromCookie,
  updateAmountOfExistingCookieItem,
} from '../cookies';

// add
const currentCookie = [{ id: 3, quantity: 3 }];
const pastaProduct = {
  id: 2,
  name: "Tagliatelle all''uovo",
  description:
    'Tagliatelle is an egg-dough-based long, ribbon shaped pasta. Tagliatelle pair really well with chunky sauces, like ragù alla bolognese.',
  price: 420,
  category: '',
  weight: 1000,
  cookingTime: 8,
  image: 'tagliatelle.jpg',
};
const quantityToBeAdded = 2;

test('Add new pasta product to existing cookie array', () => {
  expect(
    addNewItemToCookies(currentCookie, pastaProduct, quantityToBeAdded),
  ).toStrictEqual([
    { id: 3, quantity: 3 },
    { id: 2, quantity: 2 },
  ]);
});

// update
const toBeUpdatedCookie = [
  { id: 3, quantity: 3 },
  { id: 1, quantity: 5 },
  { id: 2, quantity: 3 },
];
test('Update pasta product quantity that already exists in cookie array', () => {
  expect(
    updateAmountOfExistingCookieItem(
      toBeUpdatedCookie,
      pastaProduct,
      quantityToBeAdded,
    ),
  ).toStrictEqual([
    { id: 3, quantity: 3 },
    { id: 1, quantity: 5 },
    { id: 2, quantity: 5 },
  ]);
});

// remove
const toBeDeletedCookie = [
  { id: 3, quantity: 3 },
  { id: 1, quantity: 5 },
  { id: 2, quantity: 2 },
];
test('Delete pasta product from cookie array', () => {
  expect(removeItemFromCookie(toBeDeletedCookie, pastaProduct)).toStrictEqual([
    { id: 3, quantity: 3 },
    { id: 1, quantity: 5 },
  ]);
});
