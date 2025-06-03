import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbuGymsUseCase } from './fetch-nearby-gyms-case'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbuGymsUseCase

//-22.8854573,-46.1109017 mais de 10km

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbuGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      latitude: -22.8854573,
      longitude: -46.1109017,
      phone: null,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      latitude: -23.5388581,
      longitude: -46.3999689,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5388581,
      userLongitude: -46.3999689,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'TypeScript Gym' })])
  })
})
