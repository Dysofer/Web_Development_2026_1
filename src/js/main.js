
const x = document.getElementById("result");
if (typeof(Storage) !== "undefined") {
  x.innerHTML = "Your browser supports Web storage!";
} else {
  x.innerHTML = "Sorry, no Web storage support!";
}

function saveToLocalStorage() {

  var name = document.getElementById("nameLocal").value;
  alert(name);

}

function saveToSessionStorage() {

  var name = document.getElementById("nameSession").value;
  alert(name);
}