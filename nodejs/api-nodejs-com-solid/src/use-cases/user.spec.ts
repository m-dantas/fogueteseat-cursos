import { describe, expect, it } from 'vitest'
import { UserUseCase } from './user-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('User Use Case', () => {
  it('should be able register new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

    const { user } = await userUseCase.execute({
      name: 'Mauricio Dantas',
      email: 'mauricio22@gmail.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

    const { user } = await userUseCase.execute({
      name: 'Mauricio Dantas',
      email: 'mauricio22@gmail.com',
      password: '12345',
    })

    const isPasswordCorrectly = await compare('12345', user.password_hash)

    expect(isPasswordCorrectly).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userUseCase = new UserUseCase(usersRepository)

    const email = 'mauricio22@gmail.com'

    await userUseCase.execute({
      name: 'Mauricio Dantas',
      email,
      password: '12345',
    })

    await expect(() =>
      userUseCase.execute({
        name: 'Mauricio Dantas',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
