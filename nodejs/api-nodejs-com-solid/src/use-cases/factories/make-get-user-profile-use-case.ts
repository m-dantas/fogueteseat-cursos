import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfilesUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfilesUseCase(userRepository)

  return useCase
}
