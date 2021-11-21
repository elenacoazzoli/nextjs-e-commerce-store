// Creates table categories
exports.up = async function up(sql) {
  await sql`
		CREATE TABLE categories (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			category VARCHAR(40) NOT NULL
		);
	`;
};

// Deletes table categories

exports.down = async function down(sql) {
  await sql`
		DROP TABLE categories;`;
};
