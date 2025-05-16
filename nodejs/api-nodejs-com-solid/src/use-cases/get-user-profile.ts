import { IUserRepository } from '@/repositories/users-repository'
import { User } from 'generated/prisma'
import { ResourceNotExistsError } from './errors/resource-not-found-error'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

interface IGetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfilesUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotExistsError()
    }

    return {
      user,
    }
  }
}
