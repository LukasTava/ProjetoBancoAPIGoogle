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
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function salvarPonto() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const latitude = marker.getPosition().lat();
  const longitude = marker.getPosition().lng();

  if (!titulo || !descricao || isNaN(latitude) || isNaN(longitude)) {
    alert("Por favor, preencha todos os campos necessários.");
    return;
  }

  const obj = {
    titulo: titulo,
    descricao: descricao,
    latitude: latitude,
    longitude: longitude,
  };

  fetch("http://localhost:3000/pontos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao salvar ponto.");
      }
      document.getElementById("titulo").value = "";
      document.getElementById("descricao").value = "";
      marker.setPosition(map.getCenter());
      alert("Ponto salvo com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      alert("Falha ao salvar ponto.");
    });
}

function listarPontos() {
  fetch("http://localhost:3000/pontos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao buscar pontos.");
      }
      return response.json();
    })
    .then((data) => {
      markers.forEach((m) => m.setMap(null));
      markers = [];
      const tableBody = document.querySelector("#pontos-table tbody");
      tableBody.innerHTML = "";
      data.forEach((ponto) => {
        const { _id, titulo, descricao, latitude, longitude } = ponto;
        const tabela = `
          <tr data-id="${_id}">
          <td class="ponto-titulo">${titulo}</td>
          <td class="ponto-descricao">${descricao}</td>
            <td>${latitude}</td>
            <td>${longitude}</td>
            <td>
            <td>
            <button onclick="gostarPonto('${_id}')">Gostar</button>
            <button onclick="deletarPonto('${_id}')">Excluir</button>
              <button onclick="atualizarPonto('${_id}')">Atualizar</button>
            </td>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", tabela);
        const latLng = new google.maps.LatLng(latitude, longitude);
        const marcador = new google.maps.Marker({
          title: titulo,
          position: latLng,
          draggable: false,
        });
        marcador.setMap(map);
        markers.push(marcador);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Falha ao buscar pontos.");
    });
}

function deletarPonto(_id) {
  fetch(`http://localhost:3000/pontos/${_id}`, {
    method: "DELETE"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao deletar ponto.");
      }
      alert("Ponto deletado com sucesso!");
      const listaItem = document.querySelector(`tr[data-id="${_id}"]`);
      if (listaItem) {
        listaItem.remove();
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Falha ao deletar ponto.");
    });
}

function atualizarPonto(_id) {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const latitude = marker.getPosition().lat();
  const longitude = marker.getPosition().lng();

  if (!titulo || !descricao || !latitude || !longitude) {
    alert("Por favor, preencha todos os campos necessários.");
    return;
  }

  const obj = {
    titulo: titulo,
    descricao: descricao,
    latitude: latitude,
    longitude: longitude,
  };

  fetch(`http://localhost:3000/pontos/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha ao atualizar ponto.");
      }
      document.getElementById("titulo").value = "";
      document.getElementById("descricao").value = "";
      marker.setPosition(map.getCenter());  
      alert("Ponto atualizado com sucesso!");
      const listaItem = document.querySelector(`tr[data-id="${_id}"]`);
      if (listaItem) {
        const tituloElement = listaItem.querySelector("td:nth-child(1)");
        const descricaoElement = listaItem.querySelector("td:nth-child(2)");
        const latitudeElement = listaItem.querySelector("td:nth-child(3)");
        const longitudeElement = listaItem.querySelector("td:nth-child(4)");

        tituloElement.textContent = titulo;
        descricaoElement.textContent = descricao;
        latitudeElement.textContent = latitude;
        longitudeElement.textContent = longitude;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Falha ao atualizar ponto.");
    });
}

function gostarPonto(idPonto) {
  const token = localStorage.getItem('chave');

  if (!token) {
    alert('Você precisa estar autenticado para gostar de um ponto.');
    return;
  }

  fetch(`http://localhost:3000/pontos/${idPonto}/gostar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Falha ao gostar do ponto.');
      }
      alert('Ponto gostado com sucesso!');
    })
    .catch((error) => {
      console.error(error);
      alert('Falha ao gostar do ponto.');
    });
}