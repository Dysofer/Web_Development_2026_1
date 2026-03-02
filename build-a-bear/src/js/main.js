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

  const modalBody = document.querySelector('#checkoutModal .modal-body');
  // ensure there is a .bear container (it might have been replaced by confirmPurchase)
  let checkoutBear = modalBody.querySelector('.bear');
  if (!checkoutBear) {
    checkoutBear = document.createElement('div');
    checkoutBear.className = 'bear position-relative d-inline-block mb-3';
    modalBody.insertBefore(checkoutBear, modalBody.firstChild);
  }

  // Limpiar accesorios previos
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
// Al cerrar el modal de checkout restauramos la estructura original para poder reutilizarlo
const checkoutModalEl = document.getElementById('checkoutModal');
checkoutModalEl.addEventListener('hidden.bs.modal', () => {
  const modalBody = checkoutModalEl.querySelector('.modal-body');
  modalBody.innerHTML = `
    <div class="bear position-relative d-inline-block mb-3">
      <img id="bearCheckout" src="src/img/teddy.png" class="img-fluid">
    </div>
    <h4>Total: <span id="checkoutTotal">💲 20</span></h4>
    <ul id="checkoutAccessories" class="list-unstyled mt-3"></ul>
  `;
  const modalFooter = checkoutModalEl.querySelector('.modal-footer');
  modalFooter.style.display = '';
});