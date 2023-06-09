import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.createMany({
    data: [
      { id_product: 1, description: 'A', price: 1000, width: 100, height: 30, length: 10, weight: 3 },
      { id_product: 2, description: 'B', price: 5000, width: 50, height: 50, length: 50, weight: 22 },
      { id_product: 3, description: 'C', price: 30, width: 10, height: 10, length: 10, weight: 0.9 },
    ],
  });

  await prisma.coupon.createMany({
    data: [
      { code: 'VALE20', percentage: 20, expire_date: new Date('2023-10-01T10:00:00Z') },
      { code: 'VALE10', percentage: 10, expire_date: new Date('2022-10-01T10:00:00Z') },
    ],
  });

  await prisma.zipcode.createMany({
    data: [
      { code: '22060030', lat: -27.5945, long: -48.5477 },
      { code: '88015600', lat: -22.9129, long: -43.2003 },
    ],
  });
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
