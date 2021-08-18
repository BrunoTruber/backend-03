/*Faça um programa que faça 5 perguntas para uma pessoa sobre um crime. As perguntas são: 

* 1. "Telefonou para a vítima?" 
* 2. "Esteve no local do crime?" 
* 3. "Mora perto da vítima?" 
* 4. "Devia para a vítima?" 
* 5. "Já trabalhou com a vítima?"

O programa deve no final emitir uma classificação sobre a participação da pessoa no crime.
Se a pessoa responder positivamente a 2 questões ela deve ser classificada como "Suspeita",
entre 3 e 4 como "Cúmplice" e 5 como "Assassino".
Caso contrário, ele será classificado como "Inocente".*/

const prompt = require("prompt-sync")();
console.log(
    "Identifique o assassino!",
);

const pergunta1 = prompt("Você telefonou para a vítima? [S/N] ");
const pergunta2 = prompt("Você esteve no local do crime? [S/N] ");
const pergunta3 = prompt("Você mora perto da vítima? [S/N] ");
const pergunta4 = prompt("Você devia para a vítima? [S/N] ");
const pergunta5 = prompt("Você já trabalhou com a vítima? [S/N] ");

let cont = 0;

if (pergunta1 === "S" || pergunta1 === "s") {
    cont++;
}
if (pergunta2 === "S" || pergunta2 === "s") {
    cont++;
}
if (pergunta3 === "S" || pergunta3 === "s") {
    cont++;
}
if (pergunta4 === "S" || pergunta4 === "s") {
    cont++;
}
if (pergunta5 === "S" || pergunta5 === "s") {
    cont++;
}

console.log(cont);

if (cont === 2) {
    console.log("Você é suspeito do crime!");
} else if (cont === 3 || cont === 4) {
    console.log("Você é cúmplice do crime!");
} else if (cont === 5) {
    console.log("Você é o assassino!");
} else {
    console.log("Você é inocente de todas as acusações!");
}