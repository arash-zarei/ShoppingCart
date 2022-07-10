import ViewProduct from "./viewProduct.js";
import ViewLove from "./viewLove.js";
import ViewCart from "./viewCart.js";
import Storage from "./Storage.js";


const heart = document.querySelector(".heart");
let loveList = [];
let cartList = [];

class Product {
  async getProducts() {
    try {
      const result = await fetch("../../api/ProductsAPI.json");
      const data = await result.json();
      let product = data.ProductList;

      product = product.map((item) => {
        const url = item.Image;
        const productName = item.ProductName;
        const price = item.Price;
        const company = item.Company;
        const color = item.Color;
        const id = item.Id;
        const category = item.Category;
        return { url, productName, price, company, color, id, category };
      });

      return product;
    } catch (err) {
      console.log(err);
    }
  }
}

class View {
  constructor() {
    heart.addEventListener("click", ViewLove.showLove);
  }

  getLoveButtons() {
    const loveBtns = [...document.querySelectorAll(".love_icon")];
    loveBtns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        const loveItem = { ...Storage.getProduct(id), amount: 1 };

        let isInLove = loveList.filter(item => item.id === loveItem.id).length > 0
        if (!isInLove) {
            siiimpleToast.success('Added To Favorites');
            loveList = [...loveList, loveItem];
            Storage.saveLoveItems(loveList);
            ViewLove.setLoveValue(loveList);
            ViewLove.addLoveItem(loveItem);

        }else{
            siiimpleToast.alert('It Is In Favorites');
        }
      });
    });
  }

  getCartButtons() {
    const cartBtns = [...document.querySelectorAll(".cart_icon")];
    cartBtns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        const cartItem = { ...Storage.getProduct(id), amount: 1 };
        let isInCart = cartList.filter(item => item.id === cartItem.id).length > 0
        if (!isInCart) {
            siiimpleToast.success('Added To Cart');
            cartList = [...cartList, cartItem];
            Storage.saveCartItems(cartList);
            ViewCart.setCartValue(cartList);
            ViewCart.addCartItem(cartItem);
        }else{
            siiimpleToast.alert('It Is In Cart');
        }
      });
    });
  }

  initApp() {
    loveList = Storage.getLoveItems();
    cartList = Storage.getCartItems();
    ViewLove.setLoveValue(loveList);
    ViewCart.setCartValue(cartList);
  }

  populateLove(loveList) {
    loveList.forEach((item) => {
      return ViewLove.addLoveItem(item);
    });
  }
  populateCart(cartList) {
    cartList.forEach((item) => {
      return ViewCart.addCartItem(item);
    });
  }

  removeLoveItem(id) {
    loveList = loveList.filter((item) => {
      return item.id !== id;
    });

    ViewLove.setLoveValue(loveList);
    Storage.saveLoveItems(loveList);
  }

  deleteCartItem(id) {
    cartList = cartList.filter((item) => {
      return item.id !== id;
    });

    ViewCart.setCartValue(cartList);
    Storage.saveCartItems(cartList);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const view = new View();
  const product = new Product();

  view.initApp();
  view.populateLove(loveList);
  view.populateCart(cartList);
  ViewLove.removeLove();
  ViewCart.removeCartItem(cartList);

  product
    .getProducts()
    .then((data) => {
      ViewProduct.displayProducts(data);
      ViewProduct.sortProducts(data);
      Storage.saveProducts(data);
    })
    .then(() => {
      view.getLoveButtons();
      view.getCartButtons();
    });
});

export default new View();