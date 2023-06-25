import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import GatewayHttpFactory from "./infra/factory/GatewayHttpFactory";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import { PrismaClient } from "@prisma/client";
import QueueController from "./infra/queue/QueueController";
import SqsAdapter from "./infra/queue/SQSAdapter";

// main
	const prisma = new PrismaClient();
	const repositoryFactory = new DatabaseRepositoryFactory(prisma);
	const httpClient = new AxiosAdapter();
	const gatewayFactory = new GatewayHttpFactory(httpClient);
	const queue = new SqsAdapter({
	  'checkout': process.env.CHECKOUT_QUEUE??"",
	  'orderPlaced': process.env.ORDER_PLACED_QUEUE??"",
	});
	const usecaseFactory = new UsecaseFactory(repositoryFactory, gatewayFactory, queue);
	const httpServer = new ExpressAdapter();
	new HttpController(httpServer, usecaseFactory, queue);
	new QueueController(queue, usecaseFactory);
	httpServer.listen(process.env.PORT);

