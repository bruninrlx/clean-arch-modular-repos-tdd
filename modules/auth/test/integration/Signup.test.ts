import { PrismaClient } from "@prisma/client";
import Login from "../../src/application/usecase/Login";
import Signup from "../../src/application/usecase/Signup";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";

test("Deve fazer um signup", async function () {
	const prisma = new PrismaClient();
	const userRepository = new UserRepositoryDatabase(prisma);
	await userRepository.delete("joao@gmail.com");
	const signup = new Signup(userRepository);
	const input = {
		email: "joao@gmail.com",
		password: "abc123"
	};
	await signup.execute(input);
	const login = new Login(userRepository);
	const output = await login.execute({
		email: "joao@gmail.com",
		password: "abc123",
		date: new Date("2022-03-01T10:00:00")
	});
	expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4");
});
