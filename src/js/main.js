
import '../css/style.css';
import '../css/snackbar.css';
import { fetchData } from './fetch';
//import {getUsers} from './usere';
//import {getItems} from './items.js';


document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';
console.log('Moro mailmaa scriptit alkaa');

function synchronousFunction() {
    let number = 1;
    for(let i = 1; i < 10000; i++){
      number += i;
      console.log('synchronousFunction running');
    }
    console.log('regular function complete', number);
  }

  function synchronousFunction2() {
    console.log('Mikä kesti nii kauan!!');
  }


 // synchronousFunction();
  //synchronousFunction2();
  //tehtään http pyyntö
  //fetch('https://api.restful-api.dev/objects')
	//.then((response) => {
   //     console.log(response);
	//	if (!response.ok) {
		//	throw new Error('Verkkovastaus ei ollut kunnossa');
	//	}
	//	return response.json();
	//})
	//.then((data) => {
	//	console.log(data);
	//})
	//.catch((error) => {
	//	console.error('Fetch-operaatiossa ilmeni ongelma:', error);
	//});

    //tehdään hieman mdernempi tapa hakea rajapintakutsuja
    //async function getData() {
    const getData = async () => {
        try {
            //tehtään pyyntö HTTP GET
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            console.log(response);
            // muunnetaan json muotaan
            const data = await response.json();
            console.log(data);
            console.log(data.value);
        } catch (error) {
            console.error('Virhe:', error);
        }
    };
    
    getData();

    //oman rajapinnan kutsu
    //const getItems = async () => {
    //    try {
    //       const response = await fetch('https://api.chucknorris.io/jokes/random');
     //      console.log(response);
    //        const data = await response.json();
   //      console.log(data);
    //   } catch (error) {
    //       console.error('Virhe:', error);
      //  }
    //};
   //getItems();

   const getItems = async () => {
    try {
       const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
       console.log('Haetaan omasta rajapinnasta items!');
       console.log(data);
    } catch (error) {
        console.error('Virhe:', error);
    }
 };
 getItems();

 //haetaan GET all items nappi ja tehdään rajapintahaku
 //const getItemBtn = document.querySelector('.getItems');
 //getItemBtn.addEventListener('click', getItems);

 const getUsers = async () => {
  try {
     const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
     console.log('Haetaan omasta rajapinnasta items!');
     console.log(data);
  } catch (error) {
      console.error('Virhe:', error);
  }
};

getUsers();


 //const getUserBtn = document.querySelector('.get_Users');
//getUserBtn.addEventListener('click', getUsers);

const addUsers = async (username, password, email) => {
  try {
    const url = 'http://localhost:3000/api/users';

    const options = {
      body: JSON.stringify({
        username: sara,
        password: password,
        email: email.fi,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(options);

    // Oletetaan, että fetchData ei ole määritelty. Käytetään suoraan fetch().
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error('Virhe tapahtui:', error);
  }
};

export { addUsers };



//const addUserForm = document.querySelector('.addform');
//addUserForm.addEventListener('click', addUser);
