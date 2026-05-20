package org.cours.springdatarest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.cours.web.VoitureController;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SpringDataRestApplicationTests {

    @Autowired
    VoitureController voitureController;

    @Test
    void contextLoads() {
        assertThat(voitureController).isNotNull();
    }

}
