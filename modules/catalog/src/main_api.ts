import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import { PrismaClient } from "@prisma/client";

// main
const connection = new PrismaClient();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(process.env.PORT);
