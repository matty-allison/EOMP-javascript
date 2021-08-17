const theForm = [
  {
    formImg: "yoco.png",
    heading: "Yoco point of sale!",
    subHead: "Welcome, Please register.",
    action: "index2.html",
    click: "Click me!",
    logIn: "Already signed up?",
  },
];

function createForm(oneForm) {
  let createForm = `<img src="${oneForm.formImg}" alt="Yoco Logo" class="yocologo">
    <h1 style="text-transform: uppercase">${oneForm.heading}</h1>
    <h3 class="heading">${oneForm.subHead}</h3>
    <form
      class="form-container"
      action="${oneForm.action}"
    >
      <input type="text" name="name" id="name" placeholder="Name" required />
      <input
        type="text"
        name="surname"
        id="surname"
        placeholder="Surname"
        required
      />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        required
      />
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <button onclick="register()" class="send" type="submit">${oneForm.click}</button>
    </form>
    <a href="index2.html" class="login-btn">${oneForm.logIn}</a>`;
  return createForm;
}

function displayForm() {
  let formContainer = document.querySelector(".spikes");
  for (form of theForm) {
    let see = createForm(form);
    formContainer.innerHTML += see;
  }
}

displayForm();

function register() {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  fetch("https://point-of-sale-flask-app2.herokuapp.com/register/", {
    method: "post",
    body: JSON.stringify({
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      let myStorage = window.localStorage;
      myStorage.setItem(
        "name",
        name,
        "surname",
        surname,
        "username",
        username,
        "email",
        email,
        "password",
        password
      );
    });
}
