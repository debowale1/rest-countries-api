//variables
const nameSearchForm = document.querySelector('#name-search-form');

//get countries when page loads
document.addEventListener('DOMContentLoaded', getCountries);
async function getCountries(){
  const resp = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await resp.json();
  showCountries(countries);

}

function showCountries(countries){
  let output = '';
  countries.forEach(country => {
    //display countries flags and details in the UI
    output += `<div class="countries__flag">
          <img src="${country.flag}" class="countries__flag-image" alt="${country.name}">
          <div class="countries__short-details">
            <h3 class="countries__name">${country.name}</h3>
            <ul class="countries__properties">
              <li class="countries__property"><b>Population:</b> ${numberWithCommas(country.population)}</li>
              <li class="countries__property"><b>Region:</b> ${country.region}</li>
              <li class="countries__property"><b>Capital:</b> ${country.capital}</li>
            </ul>
          </div>
        </div>`;
  });
  const countriesFlags = document.querySelector('.countries__flags');
  countriesFlags.innerHTML = output;
}

//search country by name
nameSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#name-search').value;
  searchCountryByFullName(input);

  // if(e.keyCode === 13 || e.which === 13){
  //   // console.log(input);
  // }

  
});

async function searchCountryByFullName(countryName){

  const resp = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`);
  const country = await resp.json();
  //display the single country
  displaySingleCountry(country);
}

function displaySingleCountry(country){
  const {name, flag, population, region, capital} = country;
  let flagsContainer = document.querySelector('.countries__flags');
  // console.log(flagsContainer);
  if(flagsContainer !== null){
    flagsContainer.innerHTML = "";
  }
  const div = document.createElement('div');
  div.className = 'countries__flag';
  div.innerHTML = `<img src="${flag}" class="countries__flag-image" alt="${name}">
          <div class="countries__short-details">
            <h3 class="countries__name">${name}</h3>
            <ul class="countries__properties">
              <li class="countries__property"><b>Population:</b> ${population}</li>
              <li class="countries__property"><b>Region:</b> ${region}</li>
              <li class="countries__property"><b>Capital:</b> ${capital}</li>
            </ul>
          </div>`;
  // const output = `<div class="countries__flag">
          
  //       </div>`;
  // document.body.innerHTML = output;
  flagsContainer.appendChild(div);

  console.log(country);

}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  


