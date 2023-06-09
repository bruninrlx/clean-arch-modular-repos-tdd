import { PrismaClient } from "@prisma/client";
import OrderDAO from "../../application/dao/OrderDAO";

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly prisma: PrismaClient) {
	}

	async list(): Promise<any> {
		return this.prisma.$queryRaw`select * from "Item" join "Product" using (id_product)`
	}

}