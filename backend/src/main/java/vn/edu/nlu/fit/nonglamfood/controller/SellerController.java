package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "SELLER OK";
    }

}