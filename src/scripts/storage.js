class Storage {
    static saveProducts(products){
        localStorage.setItem('products' , JSON.stringify(products))
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
       return products.find(item => item.id === id)
    }

    static saveLoveItems(loveItem){
        localStorage.setItem('loveCart' , JSON.stringify(loveItem))
    }

    static getLoveItems(){
        return localStorage.getItem('loveCart') ? JSON.parse(localStorage.getItem('loveCart')) : []
    }

    static saveCartItems(cartList){
        localStorage.setItem('CartItem' , JSON.stringify(cartList))
    }

    static getCartItems(){
        return localStorage.getItem('CartItem') ? JSON.parse(localStorage.getItem('CartItem')) : []
    }
}

export default Storage