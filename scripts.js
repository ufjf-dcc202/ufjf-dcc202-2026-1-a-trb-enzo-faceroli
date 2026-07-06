const torres = document.querySelectorAll('.torre');

let torreSelecionada = null;
let blocoSelecionado = null;

torres.forEach(torre => { 
    torre.addEventListener('click', function() {
        if (torreSelecionada === this) {
            blocoSelecionado.classList.remove('subindo');
            blocoSelecionado = null;

            this.classList.remove('selecionada');
            torreSelecionada = null;
            return;
        }

        if (torreSelecionada === null) {
            if (this.firstElementChild !== null) {
                this.classList.add('selecionada')

                torreSelecionada = this;
                blocoSelecionado = this.firstElementChild

                blocoSelecionado.style.setProperty('--move-y', `${-blocoSelecionado.offsetTop - 50}px`); 
                blocoSelecionado.classList.add('subindo')
            }
        } else {
            const torreFinal = this;

            moverBloco(torreSelecionada, torreFinal);

            // PARTE FEITA COM AJUDA DE IA (Google Gemini)
            blocoSelecionado.style.transition = 'none';
            blocoSelecionado.style.setProperty('--move-y', `${-blocoSelecionado.offsetTop - 50}px`);
            blocoSelecionado.offsetHeight;
            blocoSelecionado.style.transition = 'transform 0.3s ease';

            setTimeout(() => {
                blocoSelecionado.classList.remove('subindo');
                blocoSelecionado = null;

                torreSelecionada.classList.remove('subindo');
                torreSelecionada = null;
            }, 50)
            
        }
    })
})

function moverBloco(torreInicial, torreFinal) {
    blocoSelecionado = torreInicial.firstElementChild;
    blocoTorreFinal = torreFinal.firstElementChild;

    // basicamente estou checando se tem um bloco na torre inicial,
    // se tiver e a torre final estiver vazia, então prossegue com o movimento
    // se tiver e a torre final não estiver vazia, faz a checagem se o bloco é menor que o ultimo 
    // bloco da torre vazia
    movimentoValido = blocoSelecionado != null && (blocoTorreFinal === null || (Number(blocoSelecionado.innerText) < Number(blocoTorreFinal.innerText)))

    if(movimentoValido) {
        torreFinal.prepend(blocoSelecionado)
    } else {
        console.log("Movimento inválido")
    }
}
