exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', function(table){
    table.increments();
    table.text('firstname');
    table.text('lastname');
    table.text('phone');
    table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');  
};
