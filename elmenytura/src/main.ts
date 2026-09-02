import type { Ticket } from "./models/Ticket";

const form = document.getElementById("urlap") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const select = document.getElementById("events") as HTMLSelectElement;
const dbInput = document.getElementById("db") as HTMLInputElement;
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const vegosszegTd = document.getElementById("vegosszeg") as HTMLTableCellElement;

let tickets: Ticket[] = [];
let vegosszeg: number = 0;

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/tickets.json");
    tickets = await response.json();

    tickets.forEach((ticket, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = `${ticket.name} (${ticket.price} Ft)`;
        select.appendChild(option);
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nev = nameInput.value.trim();
    const index = Number(select.value);
    const db = Number(dbInput.value);

    const kivalasztott = tickets[index];

    if (db > kivalasztott.max) {
        alert(`Maximum ${kivalasztott.max} darab jegy vásárolható!`);
        return;
    }

    const ar = kivalasztott.price * db;

    const tr = document.createElement("tr");

    const tdNev = document.createElement("td");
    tdNev.textContent = nev;

    const tdEsemeny = document.createElement("td");
    tdEsemeny.textContent = `${kivalasztott.name} (${db} db)`;

    const tdAr = document.createElement("td");
    tdAr.textContent = `${ar} Ft`;

    tr.appendChild(tdNev);
    tr.appendChild(tdEsemeny);
    tr.appendChild(tdAr);

    tbody.appendChild(tr);

    vegosszeg += ar;
    vegosszegTd.textContent = `${vegosszeg} Ft`;

    form.reset();
});