import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findById(answerId: string) {
    const question = this.items.find((item) => item.id.toString() === answerId)

    if (!question) {
      return null
    }

    return question
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
