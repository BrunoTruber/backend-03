const prompt = require("prompt-sync")();

voto = (ano) =>{
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    const idade = anoAtual - nascimento;

    if (idade < 16){
      return `Com a idade de ${idade} anos, o voto é negado`;
    } else if(idade >= 18 || idade <= 70){
      return `Com a idade de ${idade} anos, o voto é obrigatório`;
    } else{
      return `Com a idade de ${idade} anos, o voto é opcional`;
    }
};

nascimento = prompt("Coloque o ano do seu nascimento: ");
console.log(voto(nascimento));