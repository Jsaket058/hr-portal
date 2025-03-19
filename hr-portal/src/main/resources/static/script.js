document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    const loginBox = document.querySelector(".login-container");

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token if using JWT
            localStorage.setItem("token", data.token); // Adjust based on response structure
            loginBox.style.animation = "fadeOut 0.8s ease-in-out";
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect on success
            }, 800);
        } else {
            errorMessage.textContent = data.message || "Invalid email or password!";
            errorMessage.style.display = "block";
            loginBox.classList.add("shake");
            setTimeout(() => loginBox.classList.remove("shake"), 500);
        }
    } catch (error) {
        console.error("Error:", error);
        errorMessage.textContent = "Something went wrong. Try again!";
        errorMessage.style.display = "block";
    }
});
