import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserUseCase } from '../user-case'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const userUseCase = new UserUseCase(userRepository)

  return userUseCase
}
