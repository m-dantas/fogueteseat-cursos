import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.body)

  const searchGymUseCase = makeSearchGymUseCase()
  const { gyms } = await searchGymUseCase.execute({ page, query })

  return reply.status(200).send({
    gyms,
  })
}
