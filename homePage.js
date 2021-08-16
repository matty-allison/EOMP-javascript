let getProductsUrl =
  "https://point-of-sale-flask-app2.herokuapp.com/show-products/";
function showProducts(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      let product = data.data;
      let container = document.querySelector(".product-container");
      product.forEach((p) => {
        // console.log(p);
        container.innerHTML += `<div id="productcard"><img class="productimg" src="${p[5]}" alt="Imgae of the product"><h2 class="productname">${p[2]}</h2><p class="productdes">${p[3]}</p><h4 class="productprice">${p[4]}</h4><div class="editing-btns"><button onclick="deleteProduct()" class="delete${p[1]}"><i class="fas fa-trash"></i></button><button class="select"><i class="fas fa-check"></i></button></div></div>`;
      });
    });
}

showProducts(getProductsUrl);

// adding

function imageConverter() {
  const image = document.querySelector(".imgholder");
  const file = document.querySelector("#image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addProduct() {
  console.log(document.querySelector(".imgholder").src);
  let productName = document.getElementById("product-name").value;
  let productDecription = document.getElementById("product-description").value;
  let productPrice = document.getElementById("product-price").value;
  let productImage = document.querySelector(".imgholder").src;
  fetch("https://point-of-sale-flask-app2.herokuapp.com/add-product/", {
    method: "post",
    body: JSON.stringify({
      product_name: productName,
      product_description: productDecription,
      product_price: productPrice,
      product_image: productImage,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(productName, productDecription, productPrice);
    });
}

// search function
let oneProduct = [];
fetch("https://point-of-sale-flask-app2.herokuapp.com/show-products/")
  .then((response) => response.json())
  .then((data) => {
    let oneProduct = data.data;
    const search = document.getElementById("search");
    search.addEventListener("keyup", (a) => {
      const searchText = a.target.value.toLowerCase();
      const filteredProducts = oneProduct.filter((aProduct) => {
        return (
          aProduct[2].toLowerCase().includes(searchText) ||
          aProduct[4].includes(searchText)
        );
      });
      let container = document.querySelector(".product-container");
      container.innerHTML = "";
      filteredProducts.forEach((p) => {
        container.innerHTML += `<div id="productcard"><img class="productimg" src="${p[5]}" alt="Imgae of the product"><h2 class="productname">${p[2]}</h2><p class="productdes">${p[3]}</p><h4 class="productprice">${p[4]}</h4><div class="editing-btns"><button onclick="deleteProduct()" class="delete${p[1]}"><i class="fas fa-trash"></i></button><button class="select"><i class="fas fa-check"></i></button></div></div>`;
      });
    });
  });

// delete

function deleteProduct() {
}

// fetch(
//   `https://point-of-sale-flask-app2.herokuapp.com/delete-product/${productId}/`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });

// update
function updateProduct() {
  let productId = document.getElementById("productId").value;
  let productName = document.getElementById("productname").value;
  let productDecription = document.getElementById("productdescription").value;
  let productPrice = document.getElementById("productprice").value;
  let productImage = document.querySelector(".imgholder").src;
  console.log(productId);
  fetch(
    `https://point-of-sale-flask-app2.herokuapp.com/edit-product/${productId}/`,
    {
      method: "PUT",
      body: JSON.stringify({
        product_name: productName,
        product_description: productDecription,
        product_price: productPrice,
        product_image: productImage,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
}
