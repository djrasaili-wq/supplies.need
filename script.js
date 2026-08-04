const form = document.getElementById("supplyForm");
const area = document.getElementById("area");
const nameInput = document.getElementById("name");
const itemsContainer = document.getElementById("itemsContainer");
const addItemButton = document.getElementById("addItemButton");
const emailSubject = document.getElementById("emailSubject");
const emailMessage = document.getElementById("emailMessage");
const ccEmail = document.getElementById("ccEmail");
const nextUrl = document.getElementById("nextUrl");

const routing = {
  "Lobby": ["tiffany@iccmemphis.com"],
  "Coffee / Tea": [],
  "Kids Ministry": ["abby@iccmemphis.com", "willkassner@iccmemphis.com"],
  "Others": []
};

nextUrl.value = window.location.origin + window.location.pathname + "?submitted=true";

function getRows() {
  return [...document.querySelectorAll(".item-row")];
}

function updateRows() {
  const rows = getRows();
  rows.forEach((row, index) => {
    const itemInput = row.querySelector(".item-input");
    const stockInput = row.querySelector(".stock-input");
    const removeButton = row.querySelector(".remove-item-button");
    itemInput.id = `item-${index + 1}`;
    stockInput.id = `stock-${index + 1}`;
    removeButton.disabled = rows.length === 1;
  });
}

function removeRow(event) {
  const row = event.currentTarget.closest(".item-row");
  if (getRows().length > 1) {
    row.remove();
    updateRows();
  }
}

function createItemRow() {
  const rowNumber = getRows().length + 1;
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = `
    <div class="item-field">
      <label class="visually-hidden" for="item-${rowNumber}">Item needed</label>
      <input id="item-${rowNumber}" class="item-input" type="text" placeholder="Item needed" required />
    </div>
    <div class="stock-field">
      <label class="visually-hidden" for="stock-${rowNumber}">How much is left</label>
      <select id="stock-${rowNumber}" class="stock-input" required>
        <option value="" disabled selected>How much is left?</option>
        <option value="Completely out">Completely out</option>
        <option value="Almost out">Almost out</option>
        <option value="Running low">Running low</option>
        <option value="Need soon">Need soon</option>
      </select>
    </div>
    <button class="remove-item-button" type="button" aria-label="Remove item">×</button>`;

  row.querySelector(".remove-item-button").addEventListener("click", removeRow);
  itemsContainer.appendChild(row);
  updateRows();
  row.querySelector(".item-input").focus();
}

document.querySelector(".remove-item-button").addEventListener("click", removeRow);
addItemButton.addEventListener("click", createItemRow);

form.addEventListener("submit", function (event) {
  const selectedArea = area.value;
  const submittedBy = nameInput.value.trim();
  const rows = getRows();

  if (!selectedArea || !submittedBy) return;

  const itemLines = [];
  for (const row of rows) {
    const item = row.querySelector(".item-input").value.trim();
    const stock = row.querySelector(".stock-input").value;
    if (!item || !stock) {
      event.preventDefault();
      alert("Please complete every item row or remove any empty rows.");
      return;
    }
    itemLines.push(`${item} : ${stock}`);
  }

  emailSubject.value = `${selectedArea} | ${submittedBy}`;
  emailMessage.value = itemLines.join("\n");

  const copiedRecipients = routing[selectedArea] || [];
  if (copiedRecipients.length > 0) {
    ccEmail.value = copiedRecipients.join(",");
    ccEmail.disabled = false;
  } else {
    ccEmail.value = "";
    ccEmail.disabled = true;
  }

  form.action = "https://formsubmit.co/darshan@iccmemphis.com";
});

const params = new URLSearchParams(window.location.search);
if (params.get("submitted") === "true") {
  const card = document.querySelector(".form-card");
  card.innerHTML = `
    <div class="success-message">
      <div class="success-icon">✓</div>
      <h2>Request sent</h2>
      <p>Thank you for helping ICC stay stocked and ready.</p>
      <a href="${window.location.pathname}">Submit another request</a>
    </div>`;
}

updateRows();
