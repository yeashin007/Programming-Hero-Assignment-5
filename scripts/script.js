// select element from DOM
const allSeats = document.getElementsByClassName("kbd");
const seatCounter = document.getElementById("seat-counter");
const remainSeatEl = document.getElementById("remain-seats");
const selectionList = document.getElementById("selection-list");
const ticketPriceEl = document.getElementById("ticket-price");
const totolPriceEl = document.getElementById("total-price");
const btnApply = document.getElementById("btn-apply");
const cuponInputEl = document.getElementById("cupon-input");
const discountElement = document.getElementById("discount-element");
const grandTotalEl = document.getElementById("grand-total");
const couponContainer = document.getElementById("coupon-container");
const btnNext = document.getElementById("btn-next");
const inputPhone = document.getElementById("phone");

// declared variable
let bookedSeat = parseInt(seatCounter.innerText);
let totalPrice = 0;
let grandTotal = 0;
let remainSeat = parseInt(remainSeatEl.innerText);
const ticketPrice = parseInt(ticketPriceEl.innerText);

// looping for indivisual seat
for (const seat of allSeats) {
  seat.style.cursor = "pointer";
  seat.addEventListener("click", function (e) {
    if (bookedSeat < 4) {
      if (seat.hasAttribute("disabled")) {
        alert("⚠ Already booked, please select another");
        return;
      }
      bookedSeat++;
      remainSeat--;
      totalPrice += ticketPrice;

      seatCounter.innerText = bookedSeat;
      remainSeatEl.innerText = remainSeat;
      const seatNumber = e.target.innerText;

      //   append seat number with class and price
      const list = document.createElement("li");
      list.style.padding = "4px";

      const p1 = document.createElement("p");
      p1.innerText = seatNumber;

      const p2 = document.createElement("p");
      p2.innerText = "Economy";

      const p3 = document.createElement("p");
      p3.innerText = 550;

      list.appendChild(p1);
      list.appendChild(p2);
      list.appendChild(p3);

      selectionList.appendChild(list);

      // update total ticket price
      totolPriceEl.innerText = totalPrice;

      // enabled coupon input and button
      if (bookedSeat === 4) {
        cuponInputEl.removeAttribute("disabled", "");
        btnApply.removeAttribute("disabled", "");
      }

      // Grand total
      const discount = parseFloat(discountElement.innerText);
      grandTotal = totalPrice - discount;

      grandTotalEl.innerText = grandTotal;
      seat.classList.add("bg-green");
      seat.setAttribute("disabled", "");

      // enabled next btn
      activeBtn();

      if (bookedSeat % 2 === 0) {
        list.style.backgroundColor = "#e7e7e7";
      }
    } else {
      alert("You can booked highest 04 seat at a time");
    }
  });
}

function calcDiscount() {
  const totalPrice = parseInt(totolPriceEl.innerText);

  const cupon = cuponInputEl.value;
  let discount = parseFloat(discountElement.innerText).toFixed(2);

  if (cupon === "NEW15") {
    discount = totalPrice * 0.15;
    couponContainer.classList.add("hidden");
  } else if (cupon === "Couple 20") {
    discount = totalPrice * 0.2;
    couponContainer.classList.add("hidden");
  } else {
    alert("Insert valid cupon");
    return;
  }
  discountElement.innerText = discount;
  grandTotal = totalPrice - discount;
  grandTotalEl.innerText = grandTotal;
  discountElement.parentNode.parentNode.classList.remove("hidden");
}

inputPhone.addEventListener("keyup", activeBtn);

function activeBtn() {
  if (inputPhone.value > 0 && bookedSeat > 0) {
    btnNext.removeAttribute("disabled", "");
  }
}

function primary(el, value) {
  el.innerText = value;
}

function init() {
  btnNext.setAttribute("disabled", "");
  primary(remainSeatEl, 40);
  primary(seatCounter, 0);
  primary(totolPriceEl, 0);
  primary(grandTotalEl, 0);

  while (selectionList.childNodes > 0) {
    selectionList.removeChild(selectionList.firstChild);
  }
}
