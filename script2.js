// ... Código de inicialização do Firebase e outras funções ...

// Função para marcar um presente como comprado
function markAsBought(giftName, bought) {
    const giftRef = ref(database, 'gifts/' + giftName);
    
    // Obtenha os dados do presente antes de fazer a atualização
    onValue(giftRef, (snapshot) => {
        const giftData = snapshot.val();
        if (!giftData.bought) {
            // Se ainda não foi comprado, atualiza a compra
            update(giftRef, { bought: bought, purchasedBy: "Nome do Comprador" }); // Coloque o nome do comprador aqui
        } else if (giftData.purchasedBy === "Nome do Comprador") {
            // Se foi comprado pelo mesmo usuário, permite a mudança
            update(giftRef, { bought: bought });
        }
        // Se foi comprado por outra pessoa, não faça nada (ou notifique o usuário)
    });
}

// Função para exibir os presentes da lista
function displayGifts() {
    const giftsRef = ref(database, 'gifts/');
    onValue(giftsRef, (snapshot) => {
        const gifts = snapshot.val();
        const giftList = document.getElementById("gift-list");
        giftList.innerHTML = ""; // Limpa a lista antes de exibir

        for (const [key, value] of Object.entries(gifts)) {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = value.bought;

            // Verifica se o presente foi comprado
            if (value.bought && value.purchasedBy !== "Nome do Comprador") {
                checkbox.disabled = true; // Desabilita o checkbox se não for o comprador
            }

            checkbox.onchange = () => markAsBought(key, checkbox.checked); // Atualiza o estado quando a caixa é alterada
            
            // Cria o link para o presente
            const link = document.createElement("a");
            link.href = value.link; // Link do produto
            link.target = "_blank"; // Abre em nova aba
            link.textContent = key; // Nome do presente
            li.appendChild(checkbox);
            li.appendChild(link);
            li.appendChild(document.createTextNode(value.bought ? " (Comprado)" : " (Disponível)"));
            giftList.appendChild(li);
        }
    });
}

// Chama a função para exibir os presentes quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    displayGifts();
});
