package com.chatyou.controlador;

import com.chatyou.modelo.Mensagem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.Principal;

@Slf4j
@Controller
public class TempoRealControlador {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public TempoRealControlador(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;

    }

    @MessageMapping("/tempo/real/mensagem")
    public void atualizarLocalizacaoEstafeta(Mensagem mensagem)  {

        log.info("WebSocket Controlador-> mensagem enviada" +mensagem.toString());

        simpMessagingTemplate.convertAndSend( "/topic/mensagem", mensagem);
    }
}
