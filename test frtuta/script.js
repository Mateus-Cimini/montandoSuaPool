const colors = ["azul", "vermelho", "amarelo", "verde", "laranja"];
const input = document.getElementById("colorInput");
const optionsList = document.getElementById("optionsList");

// Função para filtrar e mostrar opções
input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();
    optionsList.innerHTML = ""; // Limpa a lista anterior
    const filteredColors = colors.filter(color => color.toLowerCase().includes(filter));

    // Se houver opções filtradas, exibe a lista
    if (filteredColors.length > 0 && filter) {
        optionsList.style.display = "block"; // Mostra a lista
        filteredColors.forEach(color => {
            const li = document.createElement("li");
            li.textContent = color;
            li.addEventListener("click", () => {
                input.value = color; // Preenche o input com a cor selecionada
                optionsList.style.display = "none"; // Oculta a lista
            });
            optionsList.appendChild(li);
        });
    } else {
        optionsList.style.display = "none"; // Oculta a lista se não houver opções
    }
});

// Ocultar a lista se clicar fora do input
document.addEventListener("click", (event) => {
    if (!input.contains(event.target) && !optionsList.contains(event.target)) {
        optionsList.style.display = "none";
    }
});
