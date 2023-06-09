import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../application/repository/CouponRepository";
import { PrismaClient } from "@prisma/client";

// Interface Adapter
export default class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly prisma: PrismaClient) {
	}

	async get (code: string) {
		const [couponData] = await this.prisma.$queryRaw`select * from "Coupon" where code = ${code}` as any;
		if (!couponData) return undefined;
		return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
	}
}
