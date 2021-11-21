import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

export type PastasType = PastaType[];

export type CategoryType = {
  category: string;
};

export type PastaType = {
  id: number;
  quantity?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  weight: number;
  cookingTime: number;
  image: string;
};

setPostgresDefaultsOnHeroku();

// read the environment variables in the .env file to connect to Postgres
dotenvSafe.config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we're in development, make sure that we connect only
    // once to the database
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to postgres (only once)
const sql = connectOneTimeToDatabase();

export async function getPastas() {
  const pastas = await sql<PastaType[]>`
    SELECT
      pastas.id,
      pastas.name,
      pastas.description,
      pastas.weight,
      pastas.cooking_time,
      pastas.image,
      pastas.price,
      categories.category
     FROM
      pastas, categories
     WHERE
      pastas.category = categories.id;
  `;
  return pastas.map((pasta) => {
    // Convert the snake case cooking_time to cookingTime
    return camelcaseKeys(pasta);
  });
}

export async function getCategories() {
  const pastaCategories = await sql<string[]>`
    SELECT
    categories.category
    FROM
    categories
  `;
  return pastaCategories;
}

export async function getPasta(id: number) {
  const pastas = await sql<PastaType[]>`
    SELECT
    pastas.id,
      pastas.name,
      pastas.description,
      pastas.weight,
      pastas.cooking_time,
      pastas.image,
      pastas.price,
      categories.category
     FROM
      pastas, categories
     WHERE
      pastas.category = categories.id AND
      pastas.id = ${id};
  `;
  // we only have an array with one object
  return camelcaseKeys(pastas[0]);
}

export async function getPastasInCookies(ids: number[]) {
  if (ids.length > 0) {
    const pastasInCookies = await sql<PastaType[]>`
    SELECT
      pastas.id,
      pastas.name,
      pastas.image,
      pastas.price,
      categories.category
     FROM
      pastas, categories
     WHERE
      pastas.category = categories.id AND
      pastas.id IN (${ids});
  `;
    return pastasInCookies;
  } else {
    return [];
  }
}
