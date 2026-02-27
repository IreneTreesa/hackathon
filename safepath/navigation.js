function startNavigation(){
    console.log("Navigation started");

navigationActive = true;

// ⭐ SHOW CRITERIA BOX IMMEDIATELY
document.getElementById("crowd-panel").style.display = "block";

if(navMarker)
navMarker.remove();

navMarker = new maplibregl.Marker({
color:"#ff0000"
})
.setLngLat(userLocation)
.addTo(map);

function getRoute(){

if(!userLocation || !destinationCoords){
alert("Select destination first");
return;
}

// existing route code here

navigationActive = true;

// SHOW crowd panel
document.getElementById("crowd-panel").style.display = "block";

}

}

