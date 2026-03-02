let selectedAccessories = [];

// Agregar o quitar accesorio
function addAccessory(item) {
  let element = document.getElementById(item);

  if (selectedAccessories.includes(item)) {
    element.style.display = "none";
    selectedAccessories = selectedAccessories.filter(acc => acc !== item);
  } else {
    element.style.display = "block";
    selectedAccessories.push(item);
  }
}

// Guardar oso en LocalStorage
function saveBear() {
  localStorage.setItem("myBear", JSON.stringify(selectedAccessories));
  alert("🧸 Oso guardado correctamente!");
}

// Cargar oso guardado
function loadBear() {
  let saved = JSON.parse(localStorage.getItem("myBear")) || [];
  selectedAccessories = saved;

  // Ocultar todos primero
  document.querySelectorAll(".accessory").forEach(acc => {
    acc.style.display = "none";
  });

  // Mostrar los guardados
  saved.forEach(item => {
    document.getElementById(item).style.display = "block";
  });
}

// Previsualizar oso en modal
document.getElementById('previewModal').addEventListener('show.bs.modal', () => {
  const preview = document.querySelector('#previewModal .bear');
  preview.querySelectorAll('.accessory').forEach(acc => acc.remove());

  selectedAccessories.forEach(item => {
    const original = document.getElementById(item);
    if (original.style.display === "block") {
      const clone = original.cloneNode(true);
      clone.style.display = "block";
      preview.appendChild(clone);
    }
  });
});
