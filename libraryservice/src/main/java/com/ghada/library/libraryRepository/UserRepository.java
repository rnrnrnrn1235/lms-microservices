/*package com.ghada.library.libraryRepository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ghada.library.libraryEntity.User;

@Repository
public interface UserRep extends MongoRepository<User, String> {

    com.ghada.library.libraryEntity.User findByEmail(String email);

    com.ghada.library.libraryEntity.User findByName(String name);

    User findByRole(String string);

}*/

package com.ghada.library.libraryRepository;

import java.util.List;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ghada.library.libraryModel.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username); //use username to find user details
    List<User> findByUsernameIgnoreCase(String username);
} 