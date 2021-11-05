//   <p>ORDERED BY: ${""}<span>SHOWERD REGION: </span> </p>

genCountriesHTML = (
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

  <script> 
  var gmap = new ol.Map({
    target: 'map',
    layers: [
    new ol.layer.Tile({
    source: new ol.source.OSM()
    })
    ],
    view: new ol.View({
    center: ol.proj.fromLonLat([114.2, 22.28]),
    zoom: 11
    })
    });

    document.getElementById("btn").addEventListener("click", geoFindMe());

  </script>

  <p>
    Code: <span class="code">${code}</span> Calling Code:
    <span class="cCode">${cCode}</span>
  </p>
</div>
</div>
  `;
};

async function renderHTML() {
  let countyList = document.querySelector(".countryGrid");
  let response = await fetch(
    "https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php"
  );

  if (response.status == 200) {
    let countryData = await response.json();
    //console.log(countryData);
    for (country of countryData) {
      let latitude, longitude;

      let position = {
        latitude: "",
        longitude: "",
      };

      console.log("lat1: " + country.latlng);

      if (country.latlng == null) {
        position.latitude = "n/a";
        position.longitude = "n/a";
      } else {
        position.latitude = country.latlng[0];
        position.longitude = country.latlng[1];
      }

      countyList.insertAdjacentHTML(
        "beforeend",
        genCountriesHTML(
          country.flag,
          country.name,
          country.population,
          country.area,
          country.region,
          country.subregion,
          position.latitude,
          position.longitude,
          console.log("latlng: " + latitude + ", " + longitude),

          //   country.latlng.slice().splice(0, 1) || "",
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
      //   geoFindMe();
      //   success(pos);
      showMap(position);
    }
  }
}

renderHTML();

showMap = (latitude, longitude) => {
  gmap.setView(
    new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 5,
    })
  );
};
