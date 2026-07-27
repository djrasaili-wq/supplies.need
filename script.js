const form = document.getElementById("supplyForm");
const area = document.getElementById("area");
const nextUrl = document.getElementById("nextUrl");
const ccEmail = document.getElementById("ccEmail");
const emailSubject = document.getElementById("emailSubject");

const itemsContainer = document.getElementById("itemsContainer");
const addItemButton = document.getElementById("addItemButton");
const itemInstructions = document.getElementById("itemInstructions");

const routing = {
  lobby: {
    email: "darshan@iccmemphis.com",
    cc: "",
    subject: "ICC Lobby / Coffee Supply Request"
  },

  cleaning: {
    email: "darshan@iccmemphis.com",
    cc: "",
    subject: "ICC Cleaning Supply Request"
  },

  kids: {
    email: "abby@iccmemphis.com",
    cc: "willkassner@iccmemphis.com",
    subject: "ICC Kids Ministry Supply Request"
  },

  other: {
    email: "darshan@iccmemphis.com",
    cc: "",
    subject: "Other ICC Supply Request"
  }
};

nextUrl.value =
  window.location.origin +
  window.location.pathname +
  "?submitted=true";

function updateItemInputs() {
  const itemInputs = document.querySelectorAll(".item-input");
  const selectedArea = area.value;

  itemInputs.forEach((input) => {
    if (selectedArea === "lobby") {
      input.setAttribute("list", "lobby-items");
      input.placeholder = "Select or type an item";
    } else {
      input.removeAttribute("list");
      input.placeholder = "Type the item needed";
    }
  });

  if (selectedArea === "lobby") {
    itemInstructions.textContent =
      "Choose from the supply list or type another item.";
  } else if (selectedArea) {
    itemInstructions.textContent =
      "Type each item needed below.";
  } else {
    itemInstructions.textContent =
      "Select an area first.";
  }
}

function updateRemoveButtons() {
  const rows = document.querySelectorAll(".item-row");
  const removeButtons =
    document.querySelectorAll(".remove-item-button");

  removeButtons.forEach((button) => {
    button.disabled = rows.length === 1;
  });
}

function createItemRow() {
  const row = document.createElement("div");
  row.className = "item-row";

  const input = document.createElement("input");
  input.className = "item-input";
  input.type = "text";
  input.required = true;

  const removeButton = document.createElement("button");
  removeButton.className = "remove-item-button";
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", "Remove item");
  removeButton.textContent = "×";

  removeButton.addEventListener("click", () => {
    row.remove();
    updateRemoveButtons();
    renameItemFields();
  });

  row.appendChild(input);
  row.appendChild(removeButton);
  itemsContainer.appendChild(row);

  updateItemInputs();
  updateRemoveButtons();

  input.focus();
}

function renameItemFields() {
  const itemInputs = document.querySelectorAll(".item-input");

  itemInputs.forEach((input, index) => {
    input.name = `Item ${index + 1}`;
  });
}

area.addEventListener("change", updateItemInputs);

addItemButton.addEventListener("click", createItemRow);

document
  .querySelector(".remove-item-button")
  .addEventListener("click", function () {
    const rows = document.querySelectorAll(".item-row");

    if (rows.length > 1) {
      this.closest(".item-row").remove();
      updateRemoveButtons();
      renameItemFields();
    }
  });

form.addEventListener("submit", function (event) {
  const selectedArea = area.value;
  const selectedRouting = routing[selectedArea];

  if (!selectedRouting) {
    event.preventDefault();
    alert("Please select an area.");
    return;
  }

  renameItemFields();

  const itemInputs = document.querySelectorAll(".item-input");
  let hasEmptyItem = false;

  itemInputs.forEach((input) => {
    if (!input.value.trim()) {
      hasEmptyItem = true;
    }
  });

  if (hasEmptyItem) {
    event.preventDefault();
    alert("Please fill in every item row or remove the empty row.");
    return;
  }

  form.action =
    "https://formsubmit.co/" +
    selectedRouting.email;

  emailSubject.value = selectedRouting.subject;

  if (selectedRouting.cc) {
    ccEmail.value = selectedRouting.cc;
    ccEmail.disabled = false;
  } else {
    ccEmail.value = "";
    ccEmail.disabled = true;
  }
});

const params = new URLSearchParams(window.location.search);

if (params.get("submitted") === "true") {
  const card = document.querySelector(".form-card");

  card.innerHTML = `
    <div class="success-message">
      <div class="success-icon">✓</div>

      <h2>Request sent</h2>

      <p>
        Thank you for helping ICC stay stocked and ready.
      </p>

      <a href="${window.location.pathname}">
        Submit another request
      </a>
    </div>
  `;
}

updateItemInputs();
updateRemoveButtons();
renameItemFields();
