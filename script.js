//variables


//get countries when page loads
document.addEventListener('DOMContentLoaded', getCountries);

async function getCountries(){
  const resp = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await resp.json();
  console.log(countries);
  showCountries(countries);

}

function showCountries(countries){
  let output;
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  


