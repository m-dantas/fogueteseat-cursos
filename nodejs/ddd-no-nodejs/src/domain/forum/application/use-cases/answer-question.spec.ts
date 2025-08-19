import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer Tests', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an aswer', async () => {
    const { answer } = await sut.execute({
      content: 'Nova resposta',
      questionId: '1',
      instructorId: '1',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0]?.id).toEqual(answer.id)
  })
})
