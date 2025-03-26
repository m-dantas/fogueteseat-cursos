import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return { message: 'Hello, World!' }
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`Server is running on port ${3000}`)
  })
