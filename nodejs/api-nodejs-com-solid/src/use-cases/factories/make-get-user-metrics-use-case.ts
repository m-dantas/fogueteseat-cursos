import { GetUserMetrics } from '../get-user-metrics-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetrics(checkInRepository)

  return useCase
}
