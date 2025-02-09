
import {fetchData} from './fetch';


// Oman rajapinnan kutsuu



const getItems = async () => {
   const url = 'http://localhost:3000/api/items';
   const items = await fetchData(url);

   if (items.error); {
      console.log('Tapahtui virhe fetch haussa!!');
      return;
   }

  console.log(items);
};
    

export{getItems};




