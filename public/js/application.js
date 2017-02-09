$(document).ready(function() {

  var mymap = L.map('mapid').setView([32.60, -117.0], 10);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "sherlock-omz.28p6c06o",
      accessToken: "pk.eyJ1Ijoic2hlcmxvY2stb216IiwiYSI6ImNpdzZ0aXNlZjAwMmEyb21rM215dnV5M24ifQ.4Lmf4bk91K4DBAcW92TLsQ"
  }).addTo(mymap); // FIX - refactor auth to env

  // Note that Leaflet doesn't care which basemaps you import from (can be Google, etc.).

  // Adding items: can do marker, polyline, polygon, circle, popups:

  var marker = L.marker([32.71561, -117.15765]).addTo(mymap);
  var markerNew = L.marker([32.9234, -117.17606]).addTo(mymap);

  var circle = L.circle([32.86626, -116.69128], {
    color: 'white',
    fillColor: '#33cc33',
    fillOpacity: 0.20,
    radius: 5000
  }).addTo(mymap);

  var sd = L.latLng([32.60, -117.0]);
  mymap.panTo(sd);

  var polygon = L.polygon([
    [32.83947, -117.07169],
    [32.8177, -117.01778],
    [32.81346, -117.07083]
  ]).addTo(mymap);

  var newdata = "Hello, World!";

  marker.bindPopup("<em>Welcome to your hiking map!</em>").openPopup(); //Insert into popups whatever HTML you'd like.
  markerNew.bindPopup("Enter your story here.").openPopup();
  circle.bindPopup(newdata); // <-- Testing if inserting variable works; OK.
  polygon.bindPopup("Mission Trails Regional Park");

  var popup = L.popup()
    .setLatLng([51, -117])
    .setContent("I am a standalone popup.")
    .openOn(mymap);     // Using openOn closes other popups that are open.

  // Each map opbject has its own click event handlers. Note that the click on objects/popups supersedes it. Check the documentation: http://leafletjs.com/reference.html

  function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);   // Event has .latlng;

    var newSpot = e.latlng; // Event captures latitude, longitude.

    // var newSpot = L.marker([newSpot.lat,newSpot.lng]).addTo(mymap);

    $.get('/hikes/new', function( response ) {

      popup
          .setLatLng(e.latlng)
          .setContent(response + "\n " + e.latlng)
          .openOn(mymap);

        });
    //
    //   return newSpot;

      }

  // What other information does an event have? lat, long....?

  mymap.on('click', onMapClick);

  $("#new-hike-form").on("submit", function ( response ) {

    $.post('/hikes'), function( response ) {

      L.marker(newSpot).addTo(mymap);
    }

  });


});


////// NOTES SECTION

// // TileLayers and GridLayers - Order of Z-index in CSS terms...
// Paths, like lines, polylines, circles, or GeoJSON layers.
// Marker shadows
// Marker icons
// Popups

// Source: http://leafletjs.com/examples/geojson/


// Now, testing out using GeoJSON -- the open web geographic standard!

// var myLayer = L.geoJSON().addTo(myMap);
// myLayer.addData(geojsonFeature);
// See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

////// END OF NOTES
