import { Application } from '@prisma/client'

import prisma from '../../db'

export async function getAllApplications(round: string): Promise<Application[]> {
  return prisma.application.findMany({
    where: {
      round
    },
    orderBy: {
      lastName: 'asc'
    }
  })
}
