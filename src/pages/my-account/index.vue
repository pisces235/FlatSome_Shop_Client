<template>
    <div class="container-fluid">
        <div class="account__title">
            <div class="text-left contain-title">
                <p>MY ACCOUNT</p>
                <p>{{ titlePage }}</p>
            </div>
        </div>
        <div class="container">
            <div class="contain-left">
                <div class="contain_img">
                    <img src="../../assets/images/account.png" alt="" />
                    <div class="name">{{ user.name }}</div>
                </div>
                <nav class="left-bar">
                    <ul>
                        <li><a href="/my-account">DASHBOARD</a></li>
                        <li><a href="/my-account/orders">ORDERS</a></li>
                        <li><a href="/my-account/addresses">ADDRESSES</a></li>
                        <li><a href="/my-account/account-details">ACCOUNT DETAILS</a></li>
                        <li><div @click.prevent="logoutUser">LOGOUT</div></li>
                    </ul>
                </nav>
            </div>
            <div class="contain-right">
                <div v-if="link == '/my-account'">
                    <p>Hello <b>{{user.name}}</b></p>
                    <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                    <div class="contain-btn">
                        <a href="/my-account/orders">Orders</a>
                        <a href="/my-account/addresses">Addresses</a>
                        <a href="/my-account/account-details">Account Details</a>
                    </div>
                </div>
                <div v-else>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "MyAccount",
    created() {
        if (JSON.parse(window.localStorage.currentUser) == {}) {
            this.$router.push("account");
        }
        this.link = window.location.pathname;
        if (this.link != "/my-account") {
            this.titlePage = this.link
                .replace("/my-account/", "")
                .toUpperCase();
        } else {
            this.titlePage = "DASHBOARD";
        }
    },
    mounted() {
        this.localUser = JSON.parse(window.localStorage.currentUser);

        this.$store.dispatch("loadUserById", this.localUser.id);
    },
    computed: {
        ...mapState(["user"]),
    },
    data() {
        return {};
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("logoutUser");
            this.isLoggedIn = false;
            window.localStorage.isLoggedIn = JSON.stringify(false)
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
.container-fluid {
    .account__title {
        background-color: #f7f7f7;
        height: fit-content;
        .text-left {
            color: #555555;
            font-weight: 700;
            font-size: 27px;
        }
        .contain-title {
            width: 70%;
            margin: 0 15%;
            padding: 10px 0;
            p {
                margin: 0;
                padding: 0;
            }
            p:last-child {
                font-weight: 400;
                font-size: 13px;
            }
        }
    }
    .container {
        width: 70%;
        margin: 20px 15%;
        .contain-left {
            width: 25%;
            float: left;
            border-right: 1px solid #ccc;
            .contain_img {
                display: flex;
                justify-content: flex-start;
                img {
                    width: 130px;
                }
                .name {
                    line-height: 90px;
                }
            }
            .left-bar {
                ul {
                    margin: 0;
                    padding: 0 0 20px 0;
                    li {
                        border-bottom: 1px solid #ccc;
                        a, div {
                            font-size: 13px;
                            font-weight: 600;
                            color: #ccc;
                            padding: 15px 0;
                            display: block;
                            cursor: pointer;
                        }
                        a:hover, div:hover {
                            border-right: 3px solid #446084;
                            color: #111;
                        }
                    }
                    li:last-child {
                        border: none;
                    }
                }
            }
        }
        .contain-right {
            width: 75%;
            float: left;
            padding-left: 30px;
            p {
                font-size: 16px;
                font-weight: 400;
                color: gray;
            }
            .contain-btn {
                display: flex;
                justify-content: space-evenly;
                a {
                    display: block;
                    width: 240px;
                    border: 1px solid #111;
                    color: #111;
                    font-size: 21px;
                    font-weight: 400;
                    text-align: center;
                    border-radius: 5px;
                    padding: 12px 0;
                }
                a:hover {
                    background-color: #111;
                    color: white;
                }
            }
        }
    }
}
</style>
