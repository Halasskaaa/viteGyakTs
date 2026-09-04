import type { Measurement, NewMeasurement } from "./measurement";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'

const API_URL = 'https://retoolapi.dev/xwsMS7/data';

document.addEventListener('DOMContentLoaded', () => {
  loadData();

  document.getElementById('newdataform')!.addEventListener('submit', newData);
});

async function newData(e: SubmitEvent) {
  e.preventDefault();
  const dataForm = document.getElementById('newdataform') as HTMLFormElement;
  const data = new FormData(dataForm);
  
  const newData: NewMeasurement = {
    gender: data.get('gender')!.toString(),
    name: data.get('name')!.toString(),
    measurement_date: new Date().toString(),
    height: parseInt(data.get('height')!.toString())
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Invalid response')
  }
  dataForm.reset();
  loadData();
}

async function loadData() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Invalid response')
  }
  const data = await response.json() as Measurement[];

  const content = document.getElementById('content');
  for (const m of data) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = m.name;
    tr.appendChild(tdName);

    const tdGender = document.createElement('td');
    tdGender.textContent = m.gender;
    tr.appendChild(tdGender);
    if (m.gender.trim() == '') {
      tdGender.classList.add('missingData')
    }

    const tdHeight = document.createElement('td');
    tdHeight.textContent = m.height.toFixed();
    tr.appendChild(tdHeight);
    const tdDate = document.createElement('td');
    tdDate.textContent = m.measurement_date;
    tr.appendChild(tdDate);

    content?.appendChild(tr);
  }
}
