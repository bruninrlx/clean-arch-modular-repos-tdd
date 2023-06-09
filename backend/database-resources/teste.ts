import { PrismaClient } from "@prisma/client";

const teste = await new PrismaClient().product.findMany()
console.log(teste)
