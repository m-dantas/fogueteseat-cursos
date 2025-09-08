import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswersRepository } from '../repositories/answer-repository.js'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answerQuestion: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerQuestion.findManyByQuestionId(questionId, {
      page,
    })

    if (!answers) {
      throw new Error('Answers not found')
    }

    return {
      answers,
    }
  }
}
