const results = document.getElementById('search-results');
const searchBar = document.getElementsByTagName('form')[0];
const searchBtn = document.getElementById('search');
const clearBtn = document.getElementById('clear');
const dropBtn = document.getElementById('dropdown');

searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

dropBtn.addEventListener('click', (e) => {
  const searchVisibility = window.getComputedStyle(searchBar, null).display;
  const isVisible = !(searchVisibility == 'none');
  if (isVisible) {
    searchBar.style.display = 'none';
    results.style.display = 'none';
  } else {
    searchBar.style.display = 'block';
  }
});

clearBtn.addEventListener('click', (e) => {
  results.innerHTML = '';
  results.style.display = 'none';
});

searchBtn.addEventListener('click', (e) => {
  const searchParam = document.getElementById('search-bar').value.toLowerCase();

  if (results.innerHTML !== '') {
    results.innerHTML = '';
  }

  fetch('../scripts/json/travel_recommendation_api.json')
    .then((res) => res.json())
    .then((data) => {
      if (searchParam === 'country' || searchParam === 'countries') {
        let countryList = data.countries;
        countryList.forEach((country) => {
          country.cities.forEach((city) => {
            results.innerHTML += `
             <article>
               <img src="${city.imageUrl}" alt="" />
               <div class="location-details">
                 <h2>${city.name}</h2>
                 <p>
                 ${city.description}
                 </p>
                 <button>Visit</button>
               </div>
             </article>
            `;
          });
        });
      } else if (searchParam === 'temple' || searchParam === 'temples') {
        let templeList = data.temples;
        templeList.forEach((temple) => {
          results.innerHTML += `
            <article>
              <img src="${temple.imageUrl}" alt="" />
              <div class="location-details">
                <h2>${temple.name}</h2>
                <p>
                ${temple.description}
                </p>
                <button>Visit</button>
              </div>
            </article>
           `;
        });
      } else if (searchParam === 'beach' || searchParam === 'beaches') {
        let beachList = data.beaches;
        beachList.forEach((beach) => {
          results.innerHTML += `
            <article>
              <img src="${beach.imageUrl}" alt="" />
              <div class="location-details">
                <h2>${beach.name}</h2>
                <p>
                ${beach.description}
                </p>
                <button>Visit</button>
              </div>
            </article>
           `;
        });
      } else {
        results.innerHTML = `<p class='not-found'> Nothing Found <p/>`;
      }
      results.style.display = 'block';
    });
});
