const url = new URL(document.location.href);
const orderId = url.searchParams.get("orderId");

document.getElementById("orderId").textContent = orderId;

localStorage.clear();
