import CouponRepository from "../../application/repository/CouponRepository";
import CouponRepositoryDatabase from "../repository/CouponRepositoryDatabase";
import DatabaseConnection from "../database/DatabaseConnection";
import OrderRepository from "../../application/repository/OrderRepository";
import OrderRepositoryDatabase from "../repository/OrderRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import { PrismaClient } from "@prisma/client";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly prisma: PrismaClient) {
	}

	createOrderRepository(): OrderRepository {
		return new OrderRepositoryDatabase(this.prisma);
	}

	createCouponRepository(): CouponRepository {
		return new CouponRepositoryDatabase(this.prisma);
	}

}