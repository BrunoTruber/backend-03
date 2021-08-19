const prompt = require("prompt-sync")();

let valor = +prompt("Digite o valor do saque: de 10 a 600 reais ")

cem = Math.trunc(valor / 100);
valor = valor - (cem * 100);

cinquenta = Math.trunc(valor / 50);
valor = valor - (cinquenta * 50);

dez = Math.trunc(valor / 10);
valor = valor - (dez * 10);

cinco = Math.trunc(valor / 5);
valor = valor - (cinco * 5);

um = valor;

console.log(`Quantidade notas de R$100,00 = ${cem} unidades`);
console.log(`Quantidade notas de R$50,00 = ${cinquenta} unidades`);
console.log(`Quantidade notas de R$10,00 = ${dez} unidades`);
console.log(`Quantidade notas de R$5,00 = ${cinco} unidades`);
console.log(`Quantidade notas de R$1,00 = ${um} unidades`);