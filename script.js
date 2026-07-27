const form = document.getElementById("supplyForm");
const area = document.getElementById("area");
const nextUrl = document.getElementById("nextUrl");
const ccEmail = document.getElementById("ccEmail");
const emailSubject = document.getElementById("emailSubject");

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

/*
  Set the page users return to after submitting.
*/
nextUrl.value =
  window.location.origin +
  window.location.pathname +
  "?submitted=true";

/*
  Change the recipient based on the selected area.
*/
form.addEventListener("submit", function (event) {
  const selectedArea = area.value;
  const selectedRouting = routing[selectedArea];

  if (!selectedRouting) {
    event.preventDefault();
    alert("Please select an area.");
    return;
  }

  form.action =
    "https://formsubmit.co/" +
    selectedRouting.email;

  emailSubject.value = selectedRouting.subject;

  /*
    Add Will as CC for Kids Ministry requests.
  */
  if (selectedRouting.cc) {
    ccEmail.value = selectedRouting.cc;
    ccEmail.disabled = false;
  } else {
    ccEmail.value = "";
    ccEmail.disabled = true;
  }
});

/*
  Display confirmation after a successful submission.
*/
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
        Submit another item
      </a>
    </div>
  `;
}
