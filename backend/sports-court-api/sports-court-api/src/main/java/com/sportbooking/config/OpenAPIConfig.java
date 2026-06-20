package com.sportbooking.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.Contact;


@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sports Court Booking API")
                        .version("1.0.0")
                        .description("Sistema para la gestión de reservas de canchas deportivas. " +
                                "Resuelve la desorganización de horarios y duplicidad de reservas.")
                        .contact(new Contact()
                                .name("Rodrigo Alexander Aguilar De Evian\n" +
                                        "Samuel Timoteo Cortez Hernandez\n" +
                                        "Luis Daniel Contreras Rivera\n" +
                                        "Katherine Tatiana Hernandez Hernandez\n" +
                                        "Josue Alexander Najarro Cardoza")
                                .email("CourtBooking@gmail.com")
                                .url("https://CourtBooking.com")));
    }
}