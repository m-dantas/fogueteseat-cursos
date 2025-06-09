import { FetchUserCheckIn } from '../fetch-user-check-ins-history-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckIn(checkInRepository)

  return useCase
}
