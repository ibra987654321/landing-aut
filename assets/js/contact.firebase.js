try {
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
  firebase.analytics().logEvent("notification_received");

  let rootRef = firebase.database().ref().child("Assets");
  // ====Functions=====
  function getId(tag) {
    return document.getElementById(tag);
  }
  // =============Date Function==========
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  let s = join(new Date(), a, "-");

  // ============================

  function getDataFromTag(select, email, number, name) {
    if (getId(email).value && getId(number).value && getId(name).value != "") {
      let newKey = rootRef.push().key;
      firebase
        .database()
        .ref("users/" + newKey)
        .set({
          service: getId(select).value,
          email: getId(email).value,
          number: getId(number).value,
          name: getId(name).value,
          date: s,
        });
      $("#exampleModal").modal("hide");
      popupText("form-change");
      popupText("form-change2");
      Swal.fire(
        "Ваша заявка принята!",
        "В скором времени свяжемся с Вами.",
        "success"
      );
    } else {
      return false;
    }
  }

  function popupText(element) {
    getId(element).innerHTML = `  <h2 class="subscribe-title text-center">
     Ваша заявка обрабатывается`;
  }
  // ====End Functions====

  function SubmitHandler() {
    getDataFromTag("select", "email", "number", "name");
  }
  // <----------For-Modal-Form-------------------->

  function SubmitModalHandler() {
    getDataFromTag("select-modal", "email-modal", "number-modal", "name-modal");
  }
} catch (error) {}
