import type { QuestionRepository } from "@/domain/forum/application/repositories/questions-repository.js";
import type { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}