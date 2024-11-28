const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    const { user_id, order_status, order_items } = req.body;

    try {
        const order = await prisma.orders.create({
            data: {
                user_id,
                order_status,
                orderItems: {
                    create: order_items
                }
            }
        });
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await prisma.orders.findMany({
            where: {
                user_id: Number(userId),
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                        size: true,
                    },
                },
            },
        });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ message: 'Error retrieving orders.' });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                user:true,
                orderItems: {
                    include: {
                        product: true,
                        size: true,
                    }
                },
            },
        });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders for admin:', error);
        return res.status(500).json({ message: 'Error retrieving orders.' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                order_status:status
            },
        });

        return res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status", error);
        return res.status(500).json({ error: "An error occurred while updating order status" });
    }
};


module.exports = {
    createOrder,
    getOrdersByUserId,
    getAllOrders,
    updateOrderStatus,
};
