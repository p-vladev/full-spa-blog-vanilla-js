export default class {

    async init () {
        let userData;

        try {
            userData = localStorage.getItem('currentUser');
            // console.log(userData);
        } catch (error) {
            console.error(error);
        } finally {
            if(userData !== undefined && userData !== null) this.isLoggedIn = true;
        }
    }

    async render () {
        await this.init();

        return `
            <div class="hero">
                <h1>Welcome to BlogsOnline</h1>
                <p>Discover insightful articles and stories.</p>
                <div class="hero-actions">
                    ${this.isLoggedIn 
                        ?   `<p>Have something to share?</p>
                            <p>
                                <a class="hero-btn-fill" href="/blogs/new">Create a Blog</a> or <a class="hero-btn-empt" href="/profile">View Profile</a>
                            </p>
                            ` 
                        :   `<p>Start your journey today!</p>
                            <p>
                                <a class="hero-btn-fill" href="/login">Login</a> or <a class="hero-btn-empt" href="/signup">Register</a>
                            </p>`
                    }
                </div>
            </div>
        `;
    }
}