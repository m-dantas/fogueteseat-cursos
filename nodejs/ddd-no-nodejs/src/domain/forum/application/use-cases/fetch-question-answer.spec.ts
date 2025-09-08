import { FetchQuestionAnswersUseCase } from './fetch-question-answer.js'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-01'),
      }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-01'),
        }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
