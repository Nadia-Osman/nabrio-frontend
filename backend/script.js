(() => {
  // ---------------------- DOM Elements ----------------------
  // Get references to buttons and message area
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const messageDiv = document.getElementById("message");

  // ---------------------- Toggle Forms ----------------------
  // Switch between login and signup forms
  function toggleForms() {
    document.getElementById("login-form").classList.toggle("active");
    document.getElementById("signup-form").classList.toggle("active");
    clearMessage();       // clear any old success/error messages
    validateForm();       // re-check form validation
    checkLoginFields();   // check login form fields
  }

  // ---------------------- Clear Messages ----------------------
  // Reset the message div before showing a new one
  function clearMessage() {
    messageDiv.textContent = '';
    messageDiv.style.color = 'green';  // default color for success
  }

  // ---------------------- Password Validation ----------------------
  // Validate strength of the signup password
  function validatePassword() {
    const password = document.getElementById("signup-password").value;

    // Conditions for password strength
    const checks = {
      isLength: password.length >= 8,           // at least 8 chars
      hasUpper: /[A-Z]/.test(password),         // at least one uppercase
      hasLower: /[a-z]/.test(password),         // at least one lowercase
      hasNumber: /\d/.test(password),           // at least one number
      hasSpecial: /[!@#$%^&*]/.test(password)   // at least one special char
    };

    // Update checklist UI dynamically
    document.getElementById("length").className = checks.isLength ? "valid" : "invalid";
    document.getElementById("uppercase").className = checks.hasUpper ? "valid" : "invalid";
    document.getElementById("lowercase").className = checks.hasLower ? "valid" : "invalid";
    document.getElementById("number").className = checks.hasNumber ? "valid" : "invalid";
    document.getElementById("special").className = checks.hasSpecial ? "valid" : "invalid";

    // Return true if all conditions are met
    return Object.values(checks).every(Boolean);
  }

  // ---------------------- Signup Form Validation ----------------------
  function validateForm() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const isPasswordValid = validatePassword();

    // Enable signup button only if all fields are filled and password is strong
    signupBtn.disabled = !(name && email && isPasswordValid);
  }

  // ---------------------- Login Form Validation ----------------------
  function checkLoginFields() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Enable login button only when email & password are filled
    loginBtn.disabled = !(email && password);
  }

  // ---------------------- Signup Function ----------------------
  function signup() {
    const name = document.getElementById("signup-name").value.trim();

    // Show success message
    messageDiv.textContent = `✅ Signup successful! Welcome, ${name}`;
    messageDiv.style.color = 'green';

    // Reset signup form after success
    document.getElementById("signup-form").reset();
    validateForm();

    // Redirect to menu.html after 1.5 seconds
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1500);
  }

  // ---------------------- Login Function ----------------------
  function login() {
    const email = document.getElementById("login-email").value.trim();

    // Show success message
    messageDiv.textContent = "✅ Login successful! Redirecting...";
    messageDiv.style.color = 'green';

    // Redirect to menu.html after 1.5 seconds
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1500);
  }

  // ---------------------- Expose Functions Globally ----------------------
  // Needed so we can call them from HTML buttons
  window.toggleForms = toggleForms;
  window.validateForm = validateForm;
  window.checkLoginFields = checkLoginFields;
  window.signup = signup;
  window.login = login;
})();
