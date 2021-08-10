const theForm = [
  {
    formImg: "yoco.png",
    heading: "Yoco point of sale",
    subHead: "Welcome, Please register",
    action: "https://point-of-sale3.herokuapp.com/register/",
    method: "post",
    click: "Click me!",
  },
];

function createForm(oneForm) {
  let createForm = `<img src="${oneForm.formImg}" alt="Yoco Logo" class="yocologo">
    <h1 style="text-transform: uppercase">${oneForm.heading}</h1>
    <h3 class="heading">${oneForm.subHead}</h3>
    <form
      class="form-container"
      action="${oneForm.action}"
      method="${oneForm.method}"
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
      <button class="send" href="#" type="submit">${oneForm.click}</button>
    </form>`;
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
