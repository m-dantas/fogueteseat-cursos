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

  async findById(answerId: string) {
    const question = this.items.find((item) => item.id.toString() === answerId)

    if (!question) {
      return null
    }

    return question
  }
}
