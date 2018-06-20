package com.asterionix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

//  sudo java -jar  -Dspring.profiles.active=devel invite.jar 
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {
	 public static void main(String[] args) {
	        SpringApplication.run(Application.class, args);
	    }

}
