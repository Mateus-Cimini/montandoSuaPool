const champions = [
    { name: 'Wukong', rotas: ['imgs/jungle-icon.png', 'imgs/top-icon.png'], img: 'imgs/champions/wukong-logo.avif'},
    { name: 'Xin-Zhao', rotas: ['imgs/jungle-icon.png'], img: 'imgs/champions/xin-zhao-logo.avif' },
    { name: 'Riven', rotas: ['imgs/jungle-icon.png', 'imgs/top-icon.png'], img: 'imgs/champions/riven-logo.avif' },
    { name: 'Viego', rotas: ['imgs/jungle-icon.png', 'imgs/top-icon.png'], img: 'imgs/champions/viego-logo.avif' },
    { name: 'Lilia', rotas: ['imgs/jungle-icon.png'], img: 'imgs/champions/lilia-logo.avif' },
    { name: 'Rengar', rotas: ['imgs/jungle-icon.png'], img: 'imgs/champions/rengar-logo.avif' },
    { name: 'Volibear', rotas: ['imgs/jungle-icon.png', 'imgs/top-icon.png'], img: 'imgs/champions/volibear-logo.avif' } 

];

const input = document.getElementById('championInput');
const optionsList = document.getElementById("optionsList");
const tableBody = document.querySelector("tbody");
const totalRow = document.querySelector("tfoot td:nth-child(2)");

// Função para filtrar e mostrar opções
input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    optionsList.innerHTML = ""; // Limpa a lista anterior
    const filterChampions = champions.filter(champion => champion.name.toLowerCase().includes(filter));

    // Se houver opções filtradas, apareça a lista
    if (filterChampions.length > 0 && filter) {
        optionsList.style.display = 'block'; // Mostra a lista
        filterChampions.forEach(champion => {
            const li = document.createElement('li');
            li.textContent = champion.name;
            li.addEventListener('click', () => {
                addChampionToTable(champion); // Adiciona campeão à tabela
                input.value = ''; // Limpa o input
                optionsList.style.display = 'none'; // Oculta a lista
            });
            optionsList.appendChild(li);
        });
    } else {
        optionsList.style.display = 'none'; // Oculta a lista se não houver opções
    }
});

// Oculta a lista se clicar fora do input
document.addEventListener('click', (event) => {
    if (!input.contains(event.target) && !optionsList.contains(event.target)) {
        optionsList.style.display = 'none';
    }
});

// Função para adicionar campeão à tabela
function addChampionToTable(champion) {
    // Cria uma nova linha para o campeão
    const newRow = document.createElement('tr');

    // Cria uma string para as imagens das rotas
    const routeImages = champion.rotas.map(route => `<img src="${route}" width="30" alt="">`).join(' ');

    // Verifica se a propriedade de imagem do campeão existe antes de usá-la
    const championImage = champion.img ? `<img src="${champion.img}" width="40" height="40" alt="${champion.name}">` : '';

    newRow.innerHTML = `
        <td>${routeImages}</td> <!-- Adiciona todas as imagens na mesma célula -->
        <td id="img-icon-campeao">${championImage} ${champion.name}</td>
        <td>
            <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;

    // Adiciona a nova linha ao corpo da tabela
    tableBody.appendChild(newRow);
    updateChampionCount();

    // Adiciona evento para remover a linha
    const deleteButton = newRow.querySelector('.btn-delete');
    deleteButton.addEventListener('click', () => {
        tableBody.removeChild(newRow);
        updateChampionCount();
    });
}




// Função para atualizar a contagem de campeões
function updateChampionCount() {
    const rows = tableBody.querySelectorAll('tr');
    const totalChampions = rows.length;
    totalRow.textContent = `${totalChampions} Campeões`;
}
