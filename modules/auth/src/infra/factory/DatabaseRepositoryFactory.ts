import DatabaseConnection from "../database/DatabaseConnection";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import { PrismaClient } from "@prisma/client";
import UserRepository from "@/application/repository/UserRepository";
import UserRepositoryDatabase from "../repository/UserRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly prisma: PrismaClient) {
	}

	createUserRepository(): UserRepository {
		return new UserRepositoryDatabase(this.prisma)
	}
}