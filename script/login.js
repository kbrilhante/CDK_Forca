const divPlayer1 = document.getElementById('divPlayer1');
const divPlayer2 = document.getElementById('divPlayer2');
const txtPlayer1 = document.getElementById('player1');
const txtPlayer2 = document.getElementById('player2');
const selNumJogadores = document.getElementById('numJogadores');
let jogadores = Number(selNumJogadores.value);

selNumJogadores.addEventListener("change",changePlayersVisibility);
changePlayersVisibility();

function changePlayersVisibility() {
    jogadores = Number(selNumJogadores.value);
    if (jogadores === 1) {
        divPlayer2.style.display = 'none';
    } else {
        divPlayer2.style.display = 'block';
    }
}

function comecar() {
    localStorage.clear();
    let nomesPreenchidos = true;
    const p1 = txtPlayer1.value;
    if (!p1) {
        nomesPreenchidos = false;
    }
    localStorage.setItem('jogador1', p1);
    if (jogadores === 2) {
        const p2 = txtPlayer2.value;
        if (!p2) {
            nomesPreenchidos = false;
        }
        localStorage.setItem('jogador2', p2);
    }
    localStorage.setItem('jogadores', jogadores);
    if (nomesPreenchidos) {
        location = "jogo.html"
    }
}
