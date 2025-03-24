const ul = document.querySelector("ul");
let items = [];

async function fetchItems(){
  const response = await fetch("../db.json");
  items = await response.json();
  showItems();
}

let pageNo = 1;
const ITEM_NUMBER_PER_PAGE = 5;

function showItems(){
  const container = document.getElementById("item-container");
  const showFrom = (pageNo -1) * ITEM_NUMBER_PER_PAGE;
  const showTil = pageNo * ITEM_NUMBER_PER_PAGE;
  const itemsShowing = items.slice(showFrom, showTil);

  itemsShowing.forEach((item) => {
    const itemElement = document.createElement("li");
    console.log(item);
    itemElement.innerHTML = ` <img src="../imgs/${item.productImgFileName}" />
      <div>
        <h2>${item.productName}</h2>
        <p>${item.productPrice}</p>
        <button id="cart-${item.id}">Cart</button>
        <button id="order-${item.id}">Order</button>
      </div>`;
    container.appendChild(itemElement);
  });
  pageNo++;
  setObserver();
}

function setObserver(){
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        observer.unobserve(entry.target);
        if(pageNo <= Math.ceil(items.length/ITEM_NUMBER_PER_PAGE)){
          showItems();
        }
      }
    });
  }, options);

  const lastItem = document.querySelector('.item:last-child');
  if(lastPost){
    observer.observe(lastPost);
  }
}


fetchItems();






