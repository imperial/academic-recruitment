import { faker } from '@faker-js/faker'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const createStaff = () => {
  return {
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(Object.keys(Role)) as Role
  }
}

async function main() {
  for (let i = 0; i < 3; i++) {
    await prisma.staff.create({ data: createStaff() })
  }
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
