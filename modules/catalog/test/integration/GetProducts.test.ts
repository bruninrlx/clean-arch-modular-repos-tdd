import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GetProducts from "../../src/application/usecase/GetProducts";
import JsonPresenter from "../../src/infra/presenter/JsonPresenter";
import { PrismaClient } from "@prisma/client";

// main
test("Deve listar os produtos", async function () {
	// framework and driver
	const prisma = new PrismaClient();
	// interface adapter
	const repositoryFactory = new DatabaseRepositoryFactory(prisma);
	// use case / application
	const getProducts = new GetProducts(repositoryFactory, new JsonPresenter());
	const output = await getProducts.execute();
	expect(output).toHaveLength(3);
});
