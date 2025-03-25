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
  const getCartItems = JSON.parse(localStorage.getItem("cartItems"));
  let cartIds = [];
  if(getCartItems) cartIds = getCartItems.map((item) => item.id);

  const container = document.getElementById("item-container");
  const showFrom = (pageNo -1) * ITEM_NUMBER_PER_PAGE;
  const showTil = pageNo * ITEM_NUMBER_PER_PAGE;
  const itemsShowing = items.slice(showFrom, showTil);

  itemsShowing.forEach((item) => {
    const itemElement = document.createElement("li");
    itemElement.classList.add("show", "hidden");
    itemElement.innerHTML = ` <img src="../imgs/${item.productImgFileName}" />
      <div>
        <h2>${item.productName}</h2>
        <p>${item.productPrice}</p>
        <button id="cart-${item.id}" class="cartAddBtn"
          ${cartIds.includes(item.id) ? "disabled": ""}>Cart</button>
        <button id="order-${item.id}" class="orderBtn">Order</button>
      </div>`;
    container.appendChild(itemElement);

    setTimeout(() => {
      itemElement.classList.remove("hidden");
    }, 100);
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

  const lastItem = document.querySelector('.show:last-child');
  if(lastItem){
    observer.observe(lastItem);
  }
}

fetchItems();


ul.addEventListener("click", (event) => {
  const itemId = event.target.id.split("-").pop();
  if(event.target.className === "cartAddBtn"){
    const getCartItems = JSON.parse(localStorage.getItem("cartItems"));
    let newCart = [];
    if(getCartItems){
      newCart = [...getCartItems, items[itemId]];
      alert(`${items[itemId].productName}가 장바구니에 추가됐습니다.`);
    }
    else{
      newCart.push(items[itemId]);
    }

    localStorage.setItem("cartItems", JSON.stringify(newCart));
    event.target.disabled = true;
    return;
  }

  if(event.target.className === "orderBtn"){
    sessionStorage.setItem("orderItem", JSON.stringify(items[itemId]));
    const isConfirmed = confirm(
      `${items[itemId].productName} 을 주문하시겠습니까?`
    );
    if(isConfirmed)
      location.href = "../order/index.html";
      return;
  }
});






