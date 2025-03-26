import setupKnex from 'knex'

// export const knex = setupKnex({
//   client: 'better-sqlite3',
//   connection: {
//     filename: ':memory:',
//     options: {
//       nativeBinding: './node_modules/better-sqlite3/build/Release/better_sqlite3.node'
//     }
//   },
// })

export const knex = setupKnex({
  client: 'sqlite',
  connection: {
    filename: ':memory:',
  },
})
