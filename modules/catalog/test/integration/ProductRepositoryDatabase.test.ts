import { PrismaClient } from "@prisma/client";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

test("Deve obter um produto do banco de dados", async function () {
	const prisma = new PrismaClient();
	const productRepository = new ProductRepositoryDatabase(prisma);
	const productData = await productRepository.get(1);
	expect(productData.price).toBe(1000);
});
