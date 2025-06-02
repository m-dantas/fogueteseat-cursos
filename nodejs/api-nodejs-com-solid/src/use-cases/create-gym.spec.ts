import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym-case'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository) // System Under Test
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      latitude: -23.5388581,
      longitude: -46.3999689,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
