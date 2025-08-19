import { UniqueEntityID } from "@/core/entities/unique-entity-id.js"
import type { QuestionRepository } from "../repositories/questions-repository.js"
import { Question } from "../../enterprise/entities/question.js"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository
  ){}

  async execute({ authorId, title, content }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionRepository.create(question)

    return {
      question
    }
  }
}