renderHeader = () => {
  let headerElement = document.createElement("HEADER");
  headerElement.innerHTML = "<h1>Countries / Territories / Areas</h1>";
  document.body.appendChild(headerElement);
};
renderHeader();

// search-sort bar
let searchSortBar = document.createElement("div");
searchSortBar.classList.add("search-sort-bar");
searchSortBar.id = "search-sort-bar";
// searchSortBar.innerHTML = "<br>";

document.body.appendChild(searchSortBar);

// search box
let searchElement = document.createElement("input");
searchElement.classList.add("search-element");
searchElement.id = "search-element";
searchSortBar.appendChild(searchElement);

// sort / region rection of search sort bar
let searchBarSpan = document.createElement("span");
let sortRegionSpan = document.createElement("span");
sortRegionSpan.classList.add("sort-region-elements");

let sortSpan = document.createElement("span");
let regionSpan = document.createElement("span");

let sort = document.createElement("select");
let region = sort.cloneNode();
let opiton = document.createElement("OPTION");

let sortO1 = opiton.cloneNode(true);
let sortO2 = opiton.cloneNode(true);
let sortO3 = opiton.cloneNode(true);
sort.appendChild(sortO1);
sortO1.innerHTML = "<p>Area</a>";
sort.appendChild(sortO2);
sortO2.innerHTML = "<p>Name</a>";
sort.appendChild(sortO3);
sortO3.innerHTML = "<p>Population</a>";

let regionO1 = opiton.cloneNode(true);
let regionO2 = opiton.cloneNode(true);
let regionO3 = opiton.cloneNode(true);
let regionO4 = opiton.cloneNode(true);
let regionO5 = opiton.cloneNode(true);
let regionO6 = opiton.cloneNode(true);
let regionO7 = opiton.cloneNode(true);
region.appendChild(regionO1);
regionO1.innerHTML = "<p>All</a>";
region.appendChild(regionO2);
regionO2.innerHTML = "<p>Africa</a>";
region.appendChild(regionO3);
regionO3.innerHTML = "<p>Americas</a>";
region.appendChild(regionO4);
regionO4.innerHTML = "<p>Asia</a>";
region.appendChild(regionO5);
regionO5.innerHTML = "<p>Europe</a>";
region.appendChild(regionO6);
regionO6.innerHTML = "<p>Oceania</a>";
region.appendChild(regionO7);
regionO7.innerHTML = "<p>Polar</a>";

searchSortBar.appendChild(sortRegionSpan);
sortRegionSpan.appendChild(sort);
sortRegionSpan.appendChild(region);

// displays order by and shown region info
let displayStatus = document.createElement("div");
displayStatus.classList.add("display-status");
displayStatus.setAttribute("id", "display-status");
searchSortBar.appendChild(displayStatus);

// p and span of display information{}
let dsOrderBy = document.createElement("p");
let orderByT = document.createTextNode("Order By: ${order}");
let dsShowedRegion = document.createElement("span");
let showedRegionT = document.createTextNode("Showed Region: ${region} ");
dsOrderBy.appendChild(orderByT);
dsOrderBy.setAttribute("id", "order-by");
dsShowedRegion.appendChild(showedRegionT);
dsShowedRegion.setAttribute("id", "showed-region");
displayStatus.appendChild(dsOrderBy);
dsOrderBy.appendChild(dsShowedRegion);

// main content
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
  Code: <span class="code">${code}</span> 
  Calling Code: <span class="cCode">${cCode}</span>
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

      if (country.alpha3Code == null) {
        country.alpha3Code = "n/a";
      }

      console.log(country);
      console.log(typeof country.alpha3Code); //todo - fix code WTF
      console.log(country.alpha3Code),
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
            country.callingCodes[0],
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
