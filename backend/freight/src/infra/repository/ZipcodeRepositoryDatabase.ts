import { PrismaClient } from "@prisma/client";
import ZipcodeRepository from "../../application/repository/ZipcodeRepository";
import Zipcode from "../../domain/entity/Zipcode";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {

	constructor (readonly prisma: PrismaClient) {
	}

	async get(code: string): Promise<Zipcode | undefined> {
		const [zipcodeData] = await this.prisma.$queryRaw`select * from "Zipcode" where code = ${code}` as any;
		if (!zipcodeData) return;
		return new Zipcode(zipcodeData.code, parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long));
	}

}