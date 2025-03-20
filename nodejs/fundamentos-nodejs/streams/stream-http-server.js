import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) *- 1
    
    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// Req => ReadeableStream
// Res => WritableStream

const server = http.createServer(async (req, res) => {
  // Aplicacao de Stream
  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)

  const buffers = []

  // Ser para garantir que apenas vai sair daqui quando ter todos os pedacos da Stream
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent =  Buffer.concat(buffers).toString()
  console.log(fullStreamContent)
  return res.end(fullStreamContent)
})

server.listen(3000, () => {
  console.log('Server running on port 3000')
})