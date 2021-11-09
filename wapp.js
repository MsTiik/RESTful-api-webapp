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
displayStatus.className = "display-status";
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
};

closeMap = () => {
  map.setTarget(null);
  let x = document.getElementById("close-map-button");
  x.remove();
  document.getElementById("map").style.visibility = "visible";
};

// searchCountries = () => {
//   let input = document.querySelector(
//     'div.search-sort-bar__input input[type="search"]'
//   );

//   let countryList = document.querySelectorAll(".country");
//   //   input.onclick = () => (document.querySelector().innerHTML = )

//   for (country of countryList) {
//     if (
//       country.children[1].children[0].innerHTML
//         .toLowerCase()
//         .substring(0, input.value.length) === input.value.toLowerCase()
//     ) {
//       country.classList.add("visible");
//       country.classList.remove("invisible");
//     } else {
//       country.classList.add("invisible");
//       country.classList.remove("visible");
//     }
//   }
// };

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

const inputSearch = document.getElementById("search-element");
const countryList = document.getElementById("country-grid");

let inputTerm = "";
let countryData;

const fetchCountryData = async () => {
  countryData = await fetch(
    "https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php"
  ).then((result) => result.json());
};

// inputSearch.addEventListener("keyup", (e) => {
//   const inputTerm = e.target.value.toLowerCase();
// });

// searchValue = (element) => {
//   if (event.keyCode == 13) {
//     alert(element.value);
//     countryData.filter((country) => {
//       if (country.classList != undefined) {
//         if (country.name.toLowerCase().includes(element.value.toLowerCase())) {
//           console.log(country.classList);
//           console.log(Array.isArray(countryData));
//           country.classList.add("active");
//           country.classList.remove("inactive");
//         } else {
//           console.log(country.classList);
//           country.classList.remove("active");
//           country.classList.add("inactive");
//         }
//       }
//     });
//   }
// };

const renderCountries = async () => {
  countryList.innerHTML = "";
  //   console.log(countryList);
  //   console.log(countryData);

  await fetchCountryData();

  //   console.log(countryData);

  countryData.filter((country) => {
    if (country.classList != undefined) {
      console.log("COUNTRYNAME", country.name.toLowerCase());
      console.log("INPUTNAME--", inputTerm.toLowerCase());

      if (country.name.toLowerCase().includes(inputTerm.toLowerCase())) {
        country.classList.add("active");
      } else {
        country.classList.add("inactive");
      }
    }
    console.log("X", inputTerm);
    console.log("Y", country.classList);
    console.log("Z", countryData);
  });

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
  //   searchValue();
};
// };

renderCountries();

inputSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    inputTerm = e.target.value;
    console.log(inputTerm);
    renderCountries();
  }
});
