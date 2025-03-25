const PRODUCT_LENGTH = 10;

const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

if (cart.length === 0) {
  const li = document.createElement("li");
  li.classList.add("empty-cart");
  li.innerHTML = "<span>장바구니에 상품이 없습니다..</span>";
  document.querySelector("ul").appendChild(li);
}

let qty = Array(PRODUCT_LENGTH).fill(0);

cart.forEach((element) => {
  qty[element.id]++;

  if (qty[element.id] === 1) {
    const li = document.createElement("li");
    li.classList.add(`cart-item`);
    // 해당 li 태그가 어떤 상품 id를 가지고 있는지 알기 위해 dataset을 사용
    li.dataset.id = element.id;

    const itemId = `item-${element.id}`;

    li.innerHTML = `
    <input type="checkbox" id="${itemId}" />
    <img src="../imgs/${element.productImgFileName}" alt="${element.productName}" class="cart-img" />
    <label for="${itemId}">${element.productName}</label>
  `;
    document.querySelector("ul").appendChild(li);
  }
});

console.log(qty);

const cartItems = document.querySelectorAll(".cart-item");

cartItems.forEach((item) => {
  const id = item.dataset.id;
  const count = qty[id];

  if (count > 0) {
    const qtySpan = document.createElement("span");
    qtySpan.classList.add("qty-info");
    qtySpan.textContent = `수량: ${count}개`;
    item.appendChild(qtySpan);
  }
});

// 선택 삭제 버튼 이벤트.
document.querySelector(".SDBtn").addEventListener("click", () => {
  const checkedBoxes = document.querySelectorAll(
    ".cart-item input[type='checkbox']:checked"
  );

  checkedBoxes.forEach((checkbox) => {
    const li = checkbox.closest(".cart-item");
    const id = li.dataset.id;

    li.remove();

    const cart = JSON.parse(localStorage.getItem("cartiItems")) || [];
    const newCart = cart.filter((item) => item.id !== Number(id));
    localStorage.setItem("cart", JSON.stringify(newCart));
  });
});
// 전체삭제 버튼 이벤트
document.querySelector(".ADBtn").addEventListener("click", () => {
  localStorage.removeItem("cartItems");

  const ul = document.querySelector(".item-box");
  ul.innerHTML = "";
});
