import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import GatewayHttpFactory from "./infra/factory/GatewayHttpFactory";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueControlle from "./infra/queue/QueueController";
import { PrismaClient } from "@prisma/client";

// main

async function main () {
	const prisma = new PrismaClient();
	const repositoryFactory = new DatabaseRepositoryFactory(prisma);
	const httpClient = new AxiosAdapter();
	const gatewayFactory = new GatewayHttpFactory(httpClient);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const usecaseFactory = new UsecaseFactory(repositoryFactory, gatewayFactory, queue);
	const httpServer = new ExpressAdapter();
	new HttpController(httpServer, usecaseFactory, queue);
	new QueueControlle(queue, usecaseFactory);
	httpServer.listen(3000);
}

main();
