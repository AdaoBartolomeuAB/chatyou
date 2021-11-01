package com.chatyou.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;
import java.util.Objects;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {


    private String port;

    private String host;

    private String clientLogin;

    private String clientPasscode;

    @Autowired
    public WebSocketConfiguration( @Value("${spring.rabbitmq.port}") String port,
                                  @Value("${spring.rabbitmq.host}") String host, @Value("${rabbitmq.clientLogin}") String clientLogin,
                                  @Value("${rabbitmq.clientPasscode}") String clientPasscode) {
        this.port = port;
        this.host = host;
        this.clientLogin = clientLogin;
        this.clientPasscode = clientPasscode;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api-chatyou");
        registry.addEndpoint("/api-chatyou").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry
                .enableStompBrokerRelay("/topic")
                .setRelayHost(host)
                .setRelayPort(Integer.parseInt(port))
                .setClientLogin(clientLogin)
                .setClientPasscode(clientPasscode)
                .setSystemLogin(clientLogin)
                .setSystemPasscode(clientPasscode);
        registry.setApplicationDestinationPrefixes("/app");
    }

    /*
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {

                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                List tokenList = Objects.requireNonNull(accessor).getNativeHeader("X-Authorization");

                String token = null;
                if (tokenList != null && tokenList.size() > 0) {
                    token = String.valueOf(tokenList.get(0));
                }

                Authentication authentication = usuarioDetalhesServico.getAuthenticationFromToken(token);

                if (StompCommand.CONNECT.equals(accessor.getCommand()) && authentication != null) {
                    accessor.setUser(authentication);
                }

                return message;
            }
        });
    }*/
}
