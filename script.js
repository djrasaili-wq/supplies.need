const form = document.getElementById("supplyForm");
const nextUrl = document.getElementById("nextUrl");

// FormSubmit redirects here after a successful submission.
nextUrl.value = `${window.location.origin}${window.location.pathname}?submitted=true`;

const params = new URLSearchParams(window.location.search);
if (params.get("submitted") === "true") {
  const card = document.querySelector(".form-card");
  card.innerHTML = `
    <div style="text-align:center; padding:28px 8px;">
      <div style="font-size:3rem; margin-bottom:12px;">✓</div>
      <h2 style="font-family:'Playfair Display',serif; font-size:2rem; margin:0 0 10px;">
        Request sent
      </h2>
      <p style="color:#68645d; line-height:1.6; margin:0 0 24px;">
        Thank you for helping ICC stay stocked and ready.
      </p>
      <a href="${window.location.pathname}"
         style="display:inline-block; padding:14px 22px; border-radius:14px; background:#1f4d3c; color:white; text-decoration:none; font-weight:700;">
        Submit another item
      </a>
    </div>
  `;
}

form?.addEventListener("submit", (event) => {
  const action = form.getAttribute("action") || "";
  if (action.includes("YOUR_EMAIL")) {
    event.preventDefault();
    alert("Before publishing, replace YOUR_EMAIL@example.com in index.html with your real email address.");
  }
});
