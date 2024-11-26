import { ApplicationRow } from '@/components/table/ApplicationTable'
import {
  $Enums,
  ApplicationResearchField,
  Comment,
  CommentType,
  ResearchField
} from '@prisma/client'

import prisma from '../../db'

import Rating = $Enums.Rating

export async function getAllApplicationRounds(): Promise<string[]> {
  return prisma.application
    .findMany({
      select: {
        round: true
      },
      distinct: ['round'],
      orderBy: {
        round: 'asc'
      }
    })
    .then((applications) => applications.map((application) => application.round))
}

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

export async function createComment(
  applicationId: number,
  text: string,
  rating: Rating,
  commentType: CommentType
): Promise<Comment> {
  return prisma.comment.create({
    data: {
      applicationId,
      text,
      rating,
      commentType
    }
  })
}
