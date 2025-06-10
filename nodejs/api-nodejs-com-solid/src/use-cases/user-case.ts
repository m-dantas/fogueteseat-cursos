import { IUserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from 'generated/prisma'

interface IUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
}

interface IUserUseCaseResponse {
  user: User
}

export class UserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: IUserUseCaseRequest): Promise<IUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      role,
      password_hash,
    })

    return { user }
  }
}
