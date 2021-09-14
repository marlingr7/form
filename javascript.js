var send = document.getElementById("send");
var sendAddress = document.getElementById("send_address");
var sendCheck = document.getElementById("send_check");
var returnName = document.getElementById("return_name");
var returnAddress = document.getElementById("return_address");

var formContact = document.getElementById("form_contacts");
var formAddress = document.getElementById("form_address");
var formCheck = document.getElementById("form_check");
var formReport = document.getElementById("form_report");

var fullName = document.getElementById("fullName");
var userName = document.getElementById("userName");
var mail = document.getElementById("mail");
var password = document.getElementById("password");
var check = document.getElementById("check");
var country = document.getElementById("country");
var state = document.getElementById("state");
var address = document.getElementById("address");
var zipCode = document.getElementById("zip");

var atSign = document.getElementById("at_sign");
var atSignFirst = document.getElementById("at_sign_first");
var atSignLast = document.getElementById("at_sign_last");
var passwordLength = document.getElementById("password_length");
var terms = document.getElementById("terms");
var zipLength = document.getElementById("zip_length");

var nameReport = document.getElementById("name_report");
var userNameReport = document.getElementById("username_report");
var mailReport = document.getElementById("mail_report");
var addressReport = document.getElementById("address_report");
var zipReport = document.getElementById("zip_report");
var stateReport = document.getElementById("state_report");
var countryReport = document.getElementById("country_report");

var map = document.getElementById("map");

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

mapa = {
  map: false,
  marker: false,

  initMap: function () {
    mapa.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 20.670177, lng: -103.342404 },
      scrollwheel: true,
      zoom: 12,
      zoomControl: true,
      rotateControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });

    // Creamos el marcador
    mapa.marker = new google.maps.Marker({
      position: { lat: 20.670177, lng: -103.342404 },
      draggable: false,
    });

    // Le asignamos el mapa a los marcadores.
    mapa.marker.setMap(mapa.map);
  },

  // función que se ejecuta al pulsar el botón buscar dirección
  getCoords: function () {
    // Creamos el objeto geodecoder
    var geocoder = new google.maps.Geocoder();

    if (address.value != "") {
      // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
      geocoder.geocode({ address: address }, function (results, status) {
        if (status == "OK") {
          // Posicionamos el marcador en las coordenadas obtenidas
          mapa.marker.setPosition(results[0].geometry.location);
          // Centramos el mapa en las coordenadas obtenidas
          mapa.map.setCenter(mapa.marker.getPosition());
          agendaForm.showMapaEventForm();
        }
      });
    }
  },
};

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
    formAddress.className = "hidden";
    formCheck.className = "show";
    map.className = "show";
  }

  addressReport.innerHTML = "Address: " + address.value;
  zipReport.innerHTML = "Zip Code: " + zipCode.value;
  stateReport.innerHTML = "State: " + state.value;
  countryReport.innerHTML = "Country: " + country.value;

  evt.preventDefault();
}

mapa.getCoords();
send.addEventListener("click", val_inputs_cont, false);
sendAddress.addEventListener("click", val_inputs_add, false);
sendCheck.addEventListener(
  "click",
  (e) => {
    document.getElementById("title").innerHTML =
      "Congratulations, your account has been created";
    formCheck.removeChild(document.getElementById("btns"));
    confetti.start();

    e.preventDefault();
  },
  false
);
returnAddress.addEventListener(
  "click",
  (e) => {
    formAddress.className = "show";
    formCheck.className = "hidden";

    e.preventDefault();
  },
  false
);
returnName.addEventListener(
  "click",
  (e) => {
    formContact.className = "show";
    formAddress.className = "hidden";

    e.preventDefault();
  },
  false
);

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
