import { api } from "../services/api";
import { router } from "../router/Router"

export default class {

    async render () {
        return `
            <div class="auth-container">
                <form class="auth-form" id="login-form">
                    <h2>Welcome Back</h2>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    </div>

                    <button type="submit" id="btn-submit" class="btn-submit">Log In</button>

                    <div class="form-footer">
                        <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    </div>
                </form>
            </div>
        `;
    }

    async after_render () {
        const form = document.getElementById("login-form");

        form.addEventListener("submit", async e => {
            e.preventDefault();
            e.stopPropagation();

            try {
                const formData = new FormData(form);
                const {email, password} = Object.fromEntries(formData);
                const userData = await api.GetData(`/users?email=${email}`);
    
                if (userData.length === 0) return alert("Email is invalid or not registred!");
                if (userData[0].password !== password) return alert("Password is invalid!");
    
                const currentUser = {
                    id: userData[0].id,
                    username: userData[0].username,
                    firstName: userData[0].firstName,
                    secondName: userData[0].secondName,
                    email: userData[0].email,
                    role: userData[0].role
                }
    
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
                router.NavigateTo("/");
            } catch (error) {
                alert("Something gone wrong...");
                console.error(error);
            }
        });
    }
}