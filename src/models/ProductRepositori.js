class ProductRepository {
    
    constructor() {
        if (ProductRepository.instance) {
            return ProductRepository.instance;
        }
        this.products = [];
        ProductRepository.instance = this;
    }

    /**
     * @returns {Product[]}
     */
    getAll() {
        return this.products;
    }

    /**
     * @param {number} id
     */
    getById(id) {
        return this.products.find(p => p.id === id);
    }

}

// Exportamos una única instancia
const productRepository = new ProductRepository();
export default productRepository;



