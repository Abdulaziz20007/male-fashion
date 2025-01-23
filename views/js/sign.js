function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

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

async function handleAuth(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const authType = form.getAttribute("data-auth-type");

  const endpoints = {
    login: {
      url: "/api/users/login",
      body: {
        email: data.email,
        password: data.password,
      },
    },
    register: {
      url: "/api/users",
      body: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
    },
    refresh: {
      url: "/api/users/refresh",
    },
  };

  const config = endpoints[authType];
  if (!config) return;

  // For registration, check passwords match
  if (authType === "register" && data.password !== data.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config.body),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `${authType} failed`);
    }

    if (authType === "login") {
      localStorage.setItem("accessToken", result.accessToken);
      const decodedToken = decodeToken(result.accessToken);
      if (decodedToken) {
        updateNavbar(decodedToken.name);
      }
      window.location.href = "/";
    } else {
      alert("Registration successful! Please login.");
      toggleForm();
    }
  } catch (error) {
    console.error(`${authType} error:`, error);
    alert(error.message);
  }
}

function checkAuthStatus() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      updateNavbar(decodedToken.name);
    }
  }
}

function updateNavbar(userName) {
  document.querySelectorAll(".auth-link").forEach((link) => {
    link.innerHTML = `
      ${userName} 
      <a href="#" onclick="handleLogout(event)" style="margin-left: 10px;">(Logout)</a>
    `;
  });
}

async function handleLogout(event) {
  event.preventDefault();

  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) throw new Error("Logout failed");

    localStorage.removeItem("accessToken");
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
    alert(error.message);
  }
}

document.addEventListener("DOMContentLoaded", checkAuthStatus);
