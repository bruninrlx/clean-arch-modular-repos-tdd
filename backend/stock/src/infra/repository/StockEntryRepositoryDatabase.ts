import { PrismaClient } from "@prisma/client";
import StockEntryRepository from "../../application/repository/StockEntryRepository";
import ZipcodeRepository from "../../application/repository/StockEntryRepository";
import StockEntry from "../../domain/entity/StockEntry";
import DatabaseConnection from "../database/DatabaseConnection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly prisma: PrismaClient) {
	}
	
	async getStockEntries(idProduct: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.prisma.$queryRaw`select * from "StockEntry" where id_product = ${idProduct}` as any
		const stockEntries = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.id_product, stockEntryData.operation, stockEntryData.quantity));
		}
		return stockEntries;
	}
	
	async saveStockEntry(stockEntry: StockEntry): Promise<void> {
		await this.prisma.$queryRaw`insert into "StockEntry" (id_product, operation, quantity) values (${stockEntry.idProduct}, ${stockEntry.operation}, ${stockEntry.quantity})`
	}

	async clean(idProduct: number): Promise<void> {
		await this.prisma.$queryRaw`delete from "StockEntry"`
	}

}
