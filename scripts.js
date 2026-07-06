const torres = document.querySelectorAll('.torre');
const listaMovimentos = document.getElementById('lista-movimentos')

let torreSelecionada = null;
let blocoSelecionado = null;
let totalMovimentos = 0;

torres.forEach(torre => { 
    torre.addEventListener('click', function() {
        // essa parte é sobre o cancelamento de uma jogada (clicar duas vezes na mesma torre)
        if (torreSelecionada === this) {
            blocoSelecionado.classList.remove('subindo');
            blocoSelecionado = null;

            this.classList.remove('selecionada');
            torreSelecionada = null;
            return;
        }

        // aqui checa se uma jogada ainda não foi iniciada
        // depois ve se tem um bloco na torre selecionada
        if (torreSelecionada === null) {
            if (this.firstElementChild !== null) {
                this.classList.add('selecionada')

                torreSelecionada = this;
                blocoSelecionado = this.firstElementChild

                blocoSelecionado.style.setProperty('--move-y', `${-blocoSelecionado.offsetTop - 50}px`); 
                blocoSelecionado.classList.add('subindo')
            }
        } else {
            // se já tiver uma jogada acontecendo, a torre clicada na verdade é o destino
            const torreFinal = this;

            moverBloco(torreSelecionada, torreFinal, listaMovimentos);

            // PARTE FEITA COM AJUDA DE IA (Google Gemini)
            blocoSelecionado.style.transition = 'none';
            blocoSelecionado.style.setProperty('--move-y', `${-blocoSelecionado.offsetTop - 50}px`);
            blocoSelecionado.offsetHeight;
            blocoSelecionado.style.transition = 'transform 0.3s ease';

            setTimeout(() => {
                blocoSelecionado.classList.remove('subindo');
                blocoSelecionado = null;

                torreSelecionada.classList.remove('selecionada');
                torreSelecionada = null;
            }, 50)   
        }
    })
})

function moverBloco(torreInicial, torreFinal, listaMovimentos) {
    blocoSelecionado = torreInicial.firstElementChild;
    blocoTorreFinal = torreFinal.firstElementChild;

    // basicamente estou checando se tem um bloco na torre inicial,
    // se tiver e a torre final estiver vazia, então prossegue com o movimento
    // se tiver e a torre final não estiver vazia, faz a checagem se o bloco é menor que o ultimo 
    // bloco da torre vazia
    movimentoValido = blocoTorreFinal === null || (Number(blocoSelecionado.innerText) < Number(blocoTorreFinal.innerText));

    if(movimentoValido) {
        torreFinal.prepend(blocoSelecionado);
        totalMovimentos++;

        const numBloco = blocoSelecionado.innerText
        const numInicial = torreInicial.id.replace('torre', '');
        const numFinal = torreFinal.id.replace('torre', '');

        const itemLista = document.createElement("li")

        const numeroMovimento = document.createElement("div")
        numeroMovimento.innerText = `${totalMovimentos}:`

        const movimento = document.createElement("div")
        movimento.innerText = `${numInicial} -> ${numFinal}`

        itemLista.appendChild(numeroMovimento)
        itemLista.appendChild(movimento)

        listaMovimentos.appendChild(itemLista)
        // Ajuda de IA para barra scrollar para baixo automaticamente
        historico = document.getElementById('historico-movimentos')
        historico.scrollTop = historico.scrollHeight;

    } else {
        console.log("Movimento inválido");
    }
}
