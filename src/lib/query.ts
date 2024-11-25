import { ApplicationRow } from '@/components/table/ApplicationTable'
import { ApplicationResearchField, ResearchField } from '@prisma/client'

import prisma from '../../db'

export async function getAllApplicationsWithResearchFields(
  round: string
): Promise<ApplicationRow[]> {
  return prisma.application
    .findMany({
      where: {
        round
      },
      include: {
        researchFields: {
          include: {
            researchField: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })
    .then((applications) =>
      applications.map((application) => ({
        ...application,
        researchFields: application.researchFields.map((rf) => ({
          id: rf.researchField.id,
          name: rf.researchField.name
        }))
      }))
    )
}

export async function getAllResearchFields(): Promise<ResearchField[]> {
  return prisma.researchField.findMany({ orderBy: { name: 'asc' } })
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
