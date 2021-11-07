/**
 * TODO
 * - remove map button if latlng is null
 * - restyle sort stuff
 * - get status line working
 * - get cancel search to work
 *
 * - SORT feature , region and sort-by
 */

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
let searchElement = document.createElement("INPUT");
searchElement.setAttribute("type", "search");
searchElement.setAttribute("placeholder", "Search name...");
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
let sortDefault = opiton.cloneNode(true);
sortDefault.setAttribute("value", "");
sortDefault.setAttribute("selected", "");
sortDefault.setAttribute("disabled", "");
sortDefault.setAttribute("hidden", "");
sortDefault.innerHTML = "Sort By";

sort.appendChild(sortDefault);
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
let regionDefault = opiton.cloneNode(true);
regionDefault.setAttribute("value", "");
regionDefault.setAttribute("selected", "");
regionDefault.setAttribute("disabled", "");
regionDefault.setAttribute("hidden", "");
regionDefault.innerHTML = "By Region";

region.appendChild(regionDefault);
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
dsOrderBy.id = "order-by";
dsShowedRegion.appendChild(showedRegionT);
dsShowedRegion.id = "showed-region";
displayStatus.appendChild(dsOrderBy);
dsOrderBy.appendChild(dsShowedRegion);

// map

// main content
let mainContent = document.createElement("section");
mainContent.classList.add("main-content");
mainContent.id = "main-content";

document.body.appendChild(mainContent);

// country grid
let countryGrid = document.createElement("div");
countryGrid.classList.add("country-grid");
countryGrid.id = "country-grid";
mainContent.appendChild(countryGrid);

var map;
var counter = 0;
showMap = (latitude, longitude, area) => {
  let maps = document.createElement("div");
  maps.classList.add("map");
  maps.id = "map";

  let closeMapButton = document.createElement("button");
  closeMapButton.id = "close-map-button";
  closeMapButton.innerHTML = "Close";
  closeMapButton.setAttribute("onclick", "closeMap()");

  let closeMapTarget = document.getElementById("close-map-button");
  if (closeMapTarget != null) {
    closeMapTarget.addEventListener("click", function () {
      closeMap();
    });
  }

  maps.appendChild(closeMapButton);
  document.body.appendChild(maps);

  if (counter == 0) {
    map = new ol.Map({
      target: "map",
      layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
      view: new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom: 11 - Math.log10(area / (16 - Math.log10(area))),
      }),
    });

    counter++;
  } else {
    map.setTarget(null);

    map = new ol.Map({
      target: "map",
      layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
      view: new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom: 11 - Math.log10(area / (16 - Math.log10(area))),
      }),
    });
  }
  //change to update
};

closeMap = () => {
  map.setTarget(null);
  let x = document.getElementById("close-map-button");
  x.remove();
};

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
    <span class="lon">${lon} </span><span><button class="MapBtn" onclick="showMap(${lat}, ${lon}, ${area})">Map</button> </span>
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
        // const e = document.querySelector("#mapBtn");
        // e.parentElement.removeChild(e);
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
    // let mapBtn = document.getElementById("mapBtn");
    // mapBtn.addEventListener(
    //   "click",
    //   showMap(position.latitude, position.longitude)
    // );
  }
}

renderCountries();
