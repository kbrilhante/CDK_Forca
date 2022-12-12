// const textoPalavras = "./data/br-sem-acentos.txt";
const textoPalavras = "./data/palavras.txt";
const imgDir = "./img/"
const divPlacar = document.getElementById("placar");
const divjogoForca = document.getElementById("jogoForca");
const divEscolhePalavra = document.getElementById("escolhePalavra");
const divLetras = document.getElementById("letras");
const divContinuar = document.getElementById("divContinuar");
const h1PalavraJogo = document.getElementById("palavraJogo");
const spanTurnoPergunta = document.getElementById("turnoPergunta");
const spanTurnoResposta = document.getElementById("turnoResposta");
const txtPalavra = document.getElementById("palavra");
const imgForca = document.getElementById("imgForca");
const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let letras = alfabeto;
let palavras = [];
let palavra = '';
let lacunas = '';
let contTurnos = 0;
let chances = 10;
const jogador1 = localStorage.getItem('jogador1');
const jogador2 = localStorage.getItem('jogador2');
let scoreJogador1 = 0;
let scoreJogador2 = 0;

const numJogadores = Number(localStorage.getItem("jogadores"));
getPalavras();

function inicializar() {
    const turnos = localStorage.getItem('contTurnos');
    if (turnos) {
        contTurnos = turnos;
    }
    console.log(contTurnos)
    criaPlacar();
    proximoTurno();
}

async function getPalavras() {
    const response = await fetch(textoPalavras);
    const data = await response.text();
    const lista = data.split('\n');
    lista.forEach(item => {
        let novaPalavra = item.trim()
        novaPalavra = novaPalavra.toUpperCase();
        palavras.push(novaPalavra)
    });
    inicializar();
}

function criaPlacar() {
    criaElementoPlacar(jogador1);
    scoreJogador1 = localStorage.getItem("scoreJogador1");
    if (!scoreJogador1) {
        scoreJogador1 = 0;
    }
    if (numJogadores === 2) {
        criaElementoPlacar(jogador2);
        scoreJogador2 = localStorage.getItem("scoreJogador2");
        if (!scoreJogador2) {
            scoreJogador2 = 0;
        }
        const h1Jogador1 = document.getElementById('h1' + jogador1);
        h1Jogador1.className += ' text-start';
        const h1Jogador2 = document.getElementById('h1' + jogador2);
        h1Jogador2.className += ' text-end';
    }
    preenchePlacar();
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
    spanPontosJogador.textContent = '';
    h1.appendChild(spanPontosJogador);
}

function preenchePlacar() {
    document.getElementById('pontos' + jogador1).textContent = scoreJogador1;
    if (numJogadores === 2) {
        document.getElementById('pontos' + jogador2).textContent = scoreJogador2;
    }
}

function preencheTurnoPergunta() {
    let turnoPergunta, turnoResposta;
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
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        txtPalavra.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}


function escolhePalavra2Jog() {
    let palavraEscolhida = txtPalavra.value;
    if (palavraEscolhida) {
        palavra = removeAcentos(palavraEscolhida);
        palavraSelecionada();
        // TODO mandar palavra para txt caso não esteja na lista
    } else {
        const desisto = "Desisto -.-"
        if (txtPalavra.placeholder.includes('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')) {
            txtPalavra.placeholder = desisto;
        } else if (txtPalavra.placeholder != desisto) {
            txtPalavra.placeholder += '!';
        }
    }
}

function escolhePalavra() {
    const rndIndex = Math.floor(Math.random() * palavras.length);
    palavra = removeAcentos(palavras[rndIndex]);
    palavraSelecionada();
}

function removeAcentos(palavraEscolhida) {
    palavraEscolhida = palavraEscolhida.toUpperCase();
    palavraEscolhida = palavraEscolhida.replace(/[ÁÀÃÂÄ]/g, "A");
    palavraEscolhida = palavraEscolhida.replace(/[ÉÈÊË]/g, "E");
    palavraEscolhida = palavraEscolhida.replace(/[ÍÌÎÏ]/g, "I");
    palavraEscolhida = palavraEscolhida.replace(/[ÓÒÕÔÖ]/g, "O");
    palavraEscolhida = palavraEscolhida.replace(/[ÚÙÛÜ]/g, "U");
    palavraEscolhida = palavraEscolhida.replace(/[Ç]/g, "C");
    return palavraEscolhida;
}

function palavraSelecionada() {
    divEscolhePalavra.style.display = 'none';
    divjogoForca.style.display = 'block';
    txtPalavra.value = "";

    // preenche as lacunas da palavra
    const tamanhoPalavra = palavra.length;
    lacunas = "";

    let palavraValida = false;
    for (let i = 0; i < tamanhoPalavra; i++) {
        const caractere = palavra.charAt(i)
        if (letras.includes(caractere)) {
            lacunas += "_";
            palavraValida = true;
        } else {
            lacunas += caractere;
        }
    }

    if (tamanhoPalavra > 20) {
        palavraValida = false;
    }

    if (palavraValida) {
        h1PalavraJogo.textContent = lacunas;
        escreveBotoes();
    } else {
        txtPalavra.placeholder = "Digite uma palavra válida";
        proximoTurno();
    }
}

function escreveBotoes() {
    //escreve botões
    divLetras.innerHTML = "";
    letras.forEach(letra => {
        const div = document.createElement('div');
        div.className = 'col'
        divLetras.appendChild(div);
        const botao = document.createElement('button');
        botao.id = "btn" + letra;
        botao.textContent = letra;
        botao.className = 'btn btn-primary'
        // botao.value = letra;
        botao.onclick = () => { clickLetra(letra); }
        div.appendChild(botao);
    });
}

function clickLetra(letra) {
    const botao = document.getElementById('btn' + letra);
    botao.disabled = true;
    botao.className = botao.className.replace("primary", "danger");
    if (palavra.includes(letra)) {
        let indexes = [];
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra) {
                indexes.push(i);
            }
        }
        indexes.forEach(index => {
            lacunas = replaceAt(lacunas, index, letra);
        });
        h1PalavraJogo.textContent = lacunas;
        if (lacunas === palavra) {
            // jogador respondendo marca ponto
            if (numJogadores === 1) {
                scoreJogador1++;
            } else {
                if (contTurnos % 2 === 0) {
                    scoreJogador2++;
                } else {
                    scoreJogador1++;
                }
            }
            imgForca.src = imgDir + "yay.png";
            finalizaTurno();
            // fim do turno com vitória
        }
    } else {
        chances--;
        imgForca.src = imgDir + chances + '.png';
        if (chances <= 0) {
            // turno perdido. 1p: perde ponto; 2p: ponto para o jogador perguntando
            if (numJogadores === 1) {
                if (scoreJogador1 > 0) {
                    scoreJogador1--;
                }
            } else {
                if (contTurnos % 2 === 0) {
                    scoreJogador1++;
                } else {
                    scoreJogador2++;
                }
            }
            h1PalavraJogo.textContent = palavra;
            finalizaTurno();
        }
    }
}

function replaceAt(str, index, substituicao) {
    let novaStr = str.substring(0, index)
        + substituicao
        + str.substring(index + 1);
    return novaStr;
}

function proximoTurno() {
    divjogoForca.style.display = 'none';
    divContinuar.style.display = 'none';
    divLetras.style.display = 'flex';
    chances = 10;
    imgForca.src = imgDir + chances + '.png';
    if (numJogadores === 1) {
        // modo 1 jogador
        divEscolhePalavra.style.display = 'none';
        escolhePalavra();
        document.getElementById('h2TurnoResposta').style.display = 'none';
    } else {
        // modo 2 jogadores
        divEscolhePalavra.style.display = 'block';
        preencheTurnoPergunta();
    }
}

function finalizaTurno() {
    preenchePlacar();
    divContinuar.style.display = 'block';
    divLetras.style.display = 'none';
    contTurnos++;
    localStorage.setItem('contTurnos', contTurnos);
    console.log(contTurnos)
    localStorage.setItem('scoreJogador1', scoreJogador1);
    if (numJogadores === 2) {
        localStorage.setItem('scoreJogador2', scoreJogador2)
    }
}