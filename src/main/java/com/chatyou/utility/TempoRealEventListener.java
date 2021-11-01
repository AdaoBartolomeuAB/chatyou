package com.chatyou.utility;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

@Slf4j
@Component
public class TempoRealEventListener {

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        log.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisConnectListener(SessionDisconnectEvent event) {
        log.info(String.format("Disconnection in web socket %s", Objects.requireNonNull(event.toString())));
    }

}
