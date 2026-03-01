let selectedAccessories = [];

function addAccessory(item) {

    let element = document.getElementById(item);

    if (element.style.display === "block") {
        element.style.display = "none";
        selectedAccessories = selectedAccessories.filter(acc => acc !== item);
    } else {
        element.style.display = "block";
        selectedAccessories.push(item);
    }

}

function saveBear() {
    localStorage.setItem("bear", JSON.stringify(selectedAccessories));
    alert("Oso guardado!");
}

function loadBear() {

    let saved = JSON.parse(localStorage.getItem("bear")) || [];

    selectedAccessories = saved;

    document.querySelectorAll(".accessory").forEach(acc => {
        acc.style.display = "none";
    });

    saved.forEach(item => {
        document.getElementById(item).style.display = "block";
    });

}