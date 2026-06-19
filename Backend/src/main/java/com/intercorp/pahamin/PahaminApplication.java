package com.intercorp.pahamin;

import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class PahaminApplication {

	public static void main(String[] args) {
		SpringApplication.run(PahaminApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			// Seed Admin
			if (!userRepository.existsByEmail("admin@example.com")) {
				User admin = User.builder()
						.username("admin")
						.email("admin@example.com")
						.password(passwordEncoder.encode("admin123"))
						.role("ADMIN")
						.build();
				userRepository.save(admin);
				System.out.println("==================================================");
				System.out.println("DEFAULT ADMIN CREATED: admin@example.com / admin123");
				System.out.println("==================================================");
			}

			// Seed User
			if (!userRepository.existsByEmail("user@example.com")) {
				User user = User.builder()
						.username("user")
						.email("user@example.com")
						.password(passwordEncoder.encode("password123"))
						.role("USER")
						.build();
				userRepository.save(user);
				System.out.println("==================================================");
				System.out.println("DEFAULT USER CREATED: user@example.com / password123");
				System.out.println("==================================================");
			}
		};
	}
}
