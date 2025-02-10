import {fetchData} from './fetch';

const getUsers = async () => {
    const url = 'http://localhost:3000/api/users';
    const items = await fetchData(url);
 
    if (users.error); {
       console.log('Tapahtui virhe fetch haussa!!');
       return;
    }
 
   console.log(users);
 };

const tableBody = document.querySelector('#taulukko');
//tableBody.innerHTML= '';//tyhjennetään taulukko

 //TODO, myöhemmin järkevä erotella omaksi funktiokseen
 users.forEach((user) => {
	const row = document.createElement('tr');

	row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button class="check" data-id="${user.id}">Info</button></td>
      <td><button class="del" data-id="${user.id}">Delete</button></td>
      <td>${user.id}</td>
    `;

	tableBody.appendChild(row);
});
     
 
 export{getUsers};
 