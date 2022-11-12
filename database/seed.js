var { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

console.log("admin user seed running")


const seed = async () => {
  let result = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@admin.com",
      password: "123",
      role: "admin"
    }
  }) 

  return result
}

const result = seed()