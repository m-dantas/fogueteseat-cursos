import { CheckIn } from 'generated/prisma'
import { ICheckInsRepository } from '@/repositories/check-ins-repository'

interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckIn {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )
    return {
      checkIns,
    }
  }
}
