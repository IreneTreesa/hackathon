const map = new maplibregl.Map({
container:'map',
style:'https://tiles.openfreemap.org/styles/liberty',
center:[76.2999,9.9816],
zoom:13,
pitch:45
});

let userLocation = null;
let destinationMarker = null;
let navMarker = null;
let navigationActive = false;

const geoControl = new maplibregl.GeolocateControl({
positionOptions:{ enableHighAccuracy:true },
trackUserLocation:true
});

map.addControl(geoControl);

map.on('load',()=>{
geoControl.trigger();
});

geoControl.on('geolocate',(e)=>{

userLocation = [e.coords.longitude, e.coords.latitude];

document.getElementById('start-loc').value =
e.coords.latitude.toFixed(5)+", "+e.coords.longitude.toFixed(5);


// ⭐ CRITICAL FIX
if(destinationMarker && !navigationActive){

const dest = destinationMarker.getLngLat();

previewRoute(dest.lng, dest.lat);

}


if(navigationActive && navMarker){

navMarker.setLngLat(userLocation);

map.easeTo({
center:userLocation,
zoom:17,
pitch:60,
duration:500
});

}

});

map.on('click',(e)=>{
setDestination(e.lngLat.lng, e.lngLat.lat);
});

function setDestination(lng, lat, placeName=null){

// remove old marker
if(destinationMarker)
destinationMarker.remove();

// create marker
destinationMarker =
new maplibregl.Marker({color:"#4285F4"})
.setLngLat([lng,lat])
.addTo(map);

// show place name if available, else coordinates
if(placeName)
document.getElementById("end-loc").value = placeName;
else
document.getElementById("end-loc").value =
lat.toFixed(5)+", "+lng.toFixed(5);


// ⭐ preview route immediately
if(userLocation){
previewRoute(lng, lat);
}

}

async function previewRoute(destLng, destLat){

if(!userLocation){
console.log("No GPS yet");
return;
}

const url =
`https://router.project-osrm.org/route/v1/driving/` +
`${userLocation[0]},${userLocation[1]};${destLng},${destLat}` +
`?overview=full&geometries=geojson`;

try{

const res = await fetch(url);
const data = await res.json();

if(!data.routes || data.routes.length === 0){
console.log("No route found");
return;
}

const coords = data.routes[0].geometry.coordinates;

drawRoute(coords);

}
catch(err){
console.log("Route preview error:", err);
}

}

function drawRoute(coords){

// remove old route if exists
if(map.getSource("route")){
map.removeLayer("route");
map.removeSource("route");
}

// create new route source
map.addSource("route",{
type:"geojson",
data:{
type:"Feature",
geometry:{
type:"LineString",
coordinates:coords
}
}
});

// draw blue line
map.addLayer({
id:"route",
type:"line",
source:"route",
paint:{
"line-color":"#4285F4",
"line-width":6
}
});

}
// ================= SEARCH PLACE =================

document.getElementById("end-loc").addEventListener("keypress", async function(e){

if(e.key !== "Enter") return;

const query = this.value;

if(query.length < 3) return;

try{

const url =
`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

const res = await fetch(url);

const data = await res.json();

if(data.length === 0){
alert("Place not found");
return;
}

const place = data[0];

const lng = parseFloat(place.lon);
const lat = parseFloat(place.lat);

setDestination(lng, lat, place.display_name);

map.flyTo({
center:[lng,lat],
zoom:16
});

}
catch{
alert("Search failed");
}

});

// Trigger navigation when Enter is pressed in destination box
document.getElementById("end-loc")
.addEventListener("keypress", function(e){

if(e.key === "Enter"){

e.preventDefault(); // stop default behavior
getRoute(); // start navigation

}

});