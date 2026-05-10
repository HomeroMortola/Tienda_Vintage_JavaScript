export class ShoppingCart {
    /*
    
    constructor(products_id = [], products = [], total_price = 0.0, created_date = Date.now()) {
        this.products_id = products_id;
        this.products = products;
        this.total_price = total_price;
        this.created_date = created_date;
    }
    
    

    addProduct(product) { //Con la firma nueva  el ID siempre viene del propio producto
    this.products.push(product);
    this.products_id.push(product.id);
    this.calculate_final_price(this.products);
    }

    

    removeProduct(id) {
    const index = this.products_id.indexOf(id);
    if (index === -1) {
        throw new Error("el producto no existe en el carrito");
    }
    this.products.splice(index, 1);
    this.products_id.splice(index, 1);
    this.calculate_final_price(this.products);
    }
    */
    
    
    constructor(userId, items = []) {
        this.userId = userId;
        this.items = items; // Array de objetos { producto, cantidad }
    }

    get total() {
        return this.items.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity);
        }, 0);
    }
}


