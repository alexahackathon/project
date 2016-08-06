exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('users').insert({
      id: 1,
      firstname: 'John', 
      phone: '8082921010'
    }),
    knex('contacts').del()
  ]);
};