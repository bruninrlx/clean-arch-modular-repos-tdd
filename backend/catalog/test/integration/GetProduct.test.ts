import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GetProduct from "../../src/application/usecase/GetProduct";
import { PrismaClient } from "@prisma/client";

// main
test("Deve retornar um produto", async function () {
	// framework and driver
	const prisma = new PrismaClient();
	// interface adapter
	const repositoryFactory = new DatabaseRepositoryFactory(prisma);
	// use case / application
	const getProduct = new GetProduct(repositoryFactory);
	const output = await getProduct.execute(1);
	expect(output.idProduct).toBe(1);
	expect(output.description).toBe("A");
	expect(output.price).toBe(1000);
	expect(output.width).toBe(100);
	expect(output.height).toBe(30);
	expect(output.length).toBe(10);
	expect(output.weight).toBe(3);
	expect(output.volume).toBe(0.03);
	expect(output.density).toBe(100);
});
