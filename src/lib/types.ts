import { ApplicationResearchField } from '@prisma/client'

export type ApplicationResearchFieldWithName = ApplicationResearchField & {
  researchField: { name: string }
}
