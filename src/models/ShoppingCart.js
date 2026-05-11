export class ShoppingCart {

    
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


