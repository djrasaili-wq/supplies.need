const form = document.getElementById("supplyForm");
const area = document.getElementById("area");

const emails = {
    lobby: "darshan@iccmemphis.com",
    cleaning: "darshan@iccmemphis.com",
    kids: "abby@iccmemphis.com",
    other: "darshan@iccmemphis.com"
};

form.addEventListener("submit", function () {
    const selected = area.value;

    if (selected === "kids") {
        // Primary recipient
        form.action = "https://formsubmit.co/abby@iccmemphis.com";

        // CC Will
        let cc = document.getElementById("_cc");
        if (!cc) {
            cc = document.createElement("input");
            cc.type = "hidden";
            cc.name = "_cc";
            cc.id = "_cc";
            form.appendChild(cc);
        }
        cc.value = "willkassner@iccmemphis.com";
    } else {
        form.action = "https://formsubmit.co/" + emails[selected];

        // Remove CC if present
        const cc = document.getElementById("_cc");
        if (cc) cc.remove();
    }
});
