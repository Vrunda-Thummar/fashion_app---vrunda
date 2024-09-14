const Order = require('../model/order.model');
const Cart = require('../model/cart.model');

module.exports = class orderServices {
    async addToOrder(body) {
        try {
            return await Order.create(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    };

    async getAllorder(query) {
        try {
            //  Pagination
            let pageNo = Number(query.pageNo) || 1;
            let perPage = Number(query.perPage) || 20;
            let skip = (pageNo - 1) * perPage;

            // sorting
            let sortCondition = {
                createdAt: -1
            }
            if (query.sortBy) {
                sortCondition = {}
                sortCondition[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
            }

            // // Searching
            // let order = query.orderId ? [
            //     {
            //         $match: { orderId: mongoose.Types.ObjectId(query.orderId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },

            ]
            let count = await Order.aggregate(find);
            let result = await Order.aggregate([...find,
            {
                $skip: skip,
            },
            {
                $limit: perPage,
            },]
            );
            let totalPage = Math.ceil(count.length / perPage);
            return {
                totalCount: count.length,
                totalPage,
                currentPage: pageNo,
                result
            }
        }
        catch (err) {
            console.log(err);
            return err;
        }
    };

    async getOrder(body) {
        try {
            return await Order.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    };

    async getOrderById(id) {
        try {
            let results = await Order.findById(id);
            console.log(results);
            return results
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    };


    async findAllOrder(query) {
        try {
            //  Pagination
            let pageNo = Number(query.pageNo) || 1;
            let perPage = Number(query.perPage) || 20;
            let skip = (pageNo - 1) * perPage;

            // sorting
            let sortCondition = {
                createdAt: -1
            }
            if (query.sortBy) {
                sortCondition = {}
                sortCondition[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
            }

            // // Searching
            // let order = query.orderId ? [
            //     {
            //         $match: { orderId: mongoose.Types.ObjectId(query.orderId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
            ]
            let count = await Order.aggregate(find);
            let result = await Order.aggregate([...find,
            {
                $skip: skip,
            },
            {
                $limit: perPage,
            },]
            );
            let totalPage = Math.ceil(count.length / perPage);
            return {
                totalCount: count.length,
                totalPage,
                currentPage: pageNo,
                result
            }
        }
        catch (err) {
            console.log(err);
            return err;
        }
    };

    async createOrder(body) {
        try {
            return await Order.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async getAllOrder(body) {
        try {
            return await Order.find(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    };

    async updateOrder(id, body) {
        try {
            let results = await Order.findByIdAndUpdate(id, { $set: body }, { new: true });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from order services" });
        }
    };
};