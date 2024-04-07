
mapboxgl.accessToken = mapToken;
      const map = new mapboxgl.Map({
        container: 'map',
        center: listing.geometry.coordinates,
        zoom: 9
      });

      // Create a new marker.
     const maker =  new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h5>${listing.title}</h5> <p>Exact location will be displayed after booking!</p>`) )
        
        .addTo(map);