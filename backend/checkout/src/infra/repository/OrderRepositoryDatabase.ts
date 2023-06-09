import Order from "../../domain/entity/Order";
import OrderRepository from "../../application/repository/OrderRepository";
import Item from "../../domain/entity/Item";
import { PrismaClient } from "@prisma/client";

// Repository sempre retorna Aggregates os informações associadas ao Aggregate
export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly prisma: PrismaClient) {
	}

	async list(): Promise<Order[]> {
		const orders: Order[] = [];
		const ordersData = await this.prisma.$queryRaw`select * from "Order"` as any
		for (const orderData of ordersData) {
			const order = new Order(orderData.id_order, orderData.cpf, orderData.date, orderData.sequence);
			const itemsData = await this.prisma.$queryRaw`select * from "Order" where id_order = ${order.idOrder}` as any
			for (const itemData of itemsData) {
				const item = new Item(itemData.id_product, parseFloat(itemData.price), itemData.quantity);
				order.items.push(item);
			}
			orders.push(order);
		}
		return orders;
	}

	async get(idOrder: string): Promise<Order> {
		const [orderData] = await this.prisma.$queryRaw`select * from "Order" where id_order = ${idOrder}` as any
		const order = new Order(orderData.id_order, orderData.cpf, orderData.date, orderData.sequence);
		const itemsData = await this.prisma.$queryRaw`select * from "Item" where id_order = ${idOrder}` as any
		for (const itemData of itemsData) {
			const item = new Item(itemData.id_product, parseFloat(itemData.price), itemData.quantity);
			order.items.push(item);
		}
		return order;
	}

	async save(order: Order): Promise<void> {
		await this.prisma.$queryRaw`insert into "Order" (id_order, code, cpf, total, freight, date, sequence) values (${order.idOrder}, ${order.code}, ${order.cpf.value}, ${order.getTotal()}, ${order.freight}, ${order.date}, ${order.sequence})`
		for (const item of order.items) {
			await this.prisma.$queryRaw`insert into "Item" (id_order, id_product, price, quantity) values (${order.idOrder}, ${item.idProduct}, ${item.price}, ${item.quantity})`
		}
	}

	async clear(): Promise<void> {
		await this.prisma.$queryRaw`delete from "Order"`
	}

	async count(): Promise<number> {
		const [data] = await this.prisma.$queryRaw`select count(*)::integer from "Order"` as any
		return data.count;
	}

}
