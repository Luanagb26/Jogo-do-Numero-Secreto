
//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do n° secreto" ;

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um numero entre 1 e 10" ;
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentivas = 1;


// com parametros, o valor não precisa ser guardado então não tem retorno
function exibirTextoNaTela(tag, texto){
    
    let campo = document.querySelector(tag);
    campo.innerHTML = texto ;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2}); // texto, língua e velocidade

}
// sem parametros usa return porque não tem lugar para guardar o valor
function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random()* 10 +1 );
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){  //limitando os números excluidos
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); // função recursiva, que chama a si mesma
    } else {
        listaNumerosSorteados.push( numeroEscolhido );
        return numeroEscolhido;
    }
};

function verificarChute() {
    let chute = document.querySelector("input").value;
    // console.log(chute == numeroSecreto) // checando se o num é igual = true, ou não = false
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1","Parabéns!"); // substituindo alert e promt

        let palavraTentativa = tentivas > 1 ? "tentativas":"tentativa";
        let mensagemTentativas = ` Você acertou com ${tentivas} ${palavraTentativa}`  
        exibirTextoNaTela("p", mensagemTentativas);

        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("h1","Tente novamente!");
            exibirTextoNaTela("p", `O número secreto é menor que ${chute} .`)
        
        }
        else {
            exibirTextoNaTela("h1","Tente novamente!");
            exibirTextoNaTela("p", `O número secreto é maior que ${chute} .`)
            
        }
        tentivas ++;
        limparCampo();
    } 
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio;
    limparCampo();
    tentivas = 1;
    exibirMensagemInicial(); 
    document.getElementById("reiniciar").setAttribute("disabled",true); //adcionando disable como atributo de reinciar novamente
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Bem-vindo ao Jogo do N° Secreto!");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}


exibirMensagemInicial();

