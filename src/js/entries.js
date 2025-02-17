import { fetchData } from './fetch';

const getEntries = async () => {
  console.log('Moikka, maailma');
  console.log('Haetaan paikallisesta tiedostosta');

  const diaryContainer = document.getElementById('diary'); // Oikea ID
  if (!diaryContainer) {
    console.error("Virhe: 'diary' ID:tä ei löytynyt HTML:stä!");
    return;
  }

  console.log(diaryContainer);

  const url = '/diary.json';
  const response = await fetchData(url);

  if (!response || response.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }

  console.log(response);

  // Tyhjennä aiemmat kortit ennen uusien lisäämistä
  diaryContainer.innerHTML = '';

  response.forEach((entry) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Kuvan sisältävä div
    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');
    const img = document.createElement('img');
    img.src = '/img/diary.jpg'; // Muuta tarvittaessa
    img.alt = 'Diary Image';
    cardImg.appendChild(img);

    // Tekstitiedot
    const cardDiary = document.createElement('div');
    cardDiary.classList.add('card-diary');
    cardDiary.innerHTML = `
      <p><strong>Date:</strong> ${entry.entry_date}</p>
      <p><strong>Mood:</strong> ${entry.mood}</p>
      <p><strong>Weight:</strong> ${entry.weight} kg</p>
      <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
      <p><strong>Notes:</strong> ${entry.notes}</p>
    `;

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);
  });
};

// Lisää tapahtumankuuntelija napille
document.querySelector('.get_entries').addEventListener('click', getEntries);

export { getEntries };
