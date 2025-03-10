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

 // const url = '/diary.json';
 const url = 'http://localhost:3000/api/entries'; // Varmista, että tiedosto on oikeassa paikassa
 console.log('URL', url);
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

    card.appendChild(cardImg);
    card.appendChild(cardDiary);
    diaryContainer.appendChild(card);
  });
};



// Lisää tapahtumankuuntelija napille
document.querySelector('.get_entries').addEventListener('click', getEntries);

export { getEntries };
