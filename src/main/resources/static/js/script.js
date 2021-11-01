'use strict';

var welcomeForm = document.querySelector('#welcomeForm');
var dialogueForm = document.querySelector('#dialogueForm');
welcomeForm.addEventListener('submit', connect, true);
dialogueForm.addEventListener('submit', sendMessage, true);

var stompClient = null;
var name = null;
var token = null;

var mensagem = null;

function connect(event) {
    name = document.querySelector('#name').value.trim();

    if (name) {
        document.querySelector('#welcome-page').classList.add('hidden');
        document.querySelector('#dialogue-page').classList.remove('hidden');

        var socket = new SockJS('http://localhost:8080/api-chatyou');

        stompClient = Stomp.over(socket);


        console.log("Utilizador " +name+" se conectou");

    }

    stompClient.connect({}, connectionSuccess);
    event.preventDefault();
}

function connectionSuccess() {

    stompClient.subscribe('/topic/mensagem', {}, getEncomendas);

    if (name === 'Adão') {

        mensagem = {
            nome: name,
            texto: "Olá a todos sou o Adão"
        };

        stompClient.send("/app/tempo/real/mensagem", {}, JSON.stringify(mensagem));
    }

    if (name === 'Brian') {

        mensagem = {
            nome: name,
            texto: "Olá a todos sou o Brian"
        };

        stompClient.send("/app/tempo/real/mensagem", {}, JSON
            .stringify(mensagem));
    }

    if (name === 'Wagner') {

        mensagem = {
            nome: name,
            texto: "Olá a todos sou o Wagner"
        };

        stompClient.send("/app/tempo/real/mensagem", {}, JSON
            .stringify(mensagem));
    }
}

function sendMessage(event) {

    var messageContent = document.querySelector('#chatMessage').value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            nome: name,
            texto: document.querySelector('#chatMessage').value,
            type: 'CHAT'
        };

        stompClient.send("/app/tempo/real/mensagem", {}, JSON
            .stringify(chatMessage));
        document.querySelector('#chatMessage').value = '';
    }
    event.preventDefault();
}

function getEncomendas(payload) {
    var message = JSON.parse(payload.body);
    console.log(message);
}

function getReceiv(payload) {

    var message = JSON.parse(payload.body);
    console.log(message);
}


function getReceived(payload) {

    var message = JSON.parse(payload.body);
    console.log(message);
}

