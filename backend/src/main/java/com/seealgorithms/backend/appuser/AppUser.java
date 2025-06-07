package com.seealgorithms.backend.appuser;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

// user itself in the application
@Getter
@Setter
@EqualsAndHashCode // generates equals() and hashCode()
@NoArgsConstructor // generates constructor with no paramaters. fields initialized (null, 0 , false, etc.)
@Entity
public class AppUser implements UserDetails {

    // registres a sequence generator and tells jpa how to talk to database sequence
    @SequenceGenerator(
            name = "student_sequence", // JPA identifier for generator
            sequenceName = "student_sequence", // name of database sequence sequence
            allocationSize = 1 // controls how many ids are fetched from the sequence at once
    )
    // marks field as primary key column
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE, // use database sequence for primary key generation
            generator = "student_sequence" // points to above @sequencegenerator
    )
    private Long id;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    @Enumerated(EnumType.STRING) // because AppUserRoler is an enum
    private AppUserRole appUserRole;
    private Boolean locked;
    private Boolean enabled;

    // constructor without id
    public AppUser(String firstName,
                   String username,
                   String lastName,
                   String email,
                   AppUserRole appUserRole
        )
    {
        this.firstName = firstName;
        this.lastName = username;
        this.password = password;
        this.email = email;
        this.appUserRole = appUserRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // stores authority of user
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority); // single element list, immutable
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
