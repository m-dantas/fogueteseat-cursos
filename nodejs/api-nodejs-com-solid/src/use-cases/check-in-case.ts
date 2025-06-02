import { CheckIn } from 'generated/prisma'
// import { ResourceNotExistsError } from './errors/resource-not-found-error'
import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotExistsError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coodinates'

interface ICheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLogintude: number
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private gymsRepository: IGymsRepository,
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLogintude,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotExistsError()
    }
    console.log(userLatitude, userLogintude)
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLogintude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
