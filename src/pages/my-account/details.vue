<template>
    <div class="container-fluid">
        <v-text-field
            label="Name *"
            placeholder="Enter your name"
            type="text"
            v-model="user.name"
        ></v-text-field>
        <v-text-field
            label="Email Address *"
            placeholder="Enter your email"
            type="text"
            v-model="user.email"
        ></v-text-field>
        <div class="title">
            Password Change
            <hr>
        </div>
        <v-text-field
            label="Current password (leave blank to leave unchanged)"
            placeholder="Enter your password"
            type="text"
            v-model="currentPassword"
        ></v-text-field>
        <v-text-field
            label="New password (leave blank to leave unchanged)"
            placeholder="Enter your new password"
            type="text"
            v-model="password"
        ></v-text-field>
        <v-text-field
            label="Confirm password"
            placeholder="Re-enter your new password"
            type="text"
            v-model="confirmPassword"
        ></v-text-field>
        <button @click="updateUser()">SAVE CHANGE</button>
        <div class="errors" v-for="e in errors" :key="e">
            <p>{{e}}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Details",
    mounted() {
        this.localUser = JSON.parse(window.localStorage.currentUser);

        this.$store.dispatch("loadUserById", this.localUser.id);
    },
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {
            password : "",
            currentPassword: "",
            confirmPassword : "",
            errors: [],
        };
    },
    methods: {
        updateUser() {
            this.errors = [];
            if(this.password == null) this.password = ""
            if(this.currentPassword == null) this.currentPassword = ""
            if(this.confirmPassword == null) this.confirmPassword = ""

            if(this.password != this.confirmPassword) {
                this.errors.push("Confirm password must be the same as new password")
            } else if(this.password == this.currentPassword && this.password != "") {
                this.errors.push("Password mustn't be the same as current password")
            } else {
                let newUser = {
                    email: this.user.email,
                    name: this.user.name,
                    password: this.password,
                    currentPassword : this.currentPassword,
                }
                let localUser = JSON.parse(window.localStorage.currentUser);
                this.$store.dispatch("updateUser", {userId: localUser.id, newUser: newUser})
                    .then((response) => {
                        if(response.message == true) {
                            alert("Your account is updated!")
                            this.$router.go(0)
                        } else {
                            this.errors.push(response.message)
                        }
                    })
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.container-fluid{
    button {
        background-color: #446084;
        color: white;
        width: 160px;
        display: block;
        padding: 8px 15px;
        margin-bottom: 20px;
    }
    button:hover {
        background-color: #37436c;
    }
    .errors {
        color: red;
        font-size: 14px;
    }
}
</style>
