<template>
    <header>
        <div class="nav">
            <!-- Nav PC -->
            <label for="nav-mobile-input" class="navbar_btn">
                <i class="fa fa-bars"></i>
            </label>

            <div class="navbar-logo">
                <router-link to="/"
                    ><img src="../../assets/images/logo.png" alt=""
                /></router-link>
            </div>

            <nav class="nav__pc">
                <ul class="nav__list">
                    <li>
                        <router-link to="/" class="nav__link">HOME</router-link>
                    </li>
                    <li>
                        <router-link to="/shop" class="nav__link"
                            >SHOP</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/" class="nav__link">BLOG</router-link>
                    </li>
                </ul>
            </nav>
            <div class="navbar-cart">
                <router-link to="/cart" class="nav__link" title="cart">
                    <span>CART / ${{ getSubToTal() }}</span>
                    <label class="count-cart">{{ cart.length }}</label>
                    <img src="../../assets/images/shopping-bag-icon.png"
                /></router-link>

                <div class="contain_small_cart">
                    <div class="arrow"></div>
                    <div class="cart_items" v-if="cart.length > 0">
                        <div v-for="(item, index) in cart" :key="index">
                            <div class="item">
                                <img :src="item.product.gallery[0]" alt="" />
                                <p class="item_name">{{ item.product.name }}</p>
                                <p>
                                    <span class="item_qty">{{
                                        item.quantity
                                    }}</span>
                                    x
                                    <span class="item_price"
                                        >${{ item.product.price }}</span
                                    >
                                </p>

                                <v-icon
                                    @click.prevent="removeItem(index)"
                                    class="remove-btn"
                                    >mdi-close-circle-outline</v-icon
                                >
                            </div>
                        </div>
                        <p class="cart_subtotal">
                            Subtotal: ${{ getSubToTal() }}
                        </p>
                    </div>
                    <p v-else class="text-center">No products in the cart.</p>
                </div>
            </div>
            <div class="nav-account">
                <span v-if="isLoggedIn">
                    <div @click.prevent="logoutUser">LOGOUT</div>
                </span>
                <span v-else>
                    <router-link to="/my-account">LOGIN </router-link>
                </span>
            </div>
            <input
                id="nav-mobile-input"
                type="checkbox"
                class="nav__input"
                hidden
            />

            <label for="nav-mobile-input" class="nav__overlay"></label>

            <div class="nav__mobile">
                <label for="nav-mobile-input" class="nav__mobile-close">
                    <i class="fa fa-times"></i>
                </label>
                <ul class="nav__mobile-list">
                    <li>
                        <router-link to="/" class="nav__mobile-link"
                            >HOME</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/shop" class="nav__mobile-link"
                            >SHOP</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/" class="nav__mobile-link"
                            >BLOG</router-link
                        >
                    </li>
                    <li v-if="isLoggedIn">
                        <div
                            class="nav__mobile-link"
                            @click.prevent="logoutUser"
                        >
                            LOGOUT
                        </div>
                    </li>
                    <li v-else>
                        <router-link to="/my-account" class="nav__mobile-link"
                            >LOGIN</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
    created() {
        this.localUser = JSON.parse(window.localStorage.currentUser);
        if (this.localUser !== this.currentUser) {
            window.localStorage.currentUser = JSON.stringify({});
        }
    },
    mounted() {
        this.$store.commit("SET_CART");
    },
    computed: {
        ...mapState(["currentUser", "cart"]),

        isLoggedIn() {
            if (this.currentUser.name) {
                return true;
            } else {
                return false;
            }
        },
    },
    data() {
        return {
            newCart: [],
        };
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("logoutUser");
            this.$router.go(0);
        },
        getSubToTal() {
            let subToTal = 0;
            if (this.cart.length > 0) {
                this.cart.forEach((item) => {
                    subToTal += item.product.price * item.quantity;
                });
            }
            return subToTal;
        },
        removeItem(index) {
            let newCart = JSON.parse(window.localStorage.cart);
            newCart.splice(index, 1);
            window.localStorage.cart = JSON.stringify(newCart);
            this.$store.commit("SET_CART");
        },
    },
};
</script>

<style lang="scss">
header {
    width: 100%;
    height: 90px;
    position: fixed;
    top: 0;
    background-color: white;
    z-index: 1;
    .nav {
        width: 70%;
        margin: 0 15%;
        height: 90px;
        display: block;
        font-size: 14px;
        color: #777777;
        font-weight: 700;

        .nav-account {
            line-height: 90px;
            float: right;
            margin-right: 14px;
            a {
                color: rgba(17, 17, 17, 0.85);
            }
        }
        .navbar_btn {
            display: none;
            color: #7d7d7d;
            float: left;
            font-size: 24px;
        }

        .navbar-logo {
            display: block;
            line-height: 90px;
            float: left;
            img {
                width: 200px;
                height: 45px;
            }
        }

        .nav__pc {
            line-height: 90px;
            float: left;
            .nav__list {
                display: flex;
                justify-content: flex-start;
                li {
                    margin-left: 20px;
                    .nav__link {
                        font-size: 14px;
                        color: #777777;
                        font-weight: 700;
                    }
                }
            }
        }

        .navbar-cart {
            float: right;
            line-height: 90px;
            right: 15%;

            .nav__link {
                font-size: 14px;
                color: #777777;
                font-weight: 700;
                span {
                    position: relative;
                    padding: 10px;
                    border-left: 1px solid #f5f5f5;
                }
                img {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 6px;
                }
                .count-cart {
                    position: relative;
                    top: 3px;
                    left: 19px;
                }
            }
            .contain_small_cart {
                display: none;
                box-shadow: 2px 2px 2px 2px #888888;
                width: 300px;
                position: absolute;
                z-index: 1;
                background-color: white;
                top: 65px;
                right: 210px;
                overflow-y: auto;
                max-height: 600px;
                .cart_items {
                    width: 95%;
                    float: left;
                    margin: 20px 2.5%;
                    .item {
                        width: 100%;
                        float: left;
                        padding: 10px 0;
                        border-bottom: #888888 solid 1px;
                        max-height: 90px;
                        img {
                            width: 60px;
                            height: 70px;
                            float: left;
                        }
                        p {
                            width: calc(95% - 90px);
                            float: left;
                            line-height: 25px;
                            margin: 0 0 0 10px;
                        }
                        .remove-btn {
                            width: 20px;
                            height: 20px;
                            color: #ccc;
                            margin-bottom: 20px;
                            cursor: pointer;
                        }
                        .remove-btn:hover {
                            color: black;
                        }
                    }
                }
                .cart_subtotal {
                    border-bottom: #888888 solid 1px;
                    min-width: 95%;
                    text-align: center;
                    line-height: 35px;
                    float: left;
                }
                .arrow {
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid #888;
                    position: relative;
                    top: 60px;
                    right: 40px;
                    z-index: 50 !important;
                }
            }
            .nav__link:hover + .contain_small_cart,
            .contain_small_cart:hover {
                display: block;
            }
        }

        .nav__overlay {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            display: none;
            z-index: 2;
            animation: fadeIn linear 0.3;
        }

        .nav__mobile {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 260px;
            max-width: 100vw;
            background-color: white;
            color: #bababa;
            font-weight: 700;
            font-size: 13px;
            transform: translateX(-100%);
            opacity: 0;
            transition: transform linear 0.2s, opacity linear 0.2s;
            z-index: 3;
            .nav__mobile-close {
                width: 28px;
                height: 28px;
            }

            .nav__mobile-list {
                padding: 0;
                margin-top: 24px;
                height: 54px;
                li {
                    line-height: 54px;
                }
            }

            .nav__mobile-link {
                color: #bababa;
                text-decoration: none;
                display: block;
                padding-left: 24px;
                border-top: 1px solid #f5f5f5;
            }
            .nav__mobile-link:last-child {
                border-bottom: 1px solid #f5f5f5;
            }

            .nav__mobile-link:hover {
                background-color: #f5f5f5;
                color: rgba(17, 17, 17, 0.85);
            }
        }

        .nav__input:checked ~ .nav__overlay {
            display: block;
        }

        .nav__input:checked ~ .nav__mobile {
            transform: translateX(0%);
            opacity: 1;
        }
    }
}

@media (max-width: 1024px) {
    header {
        .nav {
            width: 100%;
            margin: 0;
            display: flex;
            justify-content: space-between;
            .nav__pc {
                display: none;
            }
            .navbar-cart {
                margin-right: 2%;
                span {
                    display: none;
                }
            }
            .navbar_btn {
                line-height: 90px;
                display: block;
                margin-left: 2%;
            }
            .nav-account {
                display: none;
            }
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
