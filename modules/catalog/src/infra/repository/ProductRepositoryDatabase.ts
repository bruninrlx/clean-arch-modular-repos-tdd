import pgp from "pg-promise";
import ProductRepository from "../../application/repository/ProductRepository";
import Product from "../../domain/entity/Product";
import DatabaseConnection from "../database/DatabaseConnection";
import { PrismaClient } from "@prisma/client";

// interface adapters
export default class ProductRepositoryDatabase implements ProductRepository {

	constructor (readonly prisma: PrismaClient) {
	}

	async list(): Promise<Product[]> {
		const productsData = 
		await this.prisma.$queryRaw`select * from  "Product"` as any
		
		const products: Product[] = [];
		for (const productData of productsData) {
			products.push(new Product(
				productData.id_product, 
				productData.description, 
				parseFloat(productData.price),
				productData.width,
				productData.height,
				productData.length,
				parseFloat(productData.weight))
			);
		}
		return products;
	}

	async get (idProduct: number) {
		const [productData] = 
		await this.prisma.$queryRaw`select * from "Product" where id_product = ${Number(idProduct)}` as any;

		return new Product(
			productData.id_product,
			productData.description,
			parseFloat(productData.price),
		 	productData.width,
		 	productData.height,
		 	productData.length,
			parseFloat(productData.weight)
		);
	}
}
