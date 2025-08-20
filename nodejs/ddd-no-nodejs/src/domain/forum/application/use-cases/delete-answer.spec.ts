import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { DeleteAnswerUseCase } from './delete-answer.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer by id', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer by id', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-01'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: 'answer-01',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
