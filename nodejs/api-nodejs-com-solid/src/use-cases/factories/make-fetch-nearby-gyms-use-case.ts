import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbuGymsUseCase } from '../fetch-nearby-gyms-case'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbuGymsUseCase(gymsRepository)

  return useCase
}
