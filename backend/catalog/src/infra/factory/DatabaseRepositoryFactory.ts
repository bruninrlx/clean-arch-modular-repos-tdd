import DatabaseConnection from "../database/DatabaseConnection";
import ProductRepository from "../../application/repository/ProductRepository";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import { PrismaClient } from "@prisma/client";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly prisma: PrismaClient) {
	}

	createProductRepository(): ProductRepository {
		return new ProductRepositoryDatabase(this.prisma);
	}

}