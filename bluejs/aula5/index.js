const calc = require("./calculadora");
const prompt = require("prompt-sync")();

console.log(`bem vindo a ${calc.nome}`);

const n1 = +prompt('primeiro numero: ');
const n2 = +prompt('segundo numero: ');

console.log(`
Qual calculo voce gostaria de fazer?
    [1] - soma
    [2] - subtraçao
    [3] - multiplicaçao
    [4] - divisao
`);

const opcao = +prompt("Sua escolha: ");

if (opcao === 1){
    console.log(`${n1} + ${n2} = ${calc.soma(n1,n2)}`)
}else if (opcao === 2){
    console.log(`${n1} - ${n2} = ${calc.sub(n1,n2)}`)
}else if (opcao === 3){
    console.log(`${n1} * ${n2} = ${calc.mult(n1,n2)}`)
}else if (opcap === 4){
    console.log(`${n1} / ${n2} = ${calc.divisao(n1,n2)}`)
}else {
    'Opção invalida'
}