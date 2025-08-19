import type { Question } from '../../enterprise/entities/question.js';
import type { QuestionRepository } from '../repositories/questions-repository.js';
import { CreateQuestionUseCase } from './create-question.js';

const fakeQuestionsRepository: QuestionRepository = {
  create: async (question: Question) => {}
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    content: 'Nova questão',
    authorId: '1',
    title: 'Nova questão'
  })

  expect(question.id).toBeTruthy()
})