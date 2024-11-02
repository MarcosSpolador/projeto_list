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