//const { addAbortListener } = require("connect-mongo");

  

  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map(
    {
      container:"map",
      style:"mapbox://styles/mapbox/streets-v12"
      ,center :coordinates,
      zoom:9
    }
  )


	
  
  
// marker for display location 
console.log("Coordinates from server:", coordinates);

if (Array.isArray(coordinates) && coordinates.length === 2) {
  const lngLat = [coordinates[0], coordinates[1]]; // [lng, lat] order
  new mapboxgl.Marker()
    .setLngLat(lngLat)
    .addTo(map);

  // Map center bhi wahi set karo
  map.setCenter(lngLat);
} else {
  console.warn("Invalid coordinates, marker not placed.");
}

// const marker = new mapboxgl.Marker()
//  .setLngLat(coordinates)
//  .addTo(map)
