try {
  document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll(".autocomplete");
    let instances = M.Autocomplete.init(elems);
  });
  let firebaseConfig = {
    apiKey: "AIzaSyCDKnyo99uF6A6MzZXWK0KyjwF43dF_0Vs",
    authDomain: "autcersing.firebaseapp.com",
    projectId: "autcersing",
    storageBucket: "autcersing.appspot.com",
    messagingSenderId: "681985000411",
    appId: "1:681985000411:web:beba6032a56df7f0655dfe",
    measurementId: "G-H078HMFN3Y",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let Username = document.querySelector("#name");
  let number = document.getElementById("number");
  let email = document.getElementById("email");
  let rootRef = firebase.database().ref().child("Assets");
  function SubmitHandler() {
    if (Username.value && number.value && email.value != "") {
      let newKey = rootRef.push().key;
      firebase
        .database()
        .ref("user/" + newKey)
        .set({
          id: newKey,
          email: email.value,
          number: number.value,
          name: Username.value,
        });
      Swal.fire("Успех", "Мы скоро свяжемся с Вами.", "success");
      email.value = "";
      number.value = "";
      Username.value = "";
    } else {
      return false;
    }
  }
  // <----------For-Modal-Form-------------------->

  let MUsername = document.querySelector("#name-modal");
  let Mnumber = document.getElementById("number-modal");
  let Memail = document.getElementById("email-modal");
  function SubmitModalHandler() {
    if (MUsername.value && Mnumber.value && Memail.value != "") {
      let MnewKey = rootRef.push().key;
      firebase
        .database()
        .ref("users-m/" + MnewKey)
        .set({
          id: MnewKey,
          email: Memail.value,
          number: Mnumber.value,
          name: MUsername.value,
        });
      $("#exampleModal").modal("hide");
      Swal.fire("Успех", "Мы скоро свяжемся с Вами.", "success");
      Memail.value = "";
      Mnumber.value = "";
      MUsername.value = "";
    } else {
      return false;
    }
  }
} catch (error) {}
