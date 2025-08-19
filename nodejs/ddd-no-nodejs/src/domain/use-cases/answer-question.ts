import { Answer } from "../entities/answer.js"
import type { AnswersRepository } from "../repositories/answer-repository.js"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ){}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    })

    await this.answersRepository.create(answer)

    return answer
  }
}