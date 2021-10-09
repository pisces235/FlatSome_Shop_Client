<template>
    <div class="container-fluid">
        <div class="account__title">
            <div class="text-center">MY ACCOUNT</div>
        </div>

        <div class="contain-form">
            <div class="contain-login">
                <div class="login-title">LOGIN</div>

                <form @submit.prevent="login">
                    <div class="form-group">
                        <label>Email address*</label>
                        <input
                            type="text"
                            id="login_email"
                            v-model="login_email"
                            autocomplete="off"
                        />
                    </div>

                    <div class="form-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            id="login_password"
                            v-model="login_password"
                            autocomplete="off"
                        />
                    </div>

                    <div class="form-group">
                        <button type="submit">LOGIN</button>
                    </div>

                    <p>
                        <router-link to="/" class="lost-password-link"
                            >Lost your password?</router-link
                        >
                    </p>
                </form>
            </div>

            <div class="contain-register">
                <div class="login-title">REGISTER</div>

                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="name">Full name*</label>
                        <input type="text" id="name" v-model="name" />
                    </div>

                    <div class="form-group">
                        <label for="email">Email address*</label>
                        <input
                            type="text"
                            id="email"
                            v-model="email"
                            autocomplete="off"
                        />
                    </div>

                    <div class="form-group">
                        <label for="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            v-model="password"
                            autocomplete="off"
                        />
                    </div>

                    <p>
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        <router-link to="/" class="privacy-policy-link"
                            >privacy policy</router-link
                        >.
                    </p>

                    <div class="form-group">
                        <button type="submit">REGISTER</button>
                    </div>
                    <div v-for="e in registerErrors" :key="e">
                        <p style="color: red">{{ e }}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    components: {},
    data() {
        return {
            email: "",
            password: "",
            name: "",
            login_email: "",
            login_password: "",
            loginErrors: [],
            registerErrors: [],
        };
    },
    methods: {
        async login() {
            let loginInfo = {
                email: this.login_email,
                password: this.login_password,
            };
            let response = await this.$store.dispatch("loginUser", loginInfo);
            if (response.error) {
                alert(response.error);
            } else {
                window.localStorage.isLoggedIn = JSON.stringify(true);
                window.location.pathname = "/";
            }
        },
        register() {
            this.registerErrors = [];
            if (this.name == null || this.name == "") {
                this.registerErrors.push("Full name must be require!");
            }
            if (this.email == null || this.email == "") {
                this.registerErrors.push("Email must be require!");
            }
            if (this.password == null || this.password == "") {
                this.registerErrors.push("Password must be require!");
            }
            if (this.registerErrors.length == 0) {
                let newUser = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                };
                this.$store.dispatch("register", newUser).then((response) => {
                    if (response.message == true) {
                        alert("You have successfully registered an account!");
                        this.$router.go(0);
                    } else {
                        this.registerErrors.push(response.message);
                    }
                });
            }
        },
    },
};
</script>

<style lang="scss">
.container-fluid {
    padding: 0 !important;
    margin-bottom: 20px;
    .account__title {
        height: 65px;
        background-color: #f7f7f7;
        .text-center {
            line-height: 65px;
            color: #555555;
            font-weight: 700;
            font-size: 27px;
        }
    }
    .contain-form {
        width: 70%;
        margin-left: 15%;
        display: flex;
        justify-content: flex-start;
        .contain-login {
            width: 47%;
            padding-right: 3%;
            .login-title {
                margin-top: 35px;
                color: #555555;
                font-weight: 700;
                font-size: 20px;
            }
            form {
                .form-group {
                    margin-top: 14px;
                    label {
                        color: #222222;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    input {
                        -webkit-text-size-adjust: 100%;
                        -webkit-tap-highlight-color: transparent;
                        --primary-color: #446084;
                        -webkit-font-smoothing: antialiased;
                        -webkit-box-direction: normal;
                        font: inherit;
                        overflow: visible;
                        touch-action: manipulation;
                        margin-bottom: 1em;
                        box-sizing: border-box;
                        border: 1px solid #ddd;
                        padding: 0 0.75em;
                        height: 2.507em;
                        font-size: 0.97em;
                        border-radius: 0;
                        max-width: 100%;
                        width: 100%;
                        vertical-align: middle;
                        color: #333;
                        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                        appearance: none;
                    }
                    button {
                        background-color: #446084;
                        color: #fff;
                        padding: 10px 20px;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    button:hover {
                        background-color: #3d5779;
                    }
                }
                p {
                    margin-top: 10px;
                    .lost-password-link {
                        color: #111111 !important;
                    }
                }
            }
        }
        .contain-register {
            padding-left: 3%;
            width: 47%;
            border-left: 1px solid #ececec;
            .login-title {
                margin-top: 35px;
                color: #555555;
                font-weight: 700;
                font-size: 20px;
            }
            form {
                .form-group {
                    margin-top: 14px;
                    label {
                        color: #222222;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    input {
                        -webkit-text-size-adjust: 100%;
                        -webkit-tap-highlight-color: transparent;
                        --primary-color: #446084;
                        -webkit-font-smoothing: antialiased;
                        -webkit-box-direction: normal;
                        font: inherit;
                        overflow: visible;
                        touch-action: manipulation;
                        margin-bottom: 1em;
                        box-sizing: border-box;
                        border: 1px solid #ddd;
                        padding: 0 0.75em;
                        height: 2.507em;
                        font-size: 0.97em;
                        border-radius: 0;
                        max-width: 100%;
                        width: 100%;
                        vertical-align: middle;
                        color: #333;
                        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                        appearance: none;
                    }
                    button {
                        background-color: #446084;
                        color: #fff;
                        padding: 10px 20px;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    button:hover {
                        background-color: #3d5779;
                    }
                }
                p {
                    margin-top: 10px;
                    color: #777777;
                    font-size: 14px;
                    .privacy-policy-link {
                        color: #111111 !important;
                    }
                }
            }
        }
    }
}
</style>
