const pastas = [
  {
    name: 'Rigatoni',
    description:
      'Rigatoni, which comes from the word "rigato" meaning ridged, are short, wide tubes of pasta that have ridges on the outside, but are smooth on the inside. Rigatoni are perfect for big chunkier sauces as their ridges and wide center help capture the sauce perfectly. This also helps them contain meats and large vegetables.',
    price: 390,
    category: 1,
    weight: 500,
    cooking_time: 12,
    image: 'rigatoni.jpg',
  },
  {
    name: "Tagliatelle all''uovo",
    description:
      'Tagliatelle is an egg-dough-based long, ribbon shaped pasta. Tagliatelle pair really well with chunky sauces, like ragù alla bolognese.',
    price: 420,
    category: 2,
    weight: 1000,
    cooking_time: 8,
    image: 'tagliatelle.jpg',
  },
  {
    name: 'Spaghetti',
    description:
      'Spaghetti (“a length of cord”) may just be the best known pasta shape. A long, thin piece of pasta, spaghetti has a lot of versatility and mixes wonderfully with a variety of sauces.',
    price: 390,
    category: 1,
    weight: 500,
    cooking_time: 14,
    image: 'spaghetti.jpg',
  },
  {
    name: 'Fusilli integrali',
    description:
      'Fusilli is a spiral or corkscrew shaped pasta. Because of its twists, it has grooves that are good for holding onto sauce. Fusilli were originally developed in Southern Italy by rolling and setting fresh spaghetti around thin rods to dry.',
    price: 450,
    category: 3,
    weight: 500,
    cooking_time: 10,
    image: 'fusilliintegrali.jpg',
  },
  {
    name: 'Cannelloni',
    description:
      'Cannelloni, "large reeds" in Italian, are a cylindrical type of lasagna generally served baked with a filling and covered by a sauce. Popular stuffings include spinach and ricotta or minced beef.',
    price: 450,
    category: 2,
    weight: 500,
    cooking_time: 7,
    image: 'cannelloni.jpg',
  },
  {
    name: 'Conchiglie',
    description:
      'Conchiglie is a pasta variety that is shaped like a conch shell. This shape is commonly used in pasta salads and with heavy meat sauces.',
    price: 390,
    category: 1,
    weight: 1000,
    cooking_time: 8,
    image: 'conchiglie.jpg',
  },
  {
    name: 'Tortellini',
    description:
      'Tortellini is a ring shaped stuffed pasta that is typically filled with meat.I t is a traditional pasta in the Bologna region of Italy and is often served in broth.',
    price: 520,
    category: 2,
    weight: 500,
    cooking_time: 7,
    image: 'tortellini.jpg',
  },
  {
    name: 'Fusilli bucati',
    description:
      'Fusilli lunghi bucati are originally from Campania and have a simple spiral shape. Generally, this pasta is best with parmesan or pecorino cheese or with tomato and vegetable based sauces with aubergines and peppers.',
    price: 390,
    category: 1,
    weight: 500,
    cooking_time: 9,
    image: 'fusillibucati.jpg',
  },
  {
    name: 'Farfalle al nero di seppia',
    description:
      'The word farfalle means butterflies in Italian and is commonly referred to as bow tie pasta because of its shape. This special version is ade using fresh squid ink to add flavour and color.',
    price: 490,
    category: 3,
    weight: 500,
    cooking_time: 11,
    image: 'farfalle.jpg',
  },
];

// Inserts values into pastas table
exports.up = async function up(sql) {
  console.log('Inserting pastas...');
  for (const pasta of pastas) {
    await sql`
		INSERT INTO pastas
		(name,description,category,weight,cooking_time,image,price)
		VALUES
		(${pasta.name},${pasta.description},${pasta.category},${pasta.weight},${pasta.cooking_time},${pasta.image},${pasta.price});
	`;
  }
};

// Deletes pastas rows
exports.down = async function down(sql) {
  console.log('Removing pastas...');
  for (const pasta of pastas) {
    await sql`
		DELETE FROM pastas
		WHERE
		name = ${pasta.name};
	`;
  }
};
