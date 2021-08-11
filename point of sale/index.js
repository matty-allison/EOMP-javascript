let getProductsUrl =
  "https://point-of-sale3.herokuapp.com/show-products/";

function showProducts(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let product = data.data;
      let container = document.querySelector(".product-container");
      product.forEach((p) => {
        console.log(p);
        container.innerHTML += `<div class="productcard"><img class="productimg" src="" alt="Imgae of the product"><h3 class="productname">${p[2]}</h3><p class="productdes">${p[3]}</p><h4 class="productprice">${p[4]}</h4><button class="select"></button></div>`;
      });
    });
}

showProducts(getProductsUrl);

function addProduct() {
  let productName = document.getElementById("product-name").value
  let productDecription = document.getElementById("product-description").value
  let productPrice = document.getElementById("product-price").value
  fetch("https://point-of-sale3.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify({
      product_name: productName,
      product_description: productDecription,
      product_price: productPrice
    }),
    headers: {
      "Content-type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((json) => console.log(json))
}