import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym-case'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      latitude: -23.5388581,
      longitude: -46.3999689,
      phone: null,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      latitude: -23.5388581,
      longitude: -46.3999689,
      phone: null,
    })

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${index}`,
        description: null,
        latitude: -23.5388581,
        longitude: -46.3999689,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({ query: 'JavaScript', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
