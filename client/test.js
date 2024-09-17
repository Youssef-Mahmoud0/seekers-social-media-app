function isValidGmail(email) {
    // Define the regular expression for a valid Gmail email
    const gmailPattern = /^[^\s@]+@gmail\.com$/;
    
    // Test the email against the pattern
    return gmailPattern.test(email);
  }
  
  // Example usage:
const email = "a_1@gmail.com";
console.log(isValidGmail(email)); // true or false based on the validity