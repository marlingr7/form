var send = document.getElementById("send"),
sendAddress = document.getElementById("send_address");

formContact = document.getElementById("form_contacts");
formAddress = document.getElementById("form_address");
formReport = document.getElementById("form_report");

fullName = document.getElementById("fullName");
userName = document.getElementById("userName");
mail = document.getElementById("mail");
password = document.getElementById("password");
check = document.getElementById("check");
country = document.getElementById("country");
state = document.getElementById("state");
address = document.getElementById("address");
zipCode = document.getElementById("zip");

atSign = document.getElementById("at_sign");
atSignFirst = document.getElementById("at_sign_first");
atSignLast = document.getElementById("at_sign_last");
passwordLength = document.getElementById("password_length");
terms = document.getElementById("terms");
zipLength = document.getElementById("zip_length");

nameReport = document.getElementById("name_report");
userNameReport = document.getElementById("username_report");
mailReport = document.getElementById("mail_report");
addressReport = document.getElementById("address_report");
zipReport = document.getElementById("zip_report");
stateReport = document.getElementById("state_report");
countryReport = document.getElementById("country_report");

map = document.getElementById("map");

fields = [
  fullName,
  userName,
  mail,
  password,
  country,
  state,
  address,
  zipCode,
  check,
];

fieldsNames = [
  "Full Name",
  "Username",
  "Email",
  "Password",
  "Country",
  "State",
  "Address",
  "Zip Code",
];

function val_inputs_cont(evt) {
  var hasError = false;

  for (let i = 0; i < 4; i++) {
    var fieldValue = fields[i].value;

    if (fieldValue === "") {
      fields[i].setAttribute("placeholder", "Add your " + fieldsNames[i]);
      fields[i].className += " error";
      hasError = true;
    }
  }

  if (password.value.length > 0 && password.value.length < 7) {
    password.className += " error";
    passwordLength.className = "show";
    hasError = true;
  }

  if (mail.value.includes("@") == false) {
    mail.className += " error";
    atSign.className = "show";
    hasError = true;
  } else {
    if (mail.value[0] == "@") {
      mail.className += " error";
      atSignFirst.className = "show";
      hasError = true;
    } else if (mail.value[mail.value.length - 1] == "@") {
      mail.className += " error";
      atSignLast.className = "show";
      hasError = true;
    }
  }

  if (check.checked == false) {
    terms.className = "show";
    hasError = true;
  }

  if (hasError == false) {
    formContact.className = "hidden";
    formAddress.className = "show";
  }

  nameReport.innerHTML = "Full Name: " + fullName.value;
  userNameReport.innerHTML = "Username: " + userName.value;
  mailReport.innerHTML = "Email: " + mail.value;

  evt.preventDefault();
}

function val_inputs_add(evt) {
  var count = 0;

  for (let i = 4; i < fields.length; i++) {
    var fieldValue = fields[i].value;

    if (fieldValue === "") {
      fields[i].setAttribute("placeholder", "Add your " + fieldsNames[i]);
      fields[i].className += " error";
      count += 1;
    }
  }

  if (zip.value.length != 5) {
    zip.className += " error";
    zipLength.className = "show";
    count += 1;
  }

  if (count == 0) {
    map.className = "show";
    sendAddress.addEventListener("click", () => {
      formAddress.className = "hidden";
      formReport.className = "show";
      confetti.start();
    }, false);
  }

  addressReport.innerHTML = "Address: " + address.value;
  zipReport.innerHTML = "Zip Code: " + zipCode.value;
  stateReport.innerHTML = "State: " + state.value;
  countryReport.innerHTML = "Country: " + country.value;

  evt.preventDefault();
}

send.addEventListener("click", val_inputs_cont, false);
sendAddress.addEventListener("click", val_inputs_add, false);

for (let i = 0; i < fields.length; i++) {
  fields[i].addEventListener("click", () => {
    fields[i].setAttribute("placeholder", "");
    fields[i].classList.remove("error");

    switch (fields[i]) {
      case mail:
        atSign.className = "hidden";
        atSignFirst.className = "hidden";
        atSignLast.className = "hidden";
        break;
      case password:
        passwordLength.className = "hidden";
        break;
      case check:
        terms.className = "hidden";
        break;
      case zipCode:
        zipLength.className = "hidden";
        break;
      default:
        break;
    }
  });
}
