const ok = "#22DF7A";
const medium = "#FFEB36";
const dangerous = "#FF5454";
const levelColor = [ok, medium, dangerous];

// Dados de exemplo
const data = {
    datasets: [{
      data: [70, 30],
      backgroundColor: [levelColor[0], "#717171"]
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