const apiKey = 'fw6Ec/tBH67tz+XBdZT+IQ==FDEDGvclxL3GK3HR';

document.querySelector("button").addEventListener("click",function(){
    const input = document.querySelector("input").value;
    const apiUrl = `https://api.api-ninjas.com/v1/airports?name=${input}`;

fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayAirports(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
})

const display = document.querySelector('.display');
function displayAirports(data) {
    if (data.length === 0) {
        display.textContent = 'Oops! No airports found. Please search using the City name.';
        return; // Exit the function early since there's nothing to display
    }

    display.innerHTML = ''; // Clear the display
    const ul = document.createElement('ul');
    data.forEach(airport => {
        const li = document.createElement('li');
        li.textContent = airport.name;
        li.classList.add('airport');
        ul.appendChild(li);
        display.appendChild(ul);

        
    });
}




