package com.example.saytraicay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.awt.Desktop;
import java.net.URI;

@SpringBootApplication
public class SaytraicayApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(SaytraicayApplication.class, args);
		openBrowser("http://localhost:8080/");
	}

	private static void openBrowser(String url) {
		try {
			if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
				Desktop.getDesktop().browse(new URI(url));
			} else {
				System.out.println("Mở trình duyệt bằng tay tại: " + url);
			}
		} catch (Exception e) {
			System.err.println("Không mở được trình duyệt tự động: " + e.getMessage());
		}
	}

}
