import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    }, 1000)
    
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) *- 1

    // Primeiro callback eh usado quando ha erro
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultipleByTenStream extends Writable {
  // Chunk -> é o pedaço que lemos da string de leitura
  // Enconding -> é como a informação do chunk está codificada
  // Callback -> é a função que chamamos quando terminamos de escrever o chunk

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream() // Stream de leitura -> apenas leitura
  .pipe(new InverseNumberStream()) // Stream de transformacao -> ela obrigatoriamente vai ler dados e escrever dados para outro lugar, usada no intermeio da outras duas
  .pipe(new MultipleByTenStream()) // Stream de escrita -> apenas escrever dados