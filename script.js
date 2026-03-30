const apiKey = '4bcfacc9';
const frmPesquisa = document.querySelector("form");

frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();

    const pesquisa = ev.target.pesquisa.value;

    if (pesquisa == "") {
        alert('Preencha o campo!')
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => carregaLista(json))
}

const carregaLista = (json) => {
    const lista = document.querySelector("div.lista");
    lista.innerHTML = "";

    if (!json.Response) {          // Bug 1 e 2 corrigidos: chaves adicionadas
        alert('Nenhum filme encontrado!');  // Bug 4 corrigido: "Nnehum" → "Nenhum"
        return;                    // Bug 1 corrigido: ":" → ";"
    }

    json.Search.forEach(element => {
        console.log(element);

        const item = document.createElement("div");  // Bug 3 corrigido: "const item ="
        item.classList.add("item");

        item.innerHTML = `<img src="${element.Poster}" /><h2>${element.Title}</h2>`;

        lista.appendChild(item);
    })
}
