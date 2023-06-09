import { PrismaClient } from "@prisma/client";
import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/entity/User";

export default class UserRepositoryDatabase implements UserRepository {
	
	constructor (readonly prisma: PrismaClient) {
	}

	async save(user: User): Promise<void> {
		await this.prisma.$queryRaw`insert into "User" (email, password, salt, password_type) values (${user.email.value}, ${user.password.value}, ${user.password.salt}, ${user.passwordType})`
	}

	async update(user: User): Promise<void> {
		await this.prisma.$queryRaw`update "User" set email = ${user.email.value}, password = ${user.password.value}, salt = ${user.password.salt} where email = ${user.email.value}`
	}

	async get(email: string): Promise<User> {
		const [userData] = await this.prisma.$queryRaw`select * from "User" where email = ${email}` as any
		return User.restore(userData.email, userData.password, userData.salt, userData.password_type);
	}

	async delete(email: string): Promise<void> {
		await this.prisma.$queryRaw`delete from "User" where email = ${email}`
	}

}
