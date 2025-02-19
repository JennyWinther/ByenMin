package com.MinBy.Auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/login")
public class AuthController {

    // http://localhost:8080/login/grantAccess

    // client: 464221173855-c1ilfvchf53v2ob73j8bu7q9j0bv0te5.apps.googleusercontent.com
    //secret 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

    //link to oauth signin? https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8080/login/grantAccess&response_type=code&client_id=464221173855-c1ilfvchf53v2ob73j8bu7q9j0bv0te5.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline

    @GetMapping("/grantAccess")
    public String grantCode(@RequestParam("code") String code, @RequestParam("scope") String scope, @RequestParam("authuser") String authUser, @RequestParam("prompt") String prompt) {
        return processGrantCode(code);
    }

}
