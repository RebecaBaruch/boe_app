//cores da rosca
const ok = "#22DF7A";
const medium = "#FFEB36";
const dangerous = "#FF5454";
const levelColor = [ok, medium, dangerous];

//quanto cabe na rosca
let dataValue = 50;
let fill = 100 - dataValue;

// Dados de exemplo
const data = {
    datasets: [{
      data: [fill, dataValue],
      backgroundColor: ["#717171", levelColor[1]]
    }]
  };

// Configuração do gráfico
const options = {
  responsive: true,
  cutout: '73%',
  legend: {
    display: false
  }
};

// Criação do gráfico de rosca
const ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: options
});