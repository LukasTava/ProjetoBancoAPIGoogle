let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -23.5489, lng: -46.6388 },
      zoom: 15
    });
  }