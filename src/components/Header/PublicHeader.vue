<template>
    <header>
        <div class="nav">
            <!-- Nav PC -->
            <label for="nav-mobile-input" class="navbar_btn">
                <i class="fa fa-bars"></i>
            </label>

            <div class="hide">
                <v-icon class="icon-search">mdi-magnify</v-icon>
                <div class="contain-search">
                    <div class="contain-input">
                        <input
                            type="text"
                            name=""
                            id="search-input"
                            v-model="search"
                            @change="getSearchItems()"
                        />
                        <button @click="getSearchItems()">
                            <v-icon>mdi-magnify</v-icon>
                        </button>
                    </div>

                    <div
                        class="contain-item"
                        v-for="p in searchItems"
                        :key="p._id"
                    >
                        <a
                            :href="
                                '/shop/' +
                                p.categories[0].toLowerCase() +
                                '/' +
                                p.categories[1].toLowerCase() +
                                '/' +
                                p.slug
                            "
                            v-if="p.categories.length > 1"
                        >
                            <img :src="p.gallery[0]" alt="" />
                            <div class="name">
                                <span>{{ p.name }}</span>
                            </div>
                            <p class="price">
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </a>

                        <a
                            :href="
                                '/shop/' +
                                p.categories[0].toLowerCase() +
                                '/' +
                                p.slug
                            "
                            v-else
                        >
                            <img :src="p.gallery[0]" alt="" />
                            <div class="name">
                                <span>{{ p.name }}</span>
                            </div>
                            <p class="price">
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-logo">
                <a href="/"
                    ><img src="../../assets/images/logo.png" alt=""
                /></a>
            </div>

            <nav class="nav__pc">
                <ul class="nav__list">
                    <li>
                        <v-icon class="icon-search">mdi-magnify</v-icon>
                        <div class="contain-search">
                            <div class="contain-input">
                                <input
                                    type="text"
                                    name=""
                                    id="search-input"
                                    v-model="search"
                                    @change="getSearchItems()"
                                />
                                <button @click="getSearchItems()">
                                    <v-icon>mdi-magnify</v-icon>
                                </button>
                            </div>

                            <div
                                class="contain-item"
                                v-for="p in searchItems"
                                :key="p._id"
                            >
                                <a
                                    :href="
                                        '/shop/' +
                                        p.categories[0].toLowerCase() +
                                        '/' +
                                        p.categories[1].toLowerCase() +
                                        '/' +
                                        p.slug
                                    "
                                    v-if="p.categories.length > 1"
                                >
                                    <img :src="p.gallery[0]" alt="" />
                                    <div class="name">
                                        <span>{{ p.name }}</span>
                                    </div>
                                    <p class="price">
                                        ${{
                                            p.price
                                                .toFixed(2)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                        }}
                                    </p>
                                </a>

                                <a
                                    :href="
                                        '/shop/' +
                                        p.categories[0].toLowerCase() +
                                        '/' +
                                        p.slug
                                    "
                                    v-else
                                >
                                    <img :src="p.gallery[0]" alt="" />
                                    <div class="name">
                                        <span>{{ p.name }}</span>
                                    </div>
                                    <p class="price">
                                        ${{
                                            p.price
                                                .toFixed(2)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                        }}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="/" class="nav__link">HOME</a>
                    </li>
                    <li>
                        <a href="/shop" class="nav__link">SHOP</a>
                    </li>
                </ul>
            </nav>
            <div class="navbar-cart">
                <a href="/cart" class="nav__link" title="cart">
                    <span
                        >CART / ${{
                            getSubToTal()
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}</span
                    >
                    <label class="count-cart">{{ cart.length }}</label>
                    <img src="../../assets/images/shopping-bag-icon.png"
                /></a>

                <div
                    class="contain_small_cart"
                    v-bind:class="{ block: showCart }"
                >
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
                                        >${{
                                            item.product.price
                                                .toFixed(2)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                        }}</span
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
                            Subtotal: ${{
                                getSubToTal()
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </p>
                    </div>
                    <p v-else class="text-center">No products in the cart.</p>
                </div>
            </div>
            <div class="nav-account">
                <span v-if="isLoggedIn == true">
                    <div>
                        <a href="/my-account">MY ACCOUNT</a>
                        <nav class="dropdown">
                            <ul>
                                <li><a href="/my-account/orders">Orders</a></li>
                                <li>
                                    <a href="/my-account/addresses"
                                        >Addresses</a
                                    >
                                </li>
                                <li>
                                    <a href="/my-account/account-details"
                                        >Account details</a
                                    >
                                </li>
                                <li><div @click="logoutUser">Logout</div></li>
                            </ul>
                        </nav>
                    </div>
                </span>
                <span v-else>
                    <a href="/account">LOGIN </a>
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
                        <a href="/" class="nav__mobile-link">HOME</a>
                    </li>
                    <li>
                        <a href="/shop" class="nav__mobile-link">SHOP</a>
                    </li>
                    <li>
                        <a href="/" class="nav__mobile-link">BLOG</a>
                    </li>
                    <li v-if="isLoggedIn == true">
                        <a
                            href="/my-account"
                            class="nav__mobile-link show-dropdown"
                            >MY ACCOUNT</a
                        >
                        <nav class="dropdown">
                            <ul>
                                <li>
                                    <a
                                        href="/my-account/orders"
                                        class="nav__mobile-link"
                                        >Orders</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="/my-account/addresses"
                                        class="nav__mobile-link"
                                        >Addresses</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="/my-account/account-details"
                                        class="nav__mobile-link"
                                        >Account details</a
                                    >
                                </li>
                                <li>
                                    <div
                                        @click="logoutUser"
                                        class="nav__mobile-link"
                                    >
                                        Logout
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </li>
                    <li v-else>
                        <a href="/account" class="nav__mobile-link">LOGIN </a>
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
        if (typeof window.localStorage.currentUser != "undefined") {
            this.currentUser = JSON.parse(window.localStorage.currentUser);
        } else {
            window.localStorage.currentUser = JSON.stringify({});
        }

        if (this.currentUser.name) {
            window.localStorage.isLoggedIn = JSON.stringify(true);
            this.isLoggedIn = JSON.parse(window.localStorage.isLoggedIn);
        } else {
            window.localStorage.isLoggedIn = JSON.stringify(false);
            this.isLoggedIn = JSON.parse(window.localStorage.isLoggedIn);
        }
    },
    mounted() {
        this.$store.dispatch("loadProducts");
        this.$store.commit("SET_CART");
    },
    computed: {
        ...mapState(["cart", "products", "showCart"]),
    },
    data() {
        return {
            newCart: [],
            searchItems: [],
            search: "",
            isLoggedIn: false,
        };
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("logoutUser");
            this.isLoggedIn = false;
            window.localStorage.isLoggedIn = JSON.stringify(false);
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
        getSearchItems() {
            this.searchItems = [];
            if (this.search != "" && this.search != null) {
                this.products.forEach((product) => {
                    if (
                        product.name
                            .toLowerCase()
                            .includes(this.search.toLowerCase())
                    ) {
                        this.searchItems.push(product);
                    }
                });
            }
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
        .hide {
            display: none;
        }
        .nav-account {
            line-height: 90px;
            float: right;
            margin-right: 14px;
            position: relative;
            a {
                color: #7d7d7d;
            }
            .dropdown {
                display: none;
                position: absolute;
                top: 70px;
                opacity: 1 !important;
                background-color: white;
                ul {
                    margin: 0;
                    padding: 0;
                    box-shadow: 2px 2px 2px 2px #888888;
                    top: -30px;
                    width: 265px;
                    li {
                        border-bottom: 1px solid #ccc;
                        line-height: 40px;
                        margin: 0 20px;
                        a,
                        div {
                            display: block;
                            padding-left: 15px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .nav-account:hover .dropdown {
            display: block;
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
                    .icon-search {
                        cursor: pointer;
                        display: block;
                        line-height: 90px;
                    }
                    .contain-search {
                        display: none;
                        position: absolute;
                        background-color: white;
                        top: 67px;
                        max-width: 400px;
                        box-shadow: 2px 2px 2px 2px #888888;
                        padding: 20px;
                        overflow-y: auto;
                        z-index: 5;
                        .contain-input {
                            margin-bottom: 15px;
                            #search-input {
                                height: 35px;
                                width: calc(100% - 35px);
                                float: left;
                                outline: none;
                                border: solid 1px #ccc;
                                font-weight: 400;
                                font-size: 16px;
                            }
                            button {
                                width: 35px;
                                height: 35px;
                                background-color: #d26e4b;
                                display: block;
                                padding: 15px;
                                position: relative;
                                float: left;
                                i {
                                    color: white;
                                    position: absolute;
                                    top: 7px;
                                    left: 7px;
                                }
                            }
                            button:hover {
                                background-color: #a95a3d;
                            }
                        }

                        .contain-item {
                            width: 100%;
                            border-bottom: 1px solid #ccc;
                            float: left;
                            a {
                                color: #777;
                                img {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    float: left;
                                    margin: 10px 0 10px 0;
                                }
                                .name {
                                    float: left;
                                    line-height: 50px;
                                    margin: 10px 0 10px 10px;
                                }
                                .price {
                                    float: right;
                                    max-width: 60px;
                                    line-height: 50px;
                                    margin: 10px 0 10px 0;
                                    text-align: right;
                                }
                            }
                        }
                    }
                    .icon-search:hover ~ .contain-search,
                    .contain-search:hover {
                        display: block;
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
                .block {
                    display: block;
                }
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
                    .dropdown {
                        display: none;
                    }
                    .show-dropdown:hover ~ .dropdown,
                    .dropdown:hover {
                        display: block;
                    }
                }
            }

            .nav__mobile-link {
                color: #bababa;
                text-decoration: none;
                display: block;
                padding-left: 24px;
                border-top: 1px solid #f5f5f5;
                cursor: pointer;
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
        max-width: 100vw !important;
        .nav {
            width: 100%;
            margin: 0;
            display: flex;
            justify-content: space-between;
            .hide {
                display: block;
                line-height: 90px;
                width: 20px;
                margin: 0;
                padding: 0;
                .icon-search {
                    cursor: pointer;
                    display: block;
                    line-height: 90px;
                }
                .contain-search {
                    display: none;
                    position: absolute;
                    background-color: white;
                    top: 67px;
                    left: 30px;
                    max-width: 400px;
                    box-shadow: 2px 2px 2px 2px #888888;
                    padding: 20px;
                    overflow-y: auto;
                    z-index: 5;
                    .contain-input {
                        margin-bottom: 15px;
                        #search-input {
                            height: 35px;
                            width: calc(100% - 35px);
                            float: left;
                            outline: none;
                            border: solid 1px #ccc;
                            font-weight: 400;
                            font-size: 16px;
                        }
                        button {
                            width: 35px;
                            height: 35px;
                            background-color: #d26e4b;
                            display: block;
                            padding: 15px;
                            position: relative;
                            float: left;
                            i {
                                color: white;
                                position: absolute;
                                top: 7px;
                                left: 7px;
                            }
                        }
                        button:hover {
                            background-color: #a95a3d;
                        }
                    }

                    .contain-item {
                        width: 100%;
                        border-bottom: 1px solid #ccc;
                        float: left;
                        a {
                            color: #777;
                            img {
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                float: left;
                                margin: 10px 0 10px 0;
                            }
                            .name {
                                float: left;
                                line-height: 50px;
                                margin: 10px 0 10px 10px;
                            }
                            .price {
                                float: right;
                                max-width: 60px;
                                line-height: 50px;
                                margin: 10px 0 10px 0;
                                text-align: right;
                            }
                        }
                    }
                }
                .icon-search:hover ~ .contain-search,
                .contain-search:hover {
                    display: block;
                }
            }
            .nav__pc {
                display: none;
            }
            .navbar-cart {
                margin-right: 2%;
                span {
                    display: none;
                }
                .contain_small_cart {
                    right: 2.5%;
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
