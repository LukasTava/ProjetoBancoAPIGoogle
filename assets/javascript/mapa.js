let map;
let markers = [];

let center = { lat: -6.888463202449027, lng: -38.558930105104125 };

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 14,
    });

    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true
    });

    map.addListener("click", (evt) => {
        addMarker(evt);
    });

    marker.addListener('position_changed', () => {
        map.setCenter(marker.position);
    });

}

function addMarker(evt) {
    marker.setPosition(evt.latLng);
}

function salvarPonto() {
    const descricao = document.getElementById('descricao').value;
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
  
    if (!descricao || !lat || !lng) {
      alert('Por favor, preencha a descrição e a localização do ponto.');
      return;
    }
      const obj = { Descricao: descricao, Geometria: { type: "Point", coordinates: [lng, lat] } };
  
    fetch("http://localhost:3000/pontos", {
      method: 'POST',
      headers: {    
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao salvar ponto.');
      }
      document.getElementById('descricao').value = '';
      marker.setPosition(map.getCenter());
      alert('Ponto salvo com sucesso!');
    })
    .catch(error => {
      console.error(error);
      alert('Falha ao salvar ponto.');
    });
}
  
  function listarPontos() {
    fetch("http://localhost:3000/pontos")
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar pontos.');
        }
        return response.json();
      })
      .then(data => {
        markers.forEach(m => m.setMap(null));
        markers = [];
        const tableBody = document.querySelector('#pontos-table tbody');
        tableBody.innerHTML = '';
        data.forEach(ponto => {
          const { coordinates } = ponto.Geometria;
          const descricao = ponto.Descricao;
          const latitude = coordinates[1];
          const longitude = coordinates[0];
          const tabela = `
            <tr>
              <td>${descricao}</td>
              <td>${latitude}</td>
              <td>${longitude}</td>
            </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', tabela);
          const latLng = new google.maps.LatLng(latitude, longitude);
          const marcador = new google.maps.Marker({
            title: descricao,
            position: latLng,
            draggable: false
          });
          marcador.setMap(map);
          markers.push(marcador);
        });
      })
      .catch(error => {
        console.error(error);
        alert('Falha ao buscar pontos.');
      });
}