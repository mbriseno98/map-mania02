let map;
var i = 0;
var lat;
var lng;

var places = [
  {content:"Las Vegas, Nevada",lat:36.1699,lng:-115.1398},  
  {content:"New York, New York",lat:40.7128,lng:- 74.0060}, 
  {content:"Bogota,Colombia",lat:4.7110,lng:74.0721},  
  {content:"Tokyo, Japan",lat:35.689487,lng:139.691711},   
  {content:"Rabat, Morroco",lat:33.9716,lng:-6.8498},    
  {content:"Beijing, China",lat:39.9042,lng:-116.4074},    
  {content:"Miami,Florida ",lat:25.7617,lng:-80.1918},  
  {content:"Cape Town, South Africa",lat:33.9249,lng:-18.4241},  
  {content:"Vilnius, Lithuania",lat:54.6872,lng:-25.2797},
  {content:"Ontario, Canada",lat:51.2538,lng:-85.3232},
]

function initMap() {
   map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.6475, lng: -88.0895 },
    zoom: 5,
  });

  google.maps.event.addListener(map,'idle', function() {
    updateGame()
  });

  google.maps.event.addDomListener(map, 'idle', function(event) {
    
    var lat = map.data.map.center.lat();
    var lng = map.data.map.center.lng();
    if(distance(lat,lng,places[i].lat,places[i].lng)>1){
      initHint("EXTREMELY CLOSE")

    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>500 && distance(lat,lng,places[i].lat,places[i].lng)<1000){
      initHint("VERY CLOSE")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>1000 && distance(lat,lng,places[i].lat,places[i].lng)<2000){
      initHint("CLOSE")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>2000 && distance(lat,lng,places[i].lat,places[i].lng)<3000){
      initHint("NOT CLOSE")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>3000){
      initHint("NOT CLOSE AT ALL")
    }
  });

  google.maps.even.addDomListener(map, 'idle', function(event){
    alert(map.getZoom);
  })
}
function cheat() {
  for(let j = 0; j<11; j++){
    var marker = new google.maps.Marker({content:places[j],position:places[j], map:map});
  }
  initScore(10);
  alert("You Cheater! Press f5 to refresh the game")
}
function updateGame(){
  var zoomLvl = map.getZoom()
  console.log(zoomLvl);
  var inBounds = false;
  
  if (map.getBounds().contains(places[i])&&((zoomLvl==8)||(zoomLvl==9)||(zoomLvl==10))) {
    inBounds = true;
    console.log("inBounds:"+inBounds+"zoomLevel: "+zoomLvl+"i"+i);
    var marker = new google.maps.Marker({position:places[i], map:map});
    var infoWindow = new google.maps.InfoWindow(places[i]);
    marker.addListener('click',function() {
      infoWindow.open(map, marker);
    });
    
    i++;
    initScore(i);
    alert("You have Guessed corretly! " + (i))
    map.setCenter( {lat: 41.6475, lng: -88.0895 });
    map.setZoom(6) 
  }
}
function initHint(hint) {
  document.getElementById("hint-id").value = hint;  
}

function initScore(score) {
  document.getElementById("score-id").value = score; 
}

function initApplication() {
  console.log("Map Mania Starting Up!")
  console.log(lat)
  console.log(distance(places[0].lat,places[0].lng,places[1].lat,places[1].lng))
}
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

window.navigator.geolocation.getCurrentPosition(function(pos) {
  console.log(pos); 
  console.log(
    distance(pos.coords.longitude, pos.coords.latitude, 42.37, 71.03)
  ); 
});