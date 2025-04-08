package com.MinBy.Auth.UserDetails;

import com.MinBy.Auth.Bruker.BrukerDB;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;



public class CustomUserDetails implements UserDetails {
    private BrukerDB bruker;

    public CustomUserDetails(BrukerDB bruker) {
        this.bruker = bruker;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(bruker.getRoller().name()));
    }

    @Override
    public String getPassword() {
        return bruker.getPassord();
    }

    @Override
    public String getUsername() {
        return bruker.getBrukernavn();
    }

    public String getEmail(){ return bruker.getEmail(); }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
