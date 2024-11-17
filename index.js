function clicou(){
    alert('IMPORTANTE!\n \nTodos os presentes comprados que você queira entregar para o casal via correios, devem ser enviados para o seguinte endereço: Av. Nóbrega, 800 - Zona 04, Maringá - PR, 87014-180 (Studio Velocity / Serviço Maira), para Maira Vieira Gracioli.')
}

function pagina_ordini(){
const dataAtual = new Date();

const dia10 = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 10);

if (dataAtual <= dia10) {
    alert("A lista de presentes da Ordini estará disponível após o dia 09/11.");
}

}

// Define a data do evento com o horário de Brasília (UTC-3)
const eventDate = new Date("2024-11-23T15:00:00-03:00");

// Atualiza a contagem regressiva a cada segundo
const timer = setInterval(() => {
  const now = new Date(); // Data atual no fuso horário local
  const nowBrasilia = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })); // Converte para horário de Brasília
  const difference = eventDate - nowBrasilia; // Diferença em milissegundos

  if (difference >= 0) {
    // Calcula os dias, horas, minutos e segundos restantes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Atualiza o texto no elemento HTML
    document.getElementById("timer").innerText = 
      `${days}d - ${hours}h - ${minutes}m - ${seconds}s`;
  } else {
    // Se o evento já passou
    clearInterval(timer);
    document.getElementById("timer").innerText = "O evento começou!";
  }
}, 1000);
