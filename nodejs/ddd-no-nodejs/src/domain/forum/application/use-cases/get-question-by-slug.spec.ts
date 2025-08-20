import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { Question } from '../../enterprise/entities/question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Nova questão',
      slug: Slug.create('nova-questao'),
      content: 'meu conteudo',
      authorId: new UniqueEntityID(),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'nova-questao',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
