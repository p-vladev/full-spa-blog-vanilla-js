import { api } from "../services/api";
import { router } from "../router/Router";

export default class {

    async render() {
        return `
        <div class="auth-container">
            <form id="signup-form" class="auth-form">
                <h2>Create Account</h2>
                
                <div class="form-group">
                    <label for="username">First name</label>
                    <input type="text" id="username" name="firstName" placeholder="First name" required>
                </div>

                <div class="form-group">
                    <label for="username">Second name</label>
                    <input type="text" id="username" name="secondName" placeholder="Second name" required>
                </div>
                
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Choose a username" required>
                </div>

                <div class="form-group">
                    <label for="reg-email">Email Address</label>
                    <input type="email" id="reg-email" name="email" placeholder="Enter your email" required>
                </div>

                <div class="form-group">
                    <label for="reg-password">Password</label>
                    <input type="password" id="reg-password" name="password" placeholder="Create a password" required>
                </div>

                <button type="submit" class="btn-submit">Sign Up</button>

                <div class="form-footer">
                    <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
            </form>
        </div>
        `;
    }

    async after_render () {
        const form = document.getElementById("signup-form");

        form.addEventListener("submit", async e => {
            e.preventDefault();
            e.stopPropagation();

            try {
                const formData = Object.fromEntries(new FormData(form));
                const userData = await api.GetData(`/users?email=${formData.email}`);
    
                if (userData.length > 0) return alert("Email is already registred!");
    
                const currentUser = {
                    ...formData,
                    role: "user"
                }
                
                const res = await api.PostData("/users", currentUser);
                    
                localStorage.setItem("currentUser", 
                    JSON.stringify({
                        id: res.id,
                        username: res.username,
                        firstName: res.firstName,
                        secondName: res.secondName,
                        email: res.email,
                        role: res.role
                    })
                );
    
                router.NavigateTo("/");
            } catch (error) {
                alert("Something gone wrong...");
                console.error(error);
            }
        });
    }
}