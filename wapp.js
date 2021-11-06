renderHeader = () => {
  let headerElement = document.createElement("HEADER");
  headerElement.innerHTML = "<h1>Countries / Territories / Areas</h1>";
  document.body.appendChild(headerElement);
};

renderHeader();

let mainContent = document.createElement("section");
mainContent.classList.add("main-content");
mainContent.setAttribute("id", "main-content");
document.body.appendChild(mainContent);

// country grid
let countryGrid = document.createElement("div");
countryGrid.classList.add("country-grid");
countryGrid.setAttribute("id", "country-grid");
mainContent.appendChild(countryGrid);

countryHTML = (
  flag,
  name,
  pop,
  area,
  region,
  sRegion,
  lat,
  lon,
  code,
  cCode
) => {
  return `
<div class="country" tabindex="-1">

<div class="country-img-container">
<img
  class="image-style"
  src="${flag}"
/>
</div>

<div class="country-info">
<h3 class="name">${name}</h3>
<p>
  Population:
  <span class="pop">${pop}</span>
</p>
<p>Area: <span class="area">${area}</span> km&sup2;</p>

<p>Region: <span class="region">${region}</span></p>
<p>Subregion: <span class="sRegion">${sRegion}</span></p>
<p>
  Lat: <span class="lat">${lat}</span> Lon:
  <span class="lon">${lon} </span><span id="map"><button class="btn" onclick="showMap(${lat}, ${lon})">Map</button></span>
</p>

<p>
  Code: <span class="code">${code}</span> Calling Code:
  <span class="cCode">${cCode}</span>
</p>
</div>
</div>
`;
};

async function renderCountries() {
  let countryList = document.querySelector(".country-grid");
  let response = await fetch(
    "https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php"
  );
  //   countryList = "";

  if (response.status == 200) {
    let countryData = await response.json();
    console.log(countryData);
    for (country of countryData) {
      let position = {
        latitude: "",
        longitude: "",
      };

      console.log("lat1: " + country.latlng);
      console.dir("country: " + country.name);
      console.dir("countryList: " + countryList);

      if (country.latlng == null) {
        position.latitude = "n/a";
        position.longitude = "n/a";
      } else {
        position.latitude = country.latlng[0];
        position.longitude = country.latlng[1];
      }

      //   console.log(
      //     country.flag,
      //     country.name,
      //     country.population,
      //     country.area,
      //     country.region,
      //     country.subregion,
      //     position.latitude,
      //     position.longitude,
      //     console.log("latlng: " + latitude + ", " + longitude),
      //     country.alpha3Code
      //     // country.callingCodes[0]
      //   );

      countryList.insertAdjacentHTML(
        "beforeend",
        countryHTML(
          country.flag,
          country.name,
          country.population,
          country.area,
          country.region,
          country.subregion,
          position.latitude,
          position.longitude,
          console.log(
            "latlng: " + position.latitude + ", " + position.longitude
          ),
          country.alpha3Code,
          country.callingCodes,
          console.log(
            "code: " +
              country.alpha3Code +
              " callingcode " +
              country.callingCodes
          )
        )
      );
    }
  }
}

renderCountries();
