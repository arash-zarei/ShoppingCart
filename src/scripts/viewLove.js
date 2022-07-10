import View from "./app.js"

const quantityLove = document.querySelector('.quantity_lovr');
const loevItemsDOM = document.querySelector('.loev_items');
const heart = document.querySelector('.heart');


class ViewLove {
    constructor(){
        heart.addEventListener('click' , this.showLove)
    }
    addLoveItem(item){
        loevItemsDOM.innerHTML += 
        `
        <div class="love_item">
        <div class="image"><img src="${item.url}"
                alt=""></div>
        <div class="product_name">
            <div class="head">
                <h3 class="name">${item.productName}</h3>
                <p class="property">Lightweight ,
                    Waterproof
                    , flexible And...</p>
                    <p class="price"><span class="price">${item.price}</span>$</p>
            </div>
        </div>

        <div class="delete"><i data-id="${item.id}" class="uil
                uil-trash-alt  remove_Love"></i></div>
    </div>
        `
    }

    showLove(){
        if(loevItemsDOM.style.display == 'flex'){
            loevItemsDOM.style.display = 'none'
        }else{
            loevItemsDOM.style.display = 'flex'
        }
    }


    removeLove(){

        loevItemsDOM.addEventListener('click' , (event)=>{
            if(event.target.classList.contains('remove_Love')){
                const removeItem = event.target
                const id = removeItem.dataset.id
                loevItemsDOM.removeChild(removeItem.parentElement.parentElement)

                View.removeLoveItem(id)
            }
        })
 
    }

    setLoveValue(loveList){
        let loveTotal = 0;

        loveList.map(item =>{
            loveTotal = loveTotal + item.amount
        })

        quantityLove.innerText = loveTotal
    }


}

export default new ViewLove()