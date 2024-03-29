// Creates table pastas
exports.up = async function up(sql) {
  await sql`
		CREATE TABLE pastas (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			name VARCHAR(40) NOT NULL,
			description VARCHAR(350) NOT NULL,
			category integer REFERENCES categories(id),
			weight integer,
			cooking_time integer,
			image VARCHAR(30),
			price integer
		);
	`;
};

// Deletes table pastas

exports.down = async function down(sql) {
  await sql`
		DROP TABLE pastas;`;
};
