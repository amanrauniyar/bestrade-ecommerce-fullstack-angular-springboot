package org.perscholas.amanrauniyar.bestrade;

import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.perscholas.amanrauniyar.bestrade.entity.User;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest()
public class JUnitTests {

	@Test // Positive Test Result Expected
	void posTestCorrectUserEmail() {
		User u = new User(2, "xyz@gmail.com", "xyz", "xyz");
		assertNotNull(u);
		assertEquals("xyz@gmail.com", u.getEmailId());
	}

	@Test // Positive Test Result Expected
	void posTestIncorrectUserEmail() {
		User u = new User(6, "kim@aol.com", "kim", "aol");
		assertNotNull(u);
		assertNotEquals(("aman@outlook.com"), u.getEmailId());
	}

	@Test // Positive Test Result Expected
	void posTestCorrectUserName() {
		User u = new User(4, "ar@aol.com", "ar", "aol");
		assertNotNull(u);
		assertEquals("ar", u.getUserName());
	}

	@Test // Positive Test Result Expected
	void posTestIncorrectUserName() {
		User u = new User(3, "test@aol.com", "test", "aol");
		assertNotNull(u);
		assertNotEquals("aol", u.getUserName());
	}

	@Test // Negative Test Result Expected
	void negTestCorrectUserEmail() {
		User u = new User(5, "michael@aol.com", "michael", "mike");
		assertNotNull(u);
		assertEquals("simon@gmail.com", u.getEmailId());
	}

	@Test // Negative Test Result Expected
	void negTestIncorrectUserEmail() {
		User u = new User(0, "shahzad@yahoo.com", "hzad", "shah");
		assertNotNull(u);
		assertNotEquals(("shahzad@yahoo.com"), u.getEmailId());
	}

	@Test // Negative Test Result Expected
	void negTestCorrectUserName() {
		User u = new User(6, "kim@aol.com", "kim", "aol");
		assertNotNull(u);
		assertEquals("aol", u.getUserName());
	}

	@Test // Negative Test Result Expected
	void negTestIncorrectUserName() {
		User u = new User(9, "abc@gmail.com", "abc", "cba");
		assertNotNull(u);
		assertNotEquals("abc", u.getUserName());
	}

}