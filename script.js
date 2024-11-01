const campeos = [
    {nome: 'Wukong'},
    {nome: 'Xin-Zhao'},
    {nome: 'Riven'},
    {nome: 'Viego'},
    {nomw: 'Lilia'}
];





// TABELA

let nomeInput = '';
let numeroInput = '';
let linhas = [];
let nomes = [];
let contatos = [];
let totalContatos = 0;
const form = document.getElementById('modal-form');

// Função para adicionar eventos ao botao de  excluir
function adicionarEventosBotoes() {
    const botoesExcluir = document.querySelectorAll(".btn-delete");

    botoesExcluir.forEach((botao, index) => {
        botao.addEventListener("click", () => excluirContato(index));
    });
}



// Função para excluir contato
function excluirContato(index) {
    linhas.splice(index, 1);
    atualizarTabela();       
}

// Função para atualizar a tabela após excluir
function atualizarTabela() {
    const corpoTabela = document.querySelector("tbody");
    corpoTabela.innerHTML = linhas.join(''); 
    atualizaTotalContatos();                 
    adicionarEventosBotoes();               
}





// botao de salvar contato 
saveBtn.addEventListener('click', () => {
    nomeInput = document.getElementById('item-name').value;
    numeroInput = document.getElementById('item-number').value;

    if (nomes.includes(nomeInput)) {
        alert(`O nome ${nomeInput} ja pertence a um contato, salve o contato com outro nome`)
    } else if (contatos.includes(numeroInput)) {
        alert(`O numero ${numeroInput} ja pertence a um contato, salve o contato com outro numero`)
    } else if (!/^\d+$/.test(numeroInput)) {
        alert("Por favor, insira apenas números no campo de número.");
    } else {
        nomes.push(nomeInput);
        contatos.push(numeroInput)
        let linha = '<tr>';
        linha += `<td>${nomeInput}</td>`;
        linha += `<td>${numeroInput}</td>`;
        linha += `
        <td>
            <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>`;
        linha += `</tr>`;
    
        linhas.push(linha); 

        totalContatos += 1;
    }



    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas.join('');

    atualizaTotalContatos();
    adicionarEventosBotoes();

    clearInputs();
    toggleModal(false);
});

function atualizaTotalContatos() {
    let linhape = `<tr>`;
    linhape += `<td>Total</td>`;
    linhape += `<td colspan="5">${totalContatos} Contatos</td>`;
    linhape += `</tr>`;

    const rodapeTabela = document.querySelector('tfoot');
    rodapeTabela.innerHTML = linhape;
}



// Realizar pesquisa
const pesquisaInput = document.querySelector('.pergunta');
pesquisaInput.addEventListener("input", () => {
    const termoPesquisa = pesquisaInput.value.toLowerCase();
    const linhasTabela = document.querySelectorAll('tbody tr');

    linhasTabela.forEach(linha => {
        const nomeContato = linha.querySelector("td:first-child").textContent.toLowerCase();
        const numeroContato = linha.querySelector("td:nth-child(2)").textContent.toLowerCase();

        if (nomeContato.includes(termoPesquisa) || numeroContato.includes(termoPesquisa)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
});
