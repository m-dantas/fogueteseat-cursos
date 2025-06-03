import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface ISearchGymUseCaseRequest {
  query: string
  page: number
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymUseCaseRequest): Promise<ISearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
