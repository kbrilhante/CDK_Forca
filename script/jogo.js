const textoPalavras = "./data/br-sem-acentos.txt";
// const textoPalavras = "./data/teste.txt";
const divPlacar = document.getElementById("placar");
const divjogoForca = document.getElementById("jogoForca");
const divEscolhePalavra = document.getElementById("escolhePalavra");
const divLetras = document.getElementById("letras");
const h1PalavraJogo = document.getElementById("palavraJogo");
const spanTurnoPergunta = document.getElementById("turnoPergunta");
const spanTurnoResposta = document.getElementById("turnoResposta");
const txtPalavra = document.getElementById("palavra");
const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUWXYZ'.split('');
let letras = alfabeto;
let palavras = [];
let palavra = '';
let lacunas = '';
let contTurnos = 0;
const jogador1 = localStorage.getItem('jogador1');
const jogador2 = localStorage.getItem('jogador2');
let spanPontosJogador1, spanPontosJogador2;
// TODO: verificar se tem a pontuação no localStorage e se tiver, puxar o valor
let scoreJogador1 = 0;
let scoreJogador2 = 0;

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
    divjogoForca.style.display = 'none';
}

async function getPalavras() {
    const response = await fetch(textoPalavras);
    const data = await response.text();
    palavras = data.split('\n');
}

function criaPlacar() {
    spanPontosJogador1 = criaElementoPlacar(jogador1);
    if (numJogadores === 2) {
        spanPontosJogador2 = criaElementoPlacar(jogador2);
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
    return spanPontosJogador;
}

function preencheTurnoPergunta() {
    let turnoPergunta;
    let turnoResposta;
    if (contTurnos % 2 === 0) {
        turnoPergunta = jogador1;
        turnoResposta = jogador2;
    } else {
        turnoPergunta = jogador2;
        turnoResposta = jogador1;
    }
    spanTurnoPergunta.textContent = turnoPergunta;
    spanTurnoResposta.textContent = turnoResposta;
}

function trocaVisibilidadePalavra() {
    const icon = document.getElementById('btnShowIcon');
    if (txtPalavra.type === 'password') {
        txtPalavra.type = 'text';
        icon.className = 'fa-solid fa-eye-slash'
    } else {
        txtPalavra.type = 'password';
        icon.className = 'fa-solid fa-eye'
    }
}


function escolhePalavra2Jog() {
    const palavraEscolhida = txtPalavra.value;
    if (palavraEscolhida) {
        palavra = palavraEscolhida.toUpperCase();
        palavraSelecionada();
        // TODO mandar palavra para txt caso não esteja na lista
        // if (!palavras.includes(palavra)) {
            //     palavras.push(palavra);
            // }
        } else {
            const desisto = "Desisto -.-"
            if (txtPalavra.placeholder === 'Digite aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!') {
                txtPalavra.placeholder = desisto;
            } else if (txtPalavra.placeholder != desisto) {
                txtPalavra.placeholder += '!';
        }
    }
}

function escolhePalavra() {
    const rndIndex = Math.floor(Math.random() * palavras.length);
    palavra = palavras[rndIndex].toUpperCase();
    palavraSelecionada();
}

function palavraSelecionada() {
    divEscolhePalavra.style.display = 'none';
    divjogoForca.style.display = 'block';

    txtPalavra.value = "";
    
    console.log(palavra); // apagar depois

    // preenche as lacunas da palavra
    const tamanhoPalavra = palavra.length;
    lacunas = "";
    for (let i = 1; i <= tamanhoPalavra; i++) {
        lacunas += "_"
    }
    h1PalavraJogo.textContent = lacunas;

    escreveBotoes();
}

function escreveBotoes () {
    //escreve botões
    divLetras.innerHTML="";
    letras.forEach(letra => {
        const div = document.createElement('div');
        div.className = 'col'
        divLetras.appendChild(div);
        const botao = document.createElement('button');
        botao.id = "btn" + letra;
        botao.textContent = letra;
        botao.className = 'btn btn-primary'
        // botao.value = letra;
        botao.onclick = () => {clickLetra(letra);}
        div.appendChild(botao);
    });
}

function clickLetra (letra) {
    const botao = document.getElementById('btn' + letra);
    botao.disabled = true;
    botao.className = botao.className.replace("primary", "danger");
    
}