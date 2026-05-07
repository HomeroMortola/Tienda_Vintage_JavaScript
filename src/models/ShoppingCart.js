export class ShoppingCart {
    /**
     * @param {number[]} products_id 
     * @param {Product[]} products 
     * @param {number} total_price 
     * @param {number} created_date 
     */
    constructor(products_id = [], products = [], total_price = 0.0, created_date = Date.now()) {
        this.products_id = products_id;
        this.products = products;
        this.total_price = total_price;
        this.created_date = created_date;
    }

    /**
     * @param {Product} product 
     * @param {number} id 
     */
    addProduct(product) { //Con la firma nueva  el ID siempre viene del propio producto
    this.products.push(product);
    this.products_id.push(product.id);
    this.calculate_final_price(this.products);
}

    /**
     * @param {number} id 
     */
    /*removeProduct(id) {
        const index = this.products_id.indexOf(id);
        if (index > -1) {
            this.products.splice(index, 1);
            this.products_id.splice(index, 1);
        }
        this.calculate_final_price(this.products);
    }*/

    removeProduct(id) {
    const index = this.products_id.indexOf(id);
    if (index === -1) {
        throw new Error("el producto no existe en el carrito");
    }
    this.products.splice(index, 1);
    this.products_id.splice(index, 1);
    this.calculate_final_price(this.products);
    }

    
    makePurchase() {
       
        
        
    }

    /**
     * @param {Product[]} products - Lista de productos para calcular
     */
    calculate_final_price(products) {
        this.total_price = products.reduce((sum, product) => sum + (product.price || 0), 0);
    }
}
