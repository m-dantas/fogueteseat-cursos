import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

describe("Transactions routes", () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(() => {
    execSync('pnpm run knex migrate:rollback --all')
    execSync('pnpm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 1000,
        type: 'credit'
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 1000,
        type: 'credit'
      })
      
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies as string[])
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 1000,
      })
    ])
  })

  it('should be able to get specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 1000,
        type: 'credit'
      })
      
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies as string[])
      .expect(200)

    const transactionId = listTransactionResponse.body.transactions[0].id
    
    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies as string[])
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 1000,
      })
    )
  })

  it('should be able to get summary', async () => {
    const createCreditTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 3000,
        type: 'credit'
      })

    const cookies = createCreditTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies as string[])
      .send({
        title: 'Debit transaction',
        amount: 1000,
        type: 'debit'
      })
      

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies as string[])
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 2000
    })
  })
})