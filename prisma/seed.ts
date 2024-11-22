import { faker } from '@faker-js/faker'
import { Decision, PrismaClient, Role, Stage } from '@prisma/client'

const prisma = new PrismaClient()

function createStaff() {
  return {
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(Object.keys(Role)) as Role
  }
}

function createApplication(round: string) {
  return {
    round: round,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    referenceNumber: faker.string.numeric({ length: 10 }),
    edi: faker.datatype.boolean(),
    stage: faker.helpers.arrayElement(Object.keys(Stage)) as Stage,
    decision: faker.helpers.arrayElement(Object.keys(Decision)) as Decision
  }
}

async function main() {
  for (let i = 0; i < 3; i++) await prisma.staff.create({ data: createStaff() })

  for (let i = 0; i < 10; i++)
    await prisma.application.create({ data: createApplication('Lecturer') })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
