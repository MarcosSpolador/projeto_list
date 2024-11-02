// Importa as funções que você precisa do SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, set } from "firebase/database";

// Configuração do seu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9TIWDsupDl-5FIC1MJlBvZzUdgBcOCB0",
  authDomain: "lista-presentes-34d01.firebaseapp.com",
  databaseURL: "https://lista-presentes-34d01-default-rtdb.firebaseio.com",
  projectId: "lista-presentes-34d01",
  storageBucket: "lista-presentes-34d01.appspot.com",
  messagingSenderId: "144187995874",
  appId: "1:144187995874:web:654ab4b2cee39c001090bb",
  measurementId: "G-30V9T3BD65"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para marcar um presente como comprado
function markAsBought(giftName, bought) {
    const giftRef = ref(database, 'gifts/' + giftName);
    const buyerName = prompt("Digite seu nome para confirmar a compra:"); // Obtém o nome do comprador

    onValue(giftRef, (snapshot) => {
        const giftData = snapshot.val();
        if (!giftData.bought) {
            // Atualiza a compra se o item ainda não foi comprado
            update(giftRef, { bought: bought, purchasedBy: buyerName });
        } else if (giftData.purchasedBy === buyerName) {
            // Permite a atualização se for o comprador original
            update(giftRef, { bought: bought });
        } else {
            alert("Este item já foi comprado por outra pessoa.");
        }
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

            // Desabilita o checkbox se o item foi comprado por outro comprador
            if (value.bought && value.purchasedBy !== "Nome do Comprador") {
                checkbox.disabled = true;
            }

            checkbox.onchange = () => markAsBought(key, checkbox.checked);

            // Cria o link para o presente
            const link = document.createElement("a");
            link.href = value.link;
            link.target = "_blank"; // Abre em nova aba
            link.textContent = key; // Nome do presente
            li.appendChild(checkbox);
            li.appendChild(link);
            li.appendChild(document.createTextNode(value.bought ? ` (Comprado por ${value.purchasedBy})` : " (Disponível)"));
            giftList.appendChild(li);
        }
    });
}

// Função para adicionar um novo presente
function addGift() {
    const giftName = prompt("Digite o nome do presente:");
    const giftLink = prompt("Digite o link do presente:");

    if (giftName && giftLink) {
        const giftsRef = ref(database, 'gifts/' + giftName);
        set(giftsRef, {
            bought: false,
            purchasedBy: null,
            link: giftLink
        })
        .then(() => {
            console.log("Presente adicionado com sucesso!");
            displayGifts(); // Atualiza a lista para incluir o novo presente
        })
        .catch((error) => {
            console.error("Erro ao adicionar presente: ", error);
        });
    } else {
        alert("Nome e link do presente são obrigatórios.");
    }
}

// Chama a função para exibir os presentes quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    displayGifts();

    // Adiciona um botão ou ação para adicionar um novo presente
    const addButton = document.createElement("button");
    addButton.textContent = "Adicionar Presente";
    addButton.onclick = addGift;
    document.body.appendChild(addButton); // Adiciona o botão ao corpo da página
});

