// const textoPalavras = "./data/br-sem-acentos.txt";
const textoPalavras = "./data/teste.txt";
const divPlacar = document.getElementById("placar");
const divEscolhePalavra = document.getElementById("escolhePalavra");
const spanTurnoPergunta = document.getElementById("turnoPergunta");
const txtPalavra = document.getElementById("palavra");
let letras = 'A B C D E F G H I J K L M N O P Q R S T U V X Z'.split(' ');
let palavras = [];
let palavra = '';
let contTurnos = 0;
const jogador1 = localStorage.getItem('jogador1');
const jogador2 = localStorage.getItem('jogador2');

const numJogadores = Number(localStorage.getItem("jogadores"));
inicializar();

function inicializar() {
    getPalavras();
    criaPlacar();
    if (numJogadores === 1) {
        // modo 1 jogador
        divEscolhePalavra.style.display = 'none';
        escolhePalavra();
    } else {
        // modo 2 jogadores
        divEscolhePalavra.style.display = 'block';
        preencheTurnoPergunta();
    }
}

async function getPalavras() {
    const response = await fetch(textoPalavras);
    const data = await response.text();
    palavras = data.split('\n');
}

function criaPlacar() {
    criaElementoPlacar(jogador1);

    if (numJogadores === 2) {
        criaElementoPlacar(jogador2);
        const h1Jogador1 = document.getElementById('h1' + jogador1);
        h1Jogador1.className += ' text-start';
        const h1Jogador2 = document.getElementById('h1' + jogador2);
        h1Jogador2.className += ' text-end';
    }
}

function criaElementoPlacar(nome) {
    const divJogador = document.createElement('div');
    divJogador.id = 'div' + nome;
    divJogador.className = 'col';
    divPlacar.appendChild(divJogador);
    const h1 = document.createElement('h1');
    h1.id = 'h1' + nome;
    h1.className = 'display-6';
    divJogador.appendChild(h1);
    const spanNomeJogador = document.createElement('span');
    spanNomeJogador.id = 'nome' + nome;
    spanNomeJogador.textContent = nome;
    h1.appendChild(spanNomeJogador);
    const spanDoisPontos = document.createElement('span');
    spanDoisPontos.textContent = ': ';
    h1.appendChild(spanDoisPontos);
    const spanPontosJogador = document.createElement('span');
    spanPontosJogador.id = 'pontos' + nome;
    spanPontosJogador.textContent = 0;
    h1.appendChild(spanPontosJogador);
}

function preencheTurnoPergunta() {
    let turnoPergunta;
    if (contTurnos % 2 === 0) {
        turnoPergunta = jogador1;
    } else {
        turnoPergunta = jogador2;
    }
    spanTurnoPergunta.textContent = turnoPergunta;
}

function escolhePalavra2Jog() {
    const palavraEscolhida = txtPalavra.value;
    if (palavraEscolhida) {
        palavra = palavraEscolhida.toLowerCase();
        // TODO mandar palavra para txt
        // if (!palavras.includes(palavra)) {
        //     palavras.push(palavra);
        // }

        // console.log(palavra)
    } else {
        const desisto = "Desisto -.-"
        if (txtPalavra.placeholder === 'Digite aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!') {
            txtPalavra.placeholder = desisto;
        } else if (txtPalavra.placeholder != desisto) {
            txtPalavra.placeholder += '!'
        }
    }
}

function escolhePalavra() {
    const rndIndex = Math.floor(Math.random() * palavras.length);
    palavra = palavras[rndIndex];
    // console.log(palavra)
}