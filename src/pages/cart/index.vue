<template>
    <div class="container">
        <hr />
        <div class="contain-cart" v-if="cart.length > 0">
            <div class="cart_left">
                <table>
                    <tr class="title">
                        <th>PRODUCT</th>
                        <th class="text-center">PRICE</th>
                        <th class="text-center">QUANTITY</th>
                        <th class="text-right">SUBTOTAL</th>
                    </tr>
                    <tr v-for="(item, index) in cart" :key="index">
                        <td class="item_info">
                            <v-icon
                                @click.native="removeItem(index)"
                                class="remove-btn"
                                >mdi-close-circle-outline</v-icon
                            >
                            <a
                                v-if="
                                    item.product.categories.length > 1 &&
                                    item.product.slug != 'woo-logo'
                                "
                                :href="
                                    '/shop/' +
                                    item.product.categories[0].toLowerCase() +
                                    '/' +
                                    item.product.categories[1].toLowerCase() +
                                    '/' +
                                    item.product.slug
                                "
                            >
                                <img :src="item.product.gallery[0]" alt="" />
                                <p>
                                    <span>{{ item.product.name }}</span>

                                    <span class="stockMs"
                                        >{{ stockMessage[index] }}
                                    </span>
                                </p>
                            </a>
                            <a
                                v-else
                                :href="
                                    '/shop/' +
                                    item.product.categories[0].toLowerCase() +
                                    '/' +
                                    item.product.slug
                                "
                            >
                                <img :src="item.product.gallery[0]" alt="" />
                                <p>
                                    <span>{{ item.product.name }}</span>

                                    <span class="stockMs"
                                        >{{ stockMessage[index] }}
                                    </span>
                                </p>
                            </a>
                        </td>
                        <td class="price">
                            <p class="price-box">
                                ${{
                                    item.product.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </td>
                        <td class="contain_qty">
                            <button
                                class="minus-btn"
                                @click="removequantity(index)"
                            >
                                -
                            </button>
                            <input
                                class="quantity"
                                type="number"
                                name="quantity"
                                required
                                min="1"
                                v-model="item.quantity"
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            />
                            <button
                                class="plus-btn"
                                @click="addquantity(index)"
                                v-if="
                                    stockMessage[index] == '' &&
                                    item.product.stock != item.quantity
                                "
                                enabled
                            >
                                +
                            </button>
                            <button
                                class="plus-btn opacity-50"
                                @click="addquantity(index)"
                                v-else
                                disabled
                            >
                                +
                            </button>
                        </td>
                        <td class="subToTal">
                            ${{
                                getSubToTal(index)
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </td>
                    </tr>
                    <tr class="contain-btn">
                        <td colspan="2">
                            <a href="/shop"
                                ><v-icon class="arrow-left"
                                    >mdi-arrow-left</v-icon
                                >RETURN TO SHOP</a
                            >
                        </td>
                    </tr>
                </table>
            </div>

            <div class="cart_right">
                <table>
                    <tr>
                        <th colspan="2" class="text-left">CART TOTALS</th>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td class="text-right bold">
                            ${{
                                getCartSubToTal()
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td v-if="ship == 0" class="text-right">
                            <p>Enter your address to view shipping options.</p>
                            <p>Calculate shipping</p>
                        </td>
                        <td v-else class="text-right">
                            ${{
                                ship
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td class="text-right bold">
                            ${{
                                (getCartSubToTal() + ship)
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <a class="checkout-btn" href="/checkout"
                                >PROCEED TO CHECKOUT</a
                            >
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="contain-cart empty" v-else>
            <p>Your cart is currently empty.</p>
            <a href="/shop">RETURN TO SHOP</a>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    mounted() {
        this.$store.commit("SET_CART");
        this.stockMessage = [];
        this.setStockMS();
    },
    computed: {
        ...mapState(["cart"]),
    },
    data() {
        return {
            ship: 0,
            stockMessage: [],
        };
    },
    methods: {
        addquantity(index) {
            if (this.cart[index].quantity < this.cart[index].product.stock) {
                this.cart[index].quantity += 1;
                window.localStorage.cart = JSON.stringify(this.cart);
            }
            if (this.cart[index].quantity == this.cart[index].product.stock) {
                this.stockMessage[index] = "This product is out of stock";
            }
        },
        removequantity(index) {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity -= 1;
                window.localStorage.cart = JSON.stringify(this.cart);
            }
            if (this.cart[index].quantity != this.cart[index].product.stock) {
                this.stockMessage[index] = "";
            }
        },
        getSubToTal(index) {
            let subToTal =
                this.cart[index].product.price * this.cart[index].quantity;
            return Math.round(subToTal * 100) / 100;
        },
        getCartSubToTal() {
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
        setStockMS() {
            this.stockMessage = [];
            this.cart.forEach((c) => {
                if (c.product.stock != c.quantity) this.stockMessage.push("");
                else this.stockMessage.push("This product is out of stock");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 72%;
    margin: 0 14%;
    padding: 0;
    hr {
        margin: 0;
        padding: 0;
    }
    .contain-cart {
        margin-top: 55px;
        .cart_left {
            width: 62.5%;
            padding-right: 30px;
            margin-bottom: 25px;
            border-right: #ccc solid 2px;
            float: left;
            table {
                width: 100%;
                th {
                    color: #777;
                    font-size: 15px;
                    font-weight: 600;
                    border-bottom: 3px solid #888;
                }
                tr {
                    border-bottom: 1px solid #888;
                    .item_info {
                        padding-top: 17.5px;
                        padding-bottom: 17.5px;
                        img,
                        p {
                            float: left;
                        }
                        img {
                            width: 80px;
                            height: 90px;
                        }
                        p {
                            margin: 0 0 0 15px;
                            line-height: 90px;
                            font-size: 14px;
                            font-weight: 400;
                            color: #111;
                            max-height: 90px;
                            position: relative;
                            .stockMs {
                                color: red;
                                font-size: 14px;
                                font-weight: 400;
                                position: absolute;
                                width: 260px;
                                display: block;
                                top: 30px;
                            }
                        }
                        .remove-btn {
                            float: left;
                            line-height: 90px;
                            margin-right: 15px;
                            font-size: 24px;
                            color: #ccc;
                            cursor: pointer;
                        }
                        .remove-btn:hover {
                            color: black;
                        }
                    }
                    .price {
                        font-size: 14px;
                        font-weight: 600;
                        color: #111;
                        text-align: center;
                        p {
                            margin: 0;
                            line-height: 90px;
                            padding: 0 10px;
                        }
                    }
                    .contain_qty {
                        text-align: center;
                        width: 101px;
                        .minus-btn,
                        .plus-btn {
                            width: 28px;
                            height: 45px;
                            background-color: #f9f9f9;
                            border: solid 1px #ccc;
                            float: left;
                        }
                        .quantity {
                            outline: none;
                            width: 45px;
                            height: 45px;
                            float: left;
                            border: solid 1px #ccc;
                            text-align: center;
                        }
                    }
                    .subToTal {
                        text-align: right;
                        font-size: 14px;
                        font-weight: 600;
                        color: #111;
                    }
                }
                .contain-btn {
                    border: none;

                    td {
                        a {
                            margin-top: 17.5px;
                            margin-bottom: 17.5px;
                            color: #446084;
                            background-color: white;
                            font-size: 14px;
                            font-weight: bold;
                            display: block;
                            max-width: fit-content;
                            padding: 8px 16px;
                            border: 3px solid #446084;
                            .arrow-left {
                                color: #446084;
                                margin-right: 10px;
                            }
                        }
                        a:hover {
                            background-color: #446084;
                            color: white;
                            .arrow-left {
                                color: white;
                            }
                        }
                    }
                }
            }
        }
        .cart_right {
            width: 35%;
            margin-left: 2.5%;
            float: left;
            table {
                margin: 5px 0 0 0;
                width: 100%;
                th {
                    color: #777;
                    font-size: 15px;
                    font-weight: 600;
                    border-bottom: 3px solid #888;
                    padding-bottom: 5px;
                }
                tr {
                    border-bottom: 1px solid #888;
                    td {
                        padding: 10px 0;
                        font-size: 14px;
                        font-weight: 400;
                        color: #777;
                        p {
                            line-height: 25px;
                            margin: 0;
                            padding: 0;
                        }
                        .checkout-btn {
                            color: white;
                            font-weight: 600;
                            font-size: 16px;
                            background-color: #d26e4b;
                            display: block;
                            text-align: center;
                            padding: 10px 0;
                            margin-top: 20px;
                        }
                        .checkout-btn:hover {
                            background-color: #a95a3d;
                        }
                    }

                    .bold {
                        color: black;
                        font-weight: bold;
                    }
                }
                tr:last-child {
                    border: none;
                }
            }
        }
    }
}
.empty {
    text-align: center;
    font-size: 16px;
    p {
        font-weight: 400;
        color: #777;
        margin-top: 90px;
        margin-bottom: 30px;
    }
    a {
        font-weight: 600;
        color: white;
        background-color: #446084;
        padding: 13px 20px;
    }
}
</style>
