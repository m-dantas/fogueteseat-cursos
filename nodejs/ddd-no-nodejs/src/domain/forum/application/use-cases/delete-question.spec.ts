import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { DeleteQuestionUseCase } from './delete-question.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-01'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-01',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question by id', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-01'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: 'question-01',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
