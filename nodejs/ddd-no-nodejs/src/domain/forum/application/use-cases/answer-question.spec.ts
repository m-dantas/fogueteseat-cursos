import { AnswerQuestionUseCase } from './answer-question'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

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