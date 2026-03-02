let selectedAccessories = [];
const basePrice = 20; // precio base del oso
const accessoryPrice = 5; // precio por accesorio

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
  updatePrice();
}

// Actualizar precio en pantalla
function updatePrice() {
  const total = basePrice + (selectedAccessories.length * accessoryPrice);
  document.getElementById("priceDisplay").innerText = `💲 ${total}`;
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

  updatePrice();
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

// Checkout con modal
function checkout() {
  const total = basePrice + (selectedAccessories.length * accessoryPrice);
  document.getElementById("checkoutTotal").innerText = `💲 ${total}`;

  // Limpiar accesorios previos
  const checkoutBear = document.querySelector('#checkoutModal .bear');
  checkoutBear.querySelectorAll('.accessory').forEach(acc => acc.remove());

  // Clonar accesorios seleccionados
  selectedAccessories.forEach(item => {
    const original = document.getElementById(item);
    if (original.style.display === "block") {
      const clone = original.cloneNode(true);
      clone.style.display = "block";
      checkoutBear.appendChild(clone);
    }
  });

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  modal.show();
}

// Confirmar compra dentro del modal
function confirmPurchase() {
  const total = basePrice + (selectedAccessories.length * accessoryPrice);

  const modalBody = document.querySelector('#checkoutModal .modal-body');
  const modalFooter = document.querySelector('#checkoutModal .modal-footer');

  // Reemplazar contenido del body con mensaje de confirmación
  modalBody.innerHTML = `
    <div class="text-center py-4">
      <h3 class="text-success">🎉 ¡Compra confirmada!</h3>
      <p>Tu oso personalizado cuesta <strong>$${total}</strong>.</p>
      <p>Gracias por tu compra 🧸</p>
    </div>
  `;

  // Ocultar el footer (botón)
  modalFooter.style.display = "none";
}
