import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

// Framework and Driver
// Adapter
export default class PgPromiseAdapter implements DatabaseConnection {
	connection: any;

	async connect(): Promise<void> {
		this.connection = pgp()("postgresql://bubu:company@localhost:4510/ecommerce");
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}
