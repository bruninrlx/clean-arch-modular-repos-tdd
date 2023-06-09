import DatabaseConnection from "../database/DatabaseConnection";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import { PrismaClient } from "@prisma/client";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly prisma: PrismaClient) {
	}

}