import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface IFetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbuGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsRequest): Promise<IFetchNearbyGymsResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      logintude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
