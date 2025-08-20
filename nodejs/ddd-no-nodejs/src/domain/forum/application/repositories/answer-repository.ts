import { Answer } from '../../enterprise/entities/answer.js'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
}
