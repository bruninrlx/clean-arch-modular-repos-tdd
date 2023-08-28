import StockGateway, { Input } from "../../application/gateway/StockGateway";
import HttpClient from "../http/HttpClient";

export default class StockHttpGateway implements StockGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async decreaseStock(input: Input): Promise<void> {
		await this.httpClient.post(`${process.env.STOCK}/decreaseStock`, input);
	}

}
