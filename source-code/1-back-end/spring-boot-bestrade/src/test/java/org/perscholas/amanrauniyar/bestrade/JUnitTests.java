package org.perscholas.amanrauniyar.bestrade;

import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.perscholas.amanrauniyar.bestrade.entity.User;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest()
public class JUnitTests {

	@Test
	void testPositiveUserEmail() {
		User u = new User(2, "xyz@gmail.com", "xyz", "xyz");
		assertNotNull(u);
		assertEquals("xyz@gmail.com", u.getEmailId());
	}

	@Test
	void testNegativeUserEmail() {
		User u = new User(2, "poonam@gmail.com", "xyz", "xyz");
		assertNotNull(u);
		assertNotEquals(("aman@gmail.com"), u.getEmailId());
	}

	@Test
	void testPositiveUserName() {
		User u = new User(2, "xyz@gmail.com", "xyz", "xyz");
		assertNotNull(u);
		assertEquals("xyz", u.getUserName());
	}

	@Test
	void testNegativeUserName() {
		User u = new User(3, "test@aol.com", "test", "aol");
		assertNotNull(u);
		assertNotEquals("aol", u.getUserName());
	}

}