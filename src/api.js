export const getItems = async (url) => {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getItem = async (url, callback) => {
  try {
    const resp = await fetch(url);
    return await callback(resp);
  } catch (error) {
    return error.message;
  }
};

export const addItem = async (url, item) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!resp.ok) {
      throw new Error("Ошибка добавления");
    }

    return await resp.json();
  } catch (error) {
    return error.message;
  }
};

export const removeItem = async (url) => {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
    });
    if (!resp.ok) {
      throw new Error("Ошибка удаления");
    }
  } catch (error) {
    return error.message;
  }
};

export const updateItem = async (url, patch) => {
  try {
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patch),
    });

    if (!resp.ok) {
      throw new Error("Ошибка обновления");
    }

    return await resp.json();
  } catch (error) {
    return error.message;
  }
};

// getItems("/api/products");
// getItems("/api/cart");
// removeItem("/api/1");

const printItem = (item, parent, position) => {
  document.querySelector(parent).insertAdjacentHTML(position, item);
};

const productsHandler = (products) => {
  console.log(products);
  if (products.length > 0) {
    products.forEach((product) => {
      const productMockup = `<div class="product">
              <!--<img src="${product.image.desktop}" alt="${product.name}">-->
              <picture>
                <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
                <source srcset="${product.image.tablet}" media="(min-width: 768px)">
                <source srcset="${product.image.mobile}" media="(min-width: 320px)">
                <source srcset="${product.image.thumbnail}" media="(min-width: 0px)">
              </picture>
              <h2>${product.name}</h2>
              <p>$${product.price}</p>
              <button data-id="${product.id}">  <img src="./src/assets/icons/icon-add-to-cart.svg" class="add-to-cart"> <span>Add to Cart</span></button>
          </div>`;
      printItem(productMockup, ".product-list", "beforeend");
    });
  } else {
    alert("Ошибка получения товаров");
  }
};

const asyncWrapper = async () => {
  // const products = await getItems("/products");
  // productsHandler(products);
};
asyncWrapper();
