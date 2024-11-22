import { ApplicationResearchFieldWithName } from '@/lib/types'
import { Application, ApplicationResearchField, ResearchField } from '@prisma/client'

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

export async function getAllResearchFields(): Promise<ResearchField[]> {
  return prisma.researchField.findMany({ orderBy: { name: 'asc' } })
}

export async function getAllApplicationsWithResearchFields(): Promise<
  ApplicationResearchFieldWithName[]
> {
  return prisma.applicationResearchField.findMany({
    include: {
      researchField: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      applicationId: 'asc'
    }
  })
}

export async function associateApplicationWithField(
  applicationId: number,
  researchFieldId: number
): Promise<ApplicationResearchField> {
  return prisma.applicationResearchField.create({
    data: {
      applicationId,
      researchFieldId
    }
  })
}
