'use strict';

var welcomeForm = document.querySelector('#welcomeForm');
var dialogueForm = document.querySelector('#dialogueForm');
welcomeForm.addEventListener('submit', connect, true);
dialogueForm.addEventListener('submit', sendMessage, true);

var stompClient = null;
var name = null;
var token = null;

var localizacao = null;

function connect(event) {
    name = document.querySelector('#name').value.trim();

    if (name) {
        document.querySelector('#welcome-page').classList.add('hidden');
        document.querySelector('#dialogue-page').classList.remove('hidden');

        var socket = new SockJS('http://localhost:8086/api-entrega');

        stompClient = Stomp.over(socket);

        if (name === 'abu') {

            console.log("Adilson se conectou");

            token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwicGFwZWlzIjpbeyJhdXRob3JpdHkiOiJST0xFX0VTVEFGIn1dLCJpYXQiOjE2MjMzNDM1NTgsImV4cCI6MTYzMTIzMjk1OH0.GcTRn998QwsyyKjpsvZ8FLSPX2miJLJMCKoYdy0SDR8";
        }

        if (name === 'dono') {

            console.log("Dono da enomenda se conectou");

            token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5IiwicGFwZWlzIjpbeyJhdXRob3JpdHkiOiJST0xFX0RPTk9FTkNPTUVORCJ9XSwiaWF0IjoxNjIzMzQzMzc2LCJleHAiOjE2MzEyMzI3NzZ9.QUWVlqBRmrfg_x2gR_wMtRsvvKJvU2VXVzlnIZ4l1fA";
        }

        stompClient.connect({'X-Authorization': token}, connectionSuccess);
    }
    event.preventDefault();
}

function connectionSuccess() {

    console.log(name);

    stompClient.subscribe('/user/topic/encomenda', {}, getEncomendas);

    stompClient.subscribe('/user/topic/estafetas', {}, getReceived);

    stompClient.subscribe('/user/topic/notificacoes', {}, getReceiv);

    if (name === 'brian') {

        localizacao = {
            sender: name,
            latitude: -8.826279,
            longitude: 13.227614
        };

        stompClient.send("/app/tempo/real/estafeta", {}, JSON.stringify(localizacao));
    }

    if (name === 'abu') {

        console.log('Localização enviada');

        localizacao = {
            sender: name,
            latitude: -8.826263,
            longitude: 13.227362
        };

        stompClient.send("/app/tempo/real/estafeta", {}, JSON
            .stringify(localizacao));
    }

    if (name === 'wagner') {

        localizacao = {
            sender: name,
            latitude: 9.9999999,
            longitude: -8.8888888
        };

        stompClient.send("/app/tempo/real/estafeta", {}, JSON
            .stringify(localizacao));
    }


    if (name === 'dono') {

        var numroFatura = 103;
        console.log("Mensagem enviada do dono da encomenda");
        stompClient.send("/app/tempo/real/encomenda/" + numroFatura);
    }

    if (name === 'admin') {
        stompClient.send("/app/tempo/real/notificacoes");
    }

}

function sendMessage(event) {

    var messageContent = document.querySelector('#chatMessage').value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: name,
            content: document.querySelector('#chatMessage').value,
            type: 'CHAT'
        };

        stompClient.send("/chat.sendMessage", {}, JSON
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

