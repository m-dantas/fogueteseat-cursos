import { Question } from '../../enterprise/entities/question.js'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(questionId: string): Promise<Question | null>
}
