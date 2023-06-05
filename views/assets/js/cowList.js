const idUser = localStorage.getItem('id');

const btnPositive = document.getElementById("positiveListBtn");
const btnListAll = document.getElementById("allListBtn");

const listContainer = document.querySelector(".listContainer");

btnPositive.addEventListener('click', () => {
  console.log('Positivos');

  fetch('http://127.0.0.1:5000/listarPositivos/' + idUser, {
    method: 'GET'
  })
  .then(response => {
    return response.json()
  })
  .then(responseData => {
    listContainer.innerHTML = '';
    responseData.filtroBois.forEach(data => {
      if (data.historicoBoi !== null) {
        const a = document.createElement('a');
        a.href = './cowDetails.html';
        a.classList.add('cowItem');

        const figure = document.createElement('figure');
        figure.classList.add('cowPic');
        const img = document.createElement('img');

        img.src = `data:image/png;base64,${data.fotoPerfil}`;
        figure.appendChild(img);
        a.appendChild(figure);

        const div = document.createElement('div');
        div.classList.add('cowDescContainer');
        a.appendChild(div);

        const header = document.createElement('header');
        div.appendChild(header);

        const h1Id = document.createElement('h1');
        h1Id.classList.add('idTxt');
        h1Id.textContent = data.tempId;
        header.appendChild(h1Id);

        const h1Name = document.createElement('h1');
        h1Name.classList.add('nameTxt');
        h1Name.textContent = data.nome;
        header.appendChild(h1Name);

        const dataContainer = document.createElement('div');
        dataContainer.classList.add('dataContainer');
        div.appendChild(dataContainer);

        const treatSttsBox = document.createElement('div');
        treatSttsBox.classList.add('treatSttsBox');
        dataContainer.appendChild(treatSttsBox);

        const sttsColor = document.createElement('div');
        sttsColor.classList.add('sttsColor');
        treatSttsBox.appendChild(sttsColor);

        const spanStatus = document.createElement('span');
        spanStatus.classList.add('sttsTxt');
        spanStatus.textContent = data.status;
        treatSttsBox.appendChild(spanStatus);

        const spanPercent = document.createElement('span');
        spanPercent.classList.add('perCent');
        spanPercent.textContent = data.historicoBoi + "%";
        dataContainer.appendChild(spanPercent);

        listContainer.appendChild(a);
      }
    })
  })
  .catch(error => {
    console.log(error)
  })
})

btnListAll.addEventListener('click', () => {
  console.log('Todos');
  fetch('http://127.0.0.1:5000/listarGados/' + idUser, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(responseData => {
    listContainer.innerHTML = '';
    responseData.filtroTodos.forEach(data => {
      const a = document.createElement('a');
      a.href = './cowDetails.html';
      a.classList.add('cowItem');

      const figure = document.createElement('figure');
      figure.classList.add('cowPic');
      const img = document.createElement('img');
      img.src = `data:image/png;base64,${data.fotoPerfil}`;
      figure.appendChild(img);
      a.appendChild(figure);

      const div = document.createElement('div');
      div.classList.add('cowDescContainer');
      a.appendChild(div);

      const header = document.createElement('header');
      div.appendChild(header);

      const h1Id = document.createElement('h1');
      h1Id.classList.add('idTxt');
      h1Id.textContent = data.tempId;
      header.appendChild(h1Id);

      const h1Name = document.createElement('h1');
      h1Name.classList.add('nameTxt');
      h1Name.textContent = data.nome;
      header.appendChild(h1Name);

      const dataContainer = document.createElement('div');
      dataContainer.classList.add('dataContainer');
      div.appendChild(dataContainer);

      const treatSttsBox = document.createElement('div');
      treatSttsBox.classList.add('treatSttsBox');
      dataContainer.appendChild(treatSttsBox);

      const sttsColor = document.createElement('div');
      sttsColor.classList.add('sttsColor');
      treatSttsBox.appendChild(sttsColor);

      const spanStatus = document.createElement('span');
      spanStatus.classList.add('sttsTxt');
      spanStatus.textContent = data.status;
      treatSttsBox.appendChild(spanStatus);

      const spanPercent = document.createElement('span');
      spanPercent.classList.add('perCent');
      spanPercent.textContent = data.historicoRecente + "%";
      dataContainer.appendChild(spanPercent);

      listContainer.appendChild(a);
    })
  })
  .catch(error => {
    console.log(error)
  })
})