const numeroSecreto = Math.floor(Math.random() * 100) + 1;
const tentativasMaximas = 10;

let tentativasRestantes = tentativasMaximas;
let jogoEncerrado = false;

const inputPalpite = document.getElementById("palpite");
const botaoChutar = document.getElementById("botao-chutar");
const mensagem = document.getElementById("mensagem");
const tentativas = document.getElementById("tentativas");

function atualizarTentativas() {
    tentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

function encerrarJogo() {
    jogoEncerrado = true;
    inputPalpite.disabled = true;
    botaoChutar.disabled = true;
}

function verificarPalpite() {
    if (jogoEncerrado) {
        return;
    }

    const palpite = parseInt(inputPalpite.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagem.textContent = "Digite um número válido entre 1 e 100.";
        return;
    }

    tentativasRestantes--;

    if (palpite === numeroSecreto) {
        mensagem.textContent = "Você acertou!";
        atualizarTentativas();
        encerrarJogo();
        return;
    }

    if (palpite < numeroSecreto) {
        mensagem.textContent = "O número secreto é maior.";
    } else {
        mensagem.textContent = "O número secreto é menor.";
    }

    atualizarTentativas();

    if (tentativasRestantes === 0) {
        mensagem.textContent = `Você perdeu! O número secreto era ${numeroSecreto}.`;
        encerrarJogo();
    }

    inputPalpite.value = "";
    inputPalpite.focus();
}

botaoChutar.addEventListener("click", verificarPalpite);

inputPalpite.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarPalpite();
    }
});

atualizarTentativas();