const input = document.querySelector('#new');
//there is only one add button next to input field
const addButton = document.querySelector('#add');
//there are multiple delete buttons so we will listen for all of them
const deleteButtons = document.querySelectorAll('.delete');

//event listener, so basically this is where the http reqs happen. this event listener will keep listening
//and any time the action of clicking on the add button happens,it will send http req to endpoints
//defined above and the endpoints '/todo' and '/todo/:id' will add or delete items accordingly.

addButton.addEventListener('click', () => {
    const item = input.value; 
  
    // okay so this is where the "post" request happens
    //we get data from the user and then put it on the td list here
    fetch('/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item })
    })
    .then(response => response.json())
    .then(data => {
      // If the item was added successfully, update the page content
      if (data.success) {
        const list = document.querySelector('#list');
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
        input.value = '';
      }
    })
    .catch(error => console.error(error));
  });

//now for each delete button we need to have an event listener 
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      // we need the id of the specific button so we can delete it
      const id = button.dataset.id;
  
      // DELETE request to the server
      fetch(`/todo/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        // If the item was removed successfully, update the page content
        if (data.success) {
          const listItem = button.closest('li');
          listItem.remove();
        }
      })
      .catch(error => console.error(error));
    });
  });