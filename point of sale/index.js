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
        container.innerHTML += `<div id="productcard"><p class="productid">${p[1]}</p><img class="productimg" src="./playstation5.jpg" alt="Imgae of the product"><h2 class="productname">${p[2]}</h2><p class="productdes">${p[3]}</p><h4 class="productprice">${p[4]}</h4><div class="editing-btns"><button class="edit"><i class="fas fa-pen"></i></button><button class="delete"><i class="fas fa-trash"></i></button><button class="select"><i class="fas fa-check"></i></button></div></div>`;
      });
    });
}

showProducts(getProductsUrl);

fetch("https://point-of-sale3.herokuapp.com/auth", {
  method: "POST",
  body: JSON.stringify({
    username: "test1",
    password: "test1",
  }),
  headers: {
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    myStorage = window.localStorage;
    console.log(json["access_token"]);
    myStorage.setItem("jwt_token", json["access_token"]);
  });

// document.addEventListener("displayTheImage", () => {
//   const imageUrl = localStorage.getItem("product-image");

//   if (imageUrl) {
//     document.querySelector(".productimg").setAttribute("src", imageUrl);
//   }
// });

function addProduct() {
  // let image = document
  //   .querySelector("#image")
  //   .addEventListener("change", function () {
  //     const convert = new FileReader();

  //     convert.addEventListener("load", () => {
  //       localStorage.setItem("product-image", convert.result);
  //     });

  //     convert.readAsDataURL(this.files[0]);
  //   });
  let productName = document.getElementById("product-name").value;
  let productDecription = document.getElementById("product-description").value;
  let productPrice = document.getElementById("product-price").value;
  fetch("https://point-of-sale3.herokuapp.com/add-product/", {
    method: "POST",
    body: JSON.stringify({
      product_name: productName,
      product_description: productDecription,
      product_price: productPrice,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `jwt ${myStorage.getItem("jwt_token")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(productName, productDecription, productPrice);
    });
}

let oneProduct = [];
fetch("https://point-of-sale3.herokuapp.com/show-products/")
  .then((response) => response.json())
  .then((data) => {
    let oneProduct = data.data;
    const search = document.getElementById("search");

    console.log(search);
    search.addEventListener("keyup", (a) => {
      const searchText = a.target.value.toLowerCase();
      const filteredProducts = oneProduct.filter((aProduct) => {
        return (
          aProduct[2].toLowerCase().includes(searchText) || aProduct[4].includes(searchText)
        );
      });
      let container = document.querySelector(".product-container");
      container.innerHTML = "";
      filteredProducts.forEach((p) => {
        container.innerHTML += `<div id="productcard"><p class="productid">${p[1]}</p><img class="productimg" src="./playstation5.jpg" alt="Imgae of the product"><h2 class="productname">${p[2]}</h2><p class="productdes">${p[3]}</p><h4 class="productprice">${p[4]}</h4><div class="editing-btns"><button class="edit"><i class="fas fa-pen"></i></button><button class="delete"><i class="fas fa-trash"></i></button><button class="select"><i class="fas fa-check"></i></button></div></div>`;
      });
    });
  });
