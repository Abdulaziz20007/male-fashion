function toggleForm() {
  const authForm = document.querySelector(".auth-form");
  const authSwitch = document.querySelector(".auth-switch");

  if (window.innerWidth <= 768) {
    authForm.classList.toggle("active");
  } else {
    const switchIcon = authSwitch.querySelector(".switch-icon i");
    const switchText = authSwitch.querySelector(".switch-text");
    const switchDescription = authSwitch.querySelector(".switch-description");
    const switchButton = authSwitch.querySelector(".site-btn");

    authForm.classList.toggle("active");

    if (authForm.classList.contains("active")) {
      switchIcon.className = "fa fa-sign-in";
      switchText.textContent = "Already have an account?";
      switchDescription.textContent =
        "Sign in to access your existing account and continue shopping";
      switchButton.textContent = "Sign In";
    } else {
      switchIcon.className = "fa fa-user-plus";
      switchText.textContent = "Don't have an account?";
      switchDescription.textContent =
        "Join us to unlock exclusive features and personalized shopping experience";
      switchButton.textContent = "Sign Up";
    }
  }
}
