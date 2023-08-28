import GetOrders from "../../src/application/usecase/GetOrders";
import GetOrdersQuery from "../../src/application/query/GetOrders";
import OrderDAODatabase from "../../src/infra/dao/OrderDAODatabase";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import GatewayHttpFactory from "../../src/infra/factory/GatewayHttpFactory";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import { PrismaClient } from "@prisma/client";

test("Deve retornar os pedidos Command Model", async function () {
	const prisma = new PrismaClient();
	const repositoryFactory = new DatabaseRepositoryFactory(prisma);
	const httpClient = new AxiosAdapter();
	const gatewayFactory = new GatewayHttpFactory(httpClient);
	const getOrders = new GetOrders(repositoryFactory, gatewayFactory);
	const output = await getOrders.execute();
	for (const orderOutput of output) {
		console.log(orderOutput.items);
	}
});

test.only("Deve retornar os pedidos Query Model", async function () {
	const prisma = new PrismaClient();
	const orderDAO = new OrderDAODatabase(prisma);
	const getOrders = new GetOrdersQuery(orderDAO);
	const output = await getOrders.execute();
	console.log(output);
});
