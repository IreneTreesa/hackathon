async function submitCrowdReport(){

if(!userLocation){
alert("Location unavailable");
return;
}

const flags = [];

document
.querySelectorAll('#crowd-panel input[type="checkbox"]:checked')
.forEach(cb => flags.push(cb.value));

const report = {

lat:userLocation[1],
lng:userLocation[0],

lighting:document.getElementById("lighting").value,
crowd:document.getElementById("crowd").value,
safety:document.getElementById("safety").value,
cctv:document.getElementById("cctv").value,

danger_flags:flags,

time:new Date()
};

console.log(report);

alert("Report submitted");

}