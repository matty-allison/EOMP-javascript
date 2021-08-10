let getProductsUrl = "https://point-of-sale3.herokuapp.com/show-products/";

function showProducts(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let product = data.data;
      let container = document.querySelector(".product-container");
      product.forEach((p) => {
        console.log(p);
        container.innerHTML += `<h3>${p[2]}</h3><p>${p[3]}</p><h4>${p[4]}</h4>`;
      });
    });
}

showProducts(getProductsUrl);
