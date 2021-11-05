function generateCountriesHTML(
  flag,
  name,
  population,
  area,
  region,
  subregion,
  lat,
  lon,
  code,
  ccode
) {
  return `
        <div class="country" tabindex="-1">
            <div class="country-flag" style="background-image: url(${flag});"></div>
              <div class="country-about">
                <h3 class="country-name">${name}</h3>
                <p>Population: <span class="population">${population}</span></p>
                <p>Area: <span class="area">${area}</span> km&sup2;</p>
    
                <p>Region: <span class="region">${region}</span></p>
                <p>Subregion: <span class="subregion">${subregion}</span></p>
                <p>Lat: <span class="lat">${lat}</span> Lon: <span class="lon">${lon} </span><span><button>Map</button></span></p>
                <p>Code: <span class="code">${code}</span> Calling Code: <span class="ccode">${ccode}</span></p>
    
              </div>
            </div>
        </div>
        `;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function uploadData() {
  let countries = document.querySelector(".countries");
  let response = await fetch(
    "https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php"
  );

  if (response.ok) {
    let data = await response.json();
    for await (country of data) {
      countries.insertAdjacentHTML(
        "beforeend",
        generateCountriesHTML(
          country.flag,
          country.name,
          country.population,
          country.area,
          country.region,
          country.subregion,
          country.latlng[0],
          country.latlng[1],
          country.alpha3Code,
          country.callingCodes[0]
        )
      );
    }
    countrySearch();
    switchTheme();
    document.querySelector(".countries").addEventListener("click", (e) => {
      if (!e.target.classList.contains("country")) return;
      let countryName = e.target.children[1].children[0].innerHTML;
      showInDetail(data, countryName);
      document.querySelector(".main-top").classList.add("inactive");
      document.querySelector(".countries").classList.add("inactive");
    });
  } else {
    throw new Error();
  }
}

uploadData();

function dropDownMenuClick() {
  if (document.querySelector(".select-options.active")) {
    document.querySelector(".select-options.active").classList.remove("active");
  }
  document.querySelector(".select-options").classList.add("inactive");
}

function dropDownMenu() {
  let selectOptions = document.querySelector(".select-options");
  selectOptions.classList.toggle("inactive");
  selectOptions.classList.toggle("active");
  event.stopPropagation();
}

document
  .querySelector(".main-top__select--custom")
  .addEventListener("click", dropDownMenu);
document.addEventListener("click", dropDownMenuClick);

function sortyBy(e) {
  document.querySelector(".select-title").innerHTML = e.target.innerHTML;
  let countries = document.querySelectorAll(".country");
  for (country of countries) {
    if (e.target.id == country.children[1].children[2].children[0].innerHTML) {
      country.classList.add("active");
      country.classList.remove("inactive");
    } else {
      country.classList.remove("active");
      country.classList.add("inactive");
    }
  }
}

document
  .querySelector(".select-options")
  .addEventListener("click", (e) => sortyBy(e));

function countrySearch() {
  let searchInput = document.querySelector(
    'div.main-top__input input[type="text"]'
  );
  let countries = document.querySelectorAll(".country");
  searchInput.onclick = () =>
    (document.querySelector(".select-title").innerHTML = "Filter by region");
  searchInput.oninput = () => {
    for (country of countries) {
      // country.children[1].children[0] means name of country
      if (
        country.children[1].children[0].innerHTML
          .toLowerCase()
          .substring(0, searchInput.value.length) ===
        searchInput.value.toLowerCase()
      ) {
        country.classList.add("active");
        country.classList.remove("inactive");
      } else {
        country.classList.remove("active");
        country.classList.add("inactive");
      }
    }
  };
}

function showAll(arrays) {
  let result = [];
  for (let k of arrays) {
    result.push(k.name);
  }
  return result.join(", ");
}

function generateDetailHTML(
  flag,
  name,
  nativeName,
  population,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders
) {
  return `
            <div class="country-detail">
              <div class="detail-header">
                <button>&#8592; Back</button>
              </div>
              <div class="detail-info">
                <div class="detail-info__flag">
                  <img src="${flag}" alt="${name}">
                </div>
                <div class="detail-info__about">
                  <div class="detail-info__about--title">
                    <h2>${name}</h2>
                  </div>
                  <div class="detail-info__about--left">
                    <p>Native name: <span class="detail-info__about--native-name">${nativeName}</span></p>
                    <p>Population: <span class="detail-info__about--population">${numberWithCommas(
                      population
                    )}</span></p>
                    <p>Region: <span class="detail-info__about--region">${region}</span></p>
                    <p>Sub Region: <span class="detail-info__about--sub-region">${haveProperties(
                      subregion
                    )}</span></p>
                    <p>Capital: <span class="detail-info__about--capital">${haveProperties(
                      capital
                    )}</span></p>
                  </div>
                  <div class="detail-info__about--right">
                    <p>Top Level Domain: <span class="detail-info__about--top-domain">${topLevelDomain.join(
                      ", "
                    )}</span></p>
                    <p>Currencies: <span class="detail-info__about--currencies">${showAll(
                      currencies
                    )}</span></p>
                    <p>Languages: <span class="detail-info__about--languages">${showAll(
                      languages
                    )}</span></p>
                  </div>
                  <div class="detail-info__about--buttom">
                    Border Countries: <span class="detail-info-about--borders">${borders}</span>
                  </div>
                </div>
              </div>
            </div>
      `;
}

function haveProperties(property) {
  return property ? property : "None";
}

function showBorderCountries(countries, borders) {
  let result = [];
  if (borders.length < 1) return `<span>None</span>`;
  for (let border of borders) {
    for (let country of countries) {
      if (country.alpha3Code == border) {
        result.push(
          `<button class="detail-info-border__buttom">${country.name}</button>`
        );
      }
    }
  }
  return result.join("");
}

function showInDetail(countries, countryName) {
  for (let country of countries) {
    if (countryName == country.name) {
      document
        .querySelector(".main .container")
        .insertAdjacentHTML(
          "beforeend",
          generateDetailHTML(
            country.flag,
            country.name,
            country.nativeName,
            country.population,
            country.region,
            country.subregion,
            country.capital,
            country.topLevelDomain,
            country.currencies,
            country.languages,
            showBorderCountries(countries, country.borders)
          )
        );
    }
  }
  // Header button
  document.querySelector(".detail-header button").onclick = (e) => {
    document.querySelector(".main-top").classList.remove("inactive");
    document.querySelector(".countries").classList.remove("inactive");
    document.querySelector(".country-detail").remove();
  };

  document
    .querySelector(".detail-info__about .detail-info__about--buttom")
    .addEventListener("click", (e) => {
      if (!e.target.classList.contains("detail-info-border__buttom")) return;
      document.querySelector(".country-detail").remove();
      let countryName = e.target.innerHTML;
      showInDetail(countries, countryName);
    });

  if (document.querySelector(".header").classList.contains("dark")) {
    document.querySelector(".detail-header button").classList.toggle("dark");
    for (let el of document.querySelectorAll(".detail-info-border__buttom")) {
      el.classList.toggle("dark");
    }
  }
}
