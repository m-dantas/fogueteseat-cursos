import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { CreateQuestionUseCase } from './create-question.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Tests', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      content: 'Nova questão',
      authorId: '1',
      title: 'Nova questão',
    })

    expect(question.id).toBeTruthy()
  })
})
