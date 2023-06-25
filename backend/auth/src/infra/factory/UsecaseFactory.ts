import Signup from "../../application/usecase/Signup";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import Verify from "../../application/usecase/Verify";
import Login from "../../application/usecase/Login";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createVerify () {
		return new Verify();
	}

	createSignup () {
		return new Signup(this.repositoryFactory.createUserRepository());
	}

	createLogin() {
		return new Login(this.repositoryFactory.createUserRepository())
	}
}
