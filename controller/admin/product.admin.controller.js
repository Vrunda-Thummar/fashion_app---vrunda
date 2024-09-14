const ProductServices = require('../../services/product.services');
const productService = new ProductServices();

exports.addProduct = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body.productPrice);
        let product = await productService.getProduct({productName: req.body.productName,  isDelete: false });
        
        if (product) {
            return res.json({ message: "Product is already exist.Please try again" });
        };
        if (req.file) {
            req.body.productImage = req.file.path.replace(/\\/g, '/');
        };
        let price = Number(req.body.productPrice)
        let newProduct = await productService.addNewProduct({ ...req.body, productPrice: price });
        return res.json({ newProduct, message: "Product Succesfully Added" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let Product = await productService.getAllProduct({ isDelete: false });
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
    
        return res.json({ Products: Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.getSpeProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        
        if (!Product) {
            return res.json({ message: "Product is not found.. Please try again" });
        };
        return res.json({ Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        if (req.file) {
            
            req.body.productImage = req.file.path.replace('\\', '/');
        };
        Product = await productService.updateProduct(req.body.ProductID, { ...req.body }, { new: true });
        return res.json({ Product, message: "Product was updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        Product = await productService.updateProduct(req.body.ProductID, { isDelete: true }, { new: true });
        return res.json({ message: "Product was deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    };
};