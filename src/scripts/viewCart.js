import View from "./app.js"
import Storage from "./Storage.js";

const openMenu = document.querySelector('.open_menu');
const closeMenu = document.querySelector('.close');
const totalItems = document.querySelector('.total_items');
const quantityCart = document.querySelector('.quantity_cart');
const cartItemsDOM = document.querySelector('.cart_items');
const subTotal = document.querySelector('.sub_total_price')
const total = document.querySelector('.price_total')

class ViewCart{
    constructor(){
        openMenu.addEventListener('click' , this.showMenu)
        closeMenu.addEventListener('click' , this.hideMenu)
    }

    addCartItem(item){
        cartItemsDOM.innerHTML += 
        `
        <div class="cart_item">
        <div class="image"><img src="${item.url}" alt=""></div>
       <div class="contorol">
        <div class="name_company">
            <h4>${item.company}</h4>
            <p>${item.productName}</p>
        </div>
        <div class="price"><p>${item.price}$</p></div>
        <div class="quantity">
            <div class="up"><i data-id="${item.id}" class="uil uil-angle-up"></i></div>
            <p class="count_product">${item.amount}</p>
            <div class="down"><i data-id="${item.id}" class="uil uil-angle-down"></i></div>
        </div>
        <div  class="delete"><i data-id="${item.id}" class="uil uil-trash-alt delete"></i></div>
       </div>
    </div>
        `
    }

    removeCartItem(cartList){

        cartItemsDOM.addEventListener('click' , (event)=>{
            if(event.target.classList.contains('delete')){
                const removeItem = event.target
                const id = removeItem.dataset.id
                cartItemsDOM.removeChild(removeItem.parentElement.parentElement.parentElement)
                View.deleteCartItem(id)
            }

            if(event.target.classList.contains('uil-angle-up')){
                const upAmount = event.target
                const id = upAmount.dataset.id
                let product = cartList.find(item =>{
                    return item.id === id
                })
                product.amount = product.amount + 1
                
                Storage.saveCartItems(cartList)
                this.setCartValue(cartList)
                upAmount.parentElement.nextElementSibling.innerHTML = product.amount

            }

            if(event.target.classList.contains('uil-angle-down')){
                const downAmount = event.target
                const id = downAmount.dataset.id
                let product = cartList.find(item =>{
                    return item.id === id
                })
                product.amount = product.amount - 1
                if(product.amount > 0){          
                Storage.saveCartItems(cartList)
                this.setCartValue(cartList)
                downAmount.parentElement.previousElementSibling.innerHTML = product.amount
                }else{
                    cartItemsDOM.removeChild(downAmount.parentElement.parentElement.parentElement.parentElement)
                    View.deleteCartItem(id)
                }


            }
        })
 
    }

    setCartValue(cartList){
        let cartTotal = 0;
        let totalPrice = 0

        cartList.map(item =>{
            totalPrice = totalPrice + item.price * item.amount
            cartTotal = cartTotal + item.amount
        })

        quantityCart.innerHTML = cartTotal
        subTotal.innerHTML = totalPrice
        total.innerHTML = totalPrice
    }

    


    showMenu(){
        totalItems.classList.add('show_menu')
    }
    hideMenu(){
        totalItems.classList.remove('show_menu')
    }
}

export default new ViewCart()