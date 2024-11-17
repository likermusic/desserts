import { getItems } from "./api";

const productList = document.querySelector(".product-list");
// eslint-disable-next-line no-unused-vars
const renderProducts = (async () => {
  const resp = await getItems("/api/products");
  if (Array.isArray(resp)) {
    const productsMarkup = resp.map(
      (product) => `
      <div class="product">
              <img src="${product.image.mobile}" alt="${product.name}">
              <!--<picture>
                <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
                <source srcset="${product.image.tablet}" media="(min-width: 768px)">
                <source srcset="${product.image.mobile}" media="(min-width: 320px)">
                <source srcset="${product.image.thumbnail}" media="(min-width: 0px)">
              </picture>-->
              <h2>${product.name}</h2>
              <span><i>Category: </i>${product.category}</span>
              <p>$${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}">  <img src="./src/assets/icons/icon-add-to-cart.svg"> <span>Add to Cart</span></button>
          </div>
    `,
    );

    productList.insertAdjacentHTML("beforeend", productsMarkup.join(""));
  } else {
    alert(resp);
  }
})();

const createCartProduct = (e) => {
  if (e.target.matches(".add-to-cart, .add-to-cart *")) {
    {
      console.log(id);
      const name = e.target.closest(".product").querySelector("h2").textContent;
      const category = "dfdf";
      return {
        name: name,
        category: category,
      };
    }
  }
};

productList.addEventListener("click", addProduct);
