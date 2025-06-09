import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { ValidateCheckInUseCase } from '../validate-check-in-case'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
