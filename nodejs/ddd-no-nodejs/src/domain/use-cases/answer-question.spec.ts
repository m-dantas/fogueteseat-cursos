import { AnswerQuestionUseCase } from './answer-question.js'
import type { AnswersRepository } from '../repositories/answer-repository.js';
import type { Answer } from '../entities/answer.js';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {}
}

test('create an aswer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '1',
    instructorId: '1'
  })

  expect(answer.content).toEqual('Nova resposta')
})