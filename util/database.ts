import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type PastasType = PastaType[];

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

// read the environment variables in the .env file to connect to Postgres
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
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
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
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

export async function getPasta(id: number) {
  const pastas = await sql<PastaType[]>`
    SELECT
      *
    FROM
      pastas
    WHERE
      id = ${id};
  `;
  // return pastas[0] because we only have an array with one object
  return camelcaseKeys(pastas[0]);
}

// export const pastas: PastasType = [
//   {
//     id: 1,
//     name: 'Rigatoni',
//     description:
//       'Rigatoni, which comes from the word “rigato” meaning ridged, are short, wide tubes of pasta that have ridges on the outside, but are smooth on the inside. Rigatoni are perfect for big chunkier sauces as their ridges and wide center help capture the sauce perfectly. This also helps them contain meats and large vegetables.',
//     price: 3.9,
//     category: 'Durum wheat semolina flour',
//     weight: 500,
//     cookingTime: 12,
//     image: '/images/rigatoni.jpg',
//   },
//   {
//     id: 2,
//     name: "Tagliatelle all'uovo",
//     description:
//       'Tagliatelle is an egg-dough-based long, ribbon shaped pasta. Tagliatelle pair really well with chunky sauces, like ragù alla bolognese.',
//     price: 4.2,
//     category: 'Fresh pasta',
//     weight: 1000,
//     cooking_time: 8,
//     image: '/images/tagliatelle.jpg',
//   },
//   {
//     id: 3,
//     name: 'Spaghetti',
//     description:
//       'Spaghetti (“a length of cord”) may just be the best known pasta shape. A long, thin piece of pasta, spaghetti has a lot of versatility and mixes wonderfully with a variety of sauces.',
//     price: 3.9,
//     category: 'Durum wheat semolina flour',
//     weight: 500,
//     cooking_time: 14,
//     image: '/images/spaghetti.jpg',
//   },
//   {
//     id: 4,
//     name: 'Fusilli integrali',
//     description: '4 is the best pasta ever',
//     price: 4.5,
//     category: 'Whole wheat flour',
//     weight: 500,
//     cooking_time: 10,
//     image: '/images/fusilliintegrali.jpg',
//   },
//   {
//     id: 5,
//     name: 'Cannelloni',
//     description: '5 is the best pasta ever',
//     price: 4.5,
//     category: 'Durum wheat semolina flour',
//     weight: 500,
//     cooking_time: 11,
//     image: '/images/cannelloni.jpg',
//   },
//   {
//     id: 6,
//     name: 'Conchiglie',
//     description: '6 is the best pasta ever',
//     price: 3.9,
//     category: 'Durum wheat semolina flour',
//     weight: 500,
//     cooking_time: 8,
//     image: '/images/conchiglie.jpg',
//   },
//   {
//     id: 7,
//     name: 'Tortellini',
//     description: '7 is the best pasta ever',
//     price: 5.2,
//     category: 'Fresh pasta',
//     weight: 500,
//     cooking_time: 7,
//     image: '/images/tortellini.jpg',
//   },
//   {
//     id: 8,
//     name: 'Fusilli bucati',
//     description: '8 is the best pasta ever',
//     price: 3.9,
//     category: 'Durum wheat semolina flour',
//     weight: 500,
//     cooking_time: 9,
//     image: '/images/fusillibucati.jpg',
//   },
// ];
