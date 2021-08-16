const form = [
  {
    formImg: "yoco.png",
    heading: "Yoco point of sale!",
    subHeading: "Welcome back, Please log in.",
    url: "index3.html",
    btn: "Click me!",
    backRegister: "Don't have an account?",
    backUrl: "index.html",
  },
];

function createForm(oneForm) {
  let createForm = `<img class="login-img" src="${oneForm.formImg}" alt="Yoco logo" />
    <h1 style="text-transform: uppercase;">${oneForm.heading}</h1>
    <h3>${oneForm.subHeading}</h3>
    <form action="${oneForm.url}" class="login-form">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <button onclick="logInUser()" class="login-btn" type="submit">${oneForm.btn}</button>
    </form>
    <a class="register-btn" href="${oneForm.backUrl}">${oneForm.backRegister}</a>`;
  return createForm;
}

function displayForm() {
  let formContainer = document.querySelector(".spikes");
  for (f of form) {
    let see = createForm(f);
    formContainer.innerHTML += see;
  }
}

displayForm();

try {
  function logInUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch("https://point-of-sale-flask-app2.herokuapp.com/auth/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
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
    // console.log(username, password);
  }
} catch (err) {
  alert("Invalid, Please enter the valid info or create an");
}
