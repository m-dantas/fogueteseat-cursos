import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfilesUseCase } from './get-user-profile'
import { ResourceNotExistsError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfilesUseCase

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfilesUseCase(usersRepository) // System Under Test
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Mauricio Dantas',
      email: 'mauricio22@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Mauricio Dantas')
  })

  it('should not be able to get user profile', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExistsError)
  })
})
