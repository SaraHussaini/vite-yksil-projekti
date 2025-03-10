import '../css/style.css';
import { fetchData } from './fetch';
import { saveEntry } from './saveEntry';


const getEntries = async () => {
  console.log('Haetaan päiväkirjamerkinnät');

  const diaryContainer = document.getElementById('diary');
  if (!diaryContainer) {
      console.error("Virhe: 'diary' ID:tä ei löytynyt HTML:stä!");
      return;
  }

  console.log(diaryContainer);

  const url = 'http://localhost:3000/api/entries';

  let headers = {};
  const token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${token}` };

  const options = { headers: headers };
  console.log(options);

  const response = await fetchData(url, options);

  if (!response || response.error) {
      console.log('Tapahtui virhe fetch haussa!!');
      return;
  }

  console.log(response);

  diaryContainer.innerHTML = '';

  response.forEach((entry) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardImg = document.createElement('div');
      cardImg.classList.add('card-img');
      const img = document.createElement('img');
      img.src = '/img/diary.jpg';
      img.alt = 'Diary Image';
      cardImg.appendChild(img);

      const cardDiary = document.createElement('div');
      cardDiary.classList.add('card-diary');
      cardDiary.innerHTML = `
          <p><strong>Päivämäärä:</strong> ${entry.entry_date}</p>
          <p><strong>Verensokeri:</strong> ${entry.blood_sugar} </p>
          <p><strong>Insuliiniannos:</strong> ${entry.insulin_dose} </p>
          <p><strong>Mieliala:</strong> ${entry.mood}</p>
          <p><strong>Ruoka:</strong> ${entry.food}</p>
          <p><strong>Liikunta:</strong> ${entry.exercise}</p>
          <p><strong>Paino:</strong> ${entry.weight} </p>
          <p><strong>Uni:</strong> ${entry.sleep_hours} </p>
          <p><strong>Muistiinpanot:</strong> ${entry.notes}</p>
      `;

      const editButton = document.createElement("button");
      editButton.innerText = "Muokkaa";
      editButton.classList.add("edit-btn");
      editButton.setAttribute("data-id", entry.entry_id);
      editButton.addEventListener("click", () => openEditForm(entry.entry_id));

      cardDiary.appendChild(editButton);

      card.appendChild(cardImg);
      card.appendChild(cardDiary);
      diaryContainer.appendChild(card);
  });
};

// 🔹 Korjattu `openEditForm`, jossa päivämäärän muoto on oikea (YYYY-MM-DD)
function openEditForm(entryId) {
  console.log("Muokataan merkintää ID:", entryId);

  const entryElement = document.querySelector(`.edit-btn[data-id="${entryId}"]`).parentElement;
  if (!entryElement) return;

  const existingForm = document.getElementById(`edit-form-${entryId}`);
  if (existingForm) {
      existingForm.remove();
  }

  // 🔹 Haetaan ja muotoillaan päivämäärä oikein
  const rawDate = entryElement.querySelector('p:nth-child(1)').innerText.split(': ')[1];
  const formattedDate = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;

  const form = document.createElement("form");
  form.classList.add("edit-form");
  form.id = `edit-form-${entryId}`;
  form.innerHTML = `
      <label>Päivämäärä: <input type="date" id="edit-date-${entryId}" value="${formattedDate}"></label>
      <label>Verensokeri: <input type="number" id="edit-blood_sugar-${entryId}" value="${entryElement.querySelector('p:nth-child(2)').innerText.split(': ')[1]}" step="0.1"></label>
      <label>Insuliiniannos: <input type="number" id="edit-insulin_dose-${entryId}" value="${entryElement.querySelector('p:nth-child(3)').innerText.split(': ')[1]}"></label>
      <label>Mieliala: <input type="text" id="edit-mood-${entryId}" value="${entryElement.querySelector('p:nth-child(4)').innerText.split(': ')[1]}"></label>
      <label>Ruoka: <input type="text" id="edit-food-${entryId}" value="${entryElement.querySelector('p:nth-child(5)').innerText.split(': ')[1]}"></label>
      <label>Liikunta: <input type="text" id="edit-exercise-${entryId}" value="${entryElement.querySelector('p:nth-child(6)').innerText.split(': ')[1]}"></label>
      <label>Paino: <input type="number" id="edit-weight-${entryId}" value="${entryElement.querySelector('p:nth-child(7)').innerText.split(': ')[1]}"></label>
      <label>Uni: <input type="number" id="edit-sleep_hours-${entryId}" value="${entryElement.querySelector('p:nth-child(8)').innerText.split(': ')[1]}"></label>
      <label>Muistiinpanot: <textarea id="edit-notes-${entryId}">${entryElement.querySelector('p:nth-child(9)').innerText.split(': ')[1]}</textarea></label>
      <button type="submit">Tallenna</button>
  `;

  entryElement.appendChild(form);

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      saveEntry(entryId);
  });
}

// Lisää tapahtumankuuntelija napille
document.querySelector('.get_entries').addEventListener('click', getEntries);

export { getEntries };