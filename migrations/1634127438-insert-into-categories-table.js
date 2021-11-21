const categories = [
  {
    category: 'Durum wheat semolina flour',
  },
  {
    category: 'Fresh pasta',
  },
  {
    category: 'Special',
  },
];

exports.up = async function up(sql) {
  console.log('Inserting categories...');
  for (const category of categories) {
    await sql`
		INSERT INTO categories
		(category)
		VALUES
		(${category.category});
	`;
  }
};

exports.down = async function down(sql) {
  console.log('Removing categories...');
  for (const category of categories) {
    await sql`
		DELETE FROM categories
		WHERE
		category = ${category.category};
	`;
  }
};
