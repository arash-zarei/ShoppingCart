import View from "./app.js";

const productsDOM = document.querySelector(".items");
const sort = document.querySelector(".sort");
const sortDown = document.querySelector(".sort_down");
const checkBoxs = document.querySelectorAll('.chckbox');

class ViewProducts {
  constructor() {
    sortDown.addEventListener("click", this.showSort);
    for (let a = 0; a < checkBoxs.length; a++) {
        checkBoxs[a].addEventListener('click' , ()=>{
            for (let b = 0; b < checkBoxs.length; b++) {
                checkBoxs[b].classList.remove('active_category')   
            }
            checkBoxs[a].classList.add('active_category')
        })
    }
}

displayProducts(products) {
    let result = "";

    products.forEach((ele) => {
      result += `
            <div data-category="${ele.category}" class="product">
            <div class="image"><img src="${ele.url}" alt=""></div>
            <div class="product_name">
                <div class="head">
                    <h3 class="name">${ele.productName}</h3>
                    <p class="property">Lightweight , Waterproof , flexible And...</p>
                </div>
                <div class="available_off">
                    <span data-color="${ele.color}" class="available">${ele.company}</span>
                    <p class="off">25% Off</p>
                </div>
                <div class="price_add_love">
                    <div class="price"><p>${ele.price}$</p></div>
                    <div class="add_cart_love">
                    <button data-id="${ele.id}" class="cart_icon"><i class="uil uil-shopping-cart"></i></button>
                    <button data-id="${ele.id}" class="love_icon"><i class="uil uil-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
            `;
    });

    productsDOM.innerHTML = result;
    const colorItem = document.querySelectorAll(".available");
    colorItem.forEach((item) => {
      item.style.backgroundColor = `${item.getAttribute("data-color")}`;
    });
  }

  showSort() {
    sort.classList.toggle("show");
    sortDown.classList.toggle("rotate");
  }

  sortProducts(products){
    let resultCaregory = ''
    checkBoxs.forEach(check =>{
        check.addEventListener('click' , ()=>{
            products.forEach(item =>{
                if(item.category == check.getAttribute('data-value') || check.getAttribute('data-value') == 'All'){
                    resultCaregory += `
                    <div data-category="${item.category}" class="product">
                    <div class="image"><img src="${item.url}" alt=""></div>
                    <div class="product_name">
                        <div class="head">
                            <h3 class="name">${item.productName}</h3>
                            <p class="property">Lightweight , Waterproof , flexible And...</p>
                        </div>
                        <div class="available_off">
                            <span data-color="${item.color}" class="available">${item.company}</span>
                            <p class="off">25% Off</p>
                        </div>
                        <div class="price_add_love">
                            <div class="price"><p>${item.price}$</p></div>
                            <div class="add_cart_love">
                                <button data-id="${item.id}" class="cart_icon"><i class="uil uil-shopping-cart"></i></button>
                                <button data-id="${item.id}" class="love_icon"><i class="uil uil-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                    `
                }
            })
            productsDOM.innerHTML = resultCaregory;
            View.getCartButtons()
            View.getLoveButtons()
            const colorItem = document.querySelectorAll(".available");
            colorItem.forEach((item) => {
              item.style.backgroundColor = `${item.getAttribute("data-color")}`;
            });
            resultCaregory = '';
        })
    })
  }
}

export default new ViewProducts();
