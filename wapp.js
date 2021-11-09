/**
 * TODO
 * - remove map button if latlng is null    - TODO
 * - restyle sort stuff                     - TODO
 * - get status line working                - TODO
 * - get cancel search to work              - TODO
 *
 * - Map stuff, including close button      - DONE
 *   - add functionality to the map         - HOLT
 * - SORT feature , region and sort-by      - TODO
 */

renderHeader = () => {
  let headerElement = document.createElement("HEADER");
  headerElement.innerHTML = "<h1>Countries / Territories / Areas</h1>";
  document.body.appendChild(headerElement);
};
renderHeader();

// search-sort bar
let searchSortBar = document.createElement("div");
searchSortBar.className = "search-sort-bar";
searchSortBar.id = "search-sort-bar";

document.body.appendChild(searchSortBar);

// search box
let searchElement = document.createElement("INPUT");
searchElement.setAttribute("type", "search");
searchElement.setAttribute("placeholder", "Search name...");
searchElement.setAttribute("keyup", "searchValue(this)");
searchElement.className = "search-element";
searchElement.id = "search-element";

searchSortBar.appendChild(searchElement);

// sort / region rection of search sort bar
let searchBarSpan = document.createElement("span");
let sortRegionSpan = document.createElement("span");
sortRegionSpan.className = "sort-region-elements";

let sortSpan = document.createElement("span");
let regionSpan = document.createElement("span");

let sort = document.createElement("select");
sort.id = "sort";
let region = sort.cloneNode();
region.id = "region";
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
sortO1.innerHTML = "Area";
sort.appendChild(sortO2);
sortO2.innerHTML = "Name";
sort.appendChild(sortO3);
sortO3.innerHTML = "Population";

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
regionO1.innerHTML = "All";
region.appendChild(regionO2);
regionO2.innerHTML = "Africa";
region.appendChild(regionO3);
regionO3.innerHTML = "Americas";
region.appendChild(regionO4);
regionO4.innerHTML = "Asia";
region.appendChild(regionO5);
regionO5.innerHTML = "Europe";
region.appendChild(regionO6);
regionO6.innerHTML = "Oceania";
region.appendChild(regionO7);
regionO7.innerHTML = "Polar";

searchSortBar.appendChild(sortRegionSpan);
sortRegionSpan.appendChild(region);
sortRegionSpan.appendChild(sort);

// displays order by and shown region info
let displayStatus = document.createElement("div");
displayStatus.className = "display-status";
displayStatus.setAttribute("id", "display-status");
searchSortBar.appendChild(displayStatus);

// p and span of display information{}
let underSearch = document.createElement("div");
underSearch.classList.add("under-search");

let statusLine = document.createElement("div");
statusLine.id = "status-line";
let dsOrderBy = document.createElement("p");
dsOrderBy.innerHTML =
  "Ordered By: <b>NAME</b>&#160;&#160;&#160;&#160;&#160;&#160;";
dsOrderBy.id = "order-by";
let span = document.createElement("span");

let dsShowedRegion = document.createElement("p");
dsShowedRegion.innerHTML = "Showed Region: <b>ALL</b>";
dsShowedRegion.id = "showed-region";

underSearch.appendChild(statusLine);
statusLine.appendChild(dsOrderBy);
statusLine.appendChild(span);
span.appendChild(dsShowedRegion);
document.body.appendChild(underSearch);

// main content
let mainContent = document.createElement("section");
mainContent.className = "main-content";
mainContent.id = "main-content";

document.body.appendChild(mainContent);

// country grid
let countryGrid = document.createElement("div");
countryGrid.className = "country-grid";
countryGrid.id = "country-grid";

mainContent.appendChild(countryGrid);

var map;
var counter = 0;
showMap = (latitude, longitude, area) => {
  let maps = document.createElement("div");
  maps.classList.add("map");
  maps.id = "map";

  // sorting map functionality. HOLT
  //   let x = document.getElementById("map");
  //   //   !document.getElementById("map").style.visibility == "hidden"!
  //   if (!(window.getComputedStyle(x).display === "none")) {
  //     x.setAttribute("pointer-events", "all");
  //   }

  let closeMapButton = document.createElement("button");
  closeMapButton.id = "close-map-button";
  closeMapButton.innerHTML = "Close";
  closeMapButton.setAttribute("onclick", "closeMap()");

  let closeMapTarget = document.getElementById("close-map-button");
  if (closeMapTarget != null) {
    closeMapTarget.addEventListener("click", closeMap());
  }

  maps.appendChild(closeMapButton);
  document.body.appendChild(maps);

  if (counter == 0) {
    map = new ol.Map({
      target: "map",
      layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
      view: new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom: 10 - Math.log10(area / (16 - Math.log10(area))),
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
};

closeMap = () => {
  map.setTarget(null);
  let x = document.getElementById("close-map-button");
  x.remove();
  document.getElementById("map").style.visibility = "visible";
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
  <b>Population:</b>
    <span class="pop">${pop}</span>
  </p>
  <p><b>Area:</b> <span class="area">${area}</span> km&sup2;</p>
  
  <p><b>Region:</b> <span class="region">${region}</span></p>
  <p><b>Subregion:</b> <span class="sRegion">${sRegion}</span></p>
  <p>
  <b>Lat:</b> <span class="lat">${lat}</span> <b>Lon:</b>
    <span class="lon">${lon} </span><span><button class="MapBtn" 
    onclick="showMap(${lat}, ${lon}, ${area})"><b>Map</b></button> </span>
  </p>
  
  <p>
  <b>Code:</b> <span class="code">${code}</span> 
  <b>Calling Code:</b> <span class="cCode">${cCode}</span>
  </p>
  </div>
  </div>
  `;
};

const countryList = document.getElementById("country-grid");
var countryData;

const fetchCountryData = async () => {
  countryData = await fetch(
    "https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php"
  ).then((result) => result.json());
};

let inputTerm = "";
let inputRegionTerm = "";
let inputSortTerm = "";

compareArea = (a, b) => {
  return b.area - a.area;
};

comparePopulation = (a, b) => {
  return b.population - a.population;
};

let RESULTS = 0;

const renderCountries = async () => {
  countryList.innerHTML = "";
  await fetchCountryData();

  // user input filter
  if (inputTerm.length != 0) {
    countryData = countryData.filter((country) => {
      return country.name.toLowerCase().includes(inputTerm.toLowerCase());
    });
  }

  if (inputSortTerm.length != 0) {
    switch (inputSortTerm) {
      case "Area":
        countryData = countryData.sort(compareArea);
        break;
      case "Population":
        countryData = countryData.sort(comparePopulation);
        break;
      case "Name":
        break;
    }
    console.log("POPULATION", countryData);
  }

  if (inputRegionTerm.length != 0) {
    countryData = countryData.filter((country) => {
      switch (inputRegionTerm) {
        case "All":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());
        case "Africa":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());

        case "Americas":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());

        case "Asia":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());

        case "Europe":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());

        case "Oceania":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());

        case "Polar":
          return country.region
            .toLowerCase()
            .includes(inputRegionTerm.toLowerCase());
      }
    });
  }

  RESULTS = countryData.length;

  // formatting of data
  countryData.forEach((country) => {
    let position = {
      latitude: "",
      longitude: "",
    };

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
        country.alpha3Code,
        country.callingCodes[0]
      )
    );
  });
};

renderCountries();

const inputSearch = document.getElementById("search-element");

const inputSort = document.getElementById("sort");
const orderbyStatus = document.getElementById("order-by");

const inputRegion = document.getElementById("region");
const orderbyRegion = document.getElementById("showed-region");

// inputSearch.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     inputTerm = e.target.value;
//     // console.log("ABCD", inputTerm);

//     renderCountries();
//   }
// });

inputSort.addEventListener("change", (e) => {
  inputSortTerm = e.target.options[e.target.selectedIndex].text;
  orderbyStatus.innerHTML =
    "Ordered By: <b>" +
    inputSortTerm.toUpperCase() +
    "</b>&#160;&#160;&#160;&#160;&#160;&#160;";

  console.log("ABCD", inputSortTerm);
  renderCountries();
});

inputRegion.addEventListener("change", (e) => {
  inputRegionTerm = e.target.options[e.target.selectedIndex].text;

  orderbyRegion.innerHTML =
    "Showed Region: <b>" + inputRegionTerm.toUpperCase() + "</b>";
  console.log("ABCD", inputRegionTerm);
  renderCountries();
});

let counterLOL = 0;
document.getElementById("search-element").addEventListener("search", (e) => {
  if (counterLOL % 2 == 1) {
    inputSort.style.visibility = "visible";
    inputRegion.style.visibility = "visible";
    orderbyRegion.style.visibility = "visible";
    orderbyStatus.style.visibility = "visible";
    searchAmount.style.visibility = "collapse";
    counterLOL++;
  } else {
    inputSort.style.visibility = "collapse";
    inputRegion.style.visibility = "collapse";
    orderbyRegion.style.visibility = "collapse";
    orderbyStatus.style.visibility = "collapse";

    let searchAmount = document.createElement("p");
    searchAmount.id = "search-amount";
    searchAmount.innerHTML = "Search Results: <b>" + RESULTS + "</b> Matches";

    statusLine.appendChild(searchAmount);
    counterLOL++;
  }
  inputTerm = e.target.value;
  renderCountries();
});
