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

  authForm.classList.toggle("active");

  // Only update text/icons on desktop
  if (window.innerWidth > 768) {
    const isSignup = authForm.classList.contains("active");
    const elements = {
      icon: authSwitch.querySelector(".switch-icon i"),
      text: authSwitch.querySelector(".switch-text"),
      desc: authSwitch.querySelector(".switch-description"),
      btn: authSwitch.querySelector(".site-btn"),
    };

    elements.icon.className = isSignup ? "fa fa-sign-in" : "fa fa-user-plus";
    elements.text.textContent = isSignup
      ? "Already have an account?"
      : "Don't have an account?";
    elements.desc.textContent = isSignup
      ? "Sign in to access your existing account and continue shopping"
      : "Join us to unlock exclusive features and personalized shopping experience";
    elements.btn.textContent = isSignup ? "Sign In" : "Sign Up";
  }
}

async function handleAuth(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const authType = form.getAttribute("data-auth-type");

  if (authType === "register" && data.password !== data.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const config = {
    login: {
      url: "/api/users/login",
      body: { email: data.email, password: data.password },
    },
    register: {
      url: "/api/users",
      body: { ...data, confirmPassword: undefined },
    },
  }[authType];

  if (!config) return;

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config.body),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `${authType} failed`);

    if (authType === "login") {
      localStorage.setItem("accessToken", result.accessToken);
      const decoded = decodeToken(result.accessToken);
      if (decoded) updateNavbar(decoded.name);
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
    const decoded = decodeToken(token);
    if (decoded) updateNavbar(decoded.name);
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
