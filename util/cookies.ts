import { PastaType } from './database';

export type CookieType = {
  id: number;
  quantity: number;
};

// Unit: Test functions for adding and removing info from cookie
// adding: in pages/products/[product].tsx

export function addNewItemToCookies(
  cookies: CookieType[],
  pastaItem: PastaType,
  newQuantity: number,
) {
  const newCookie = [...cookies, { id: pastaItem.id, quantity: newQuantity }];
  return newCookie;
}
// removing: in pages/cart.tsx

export function removeItemFromCookie(
  cookies: CookieType[],
  itemToBeDeleted: PastaType,
) {
  const cookieIndex = cookies.findIndex(
    (cookie: CookieType) => cookie.id === itemToBeDeleted.id,
  );
  cookies.splice(cookieIndex, 1);
  return cookies;
}

/** Unit: Test function for updating amount in item of cookie (eg. adding an item to the cart that already exists) */
export function updateAmountOfExistingCookieItem(
  cookies: CookieType[],
  pastaItem: PastaType,
  newQuantity: number,
) {
  const cookieIndex = cookies.findIndex(
    (cookie: CookieType) => cookie.id === pastaItem.id,
  );
  // Update object's name property.
  cookies[cookieIndex].quantity += newQuantity;
  return cookies;
}
