<template>
    <div class="container-fluid">
        <div v-if="user.orders.length > 0">
            <table v-for="(o, i) in user.orders" :key="i">
                <tr>
                    <th colspan="4" class="text-center border-0">
                        <h3>Order #{{ i + 1 }}</h3>
                    </th>
                </tr>
                <tr>
                    <th>PRODUCT</th>
                    <th class="text-center">PRICE</th>
                    <th class="text-center">QUANTITY</th>
                    <th class="text-center">SUBTOTAL</th>
                </tr>
                <tr v-for="(item, index) in o.cart" :key="index">
                    <td class="item_info">
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
                            </p>
                        </a>
                    </td>
                    <td class="price">
                        <p class="price-box text-center d-block w-100">
                            ${{
                                item.product.price
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                        </p>
                    </td>
                    <td class="contain_qty">
                        <p class="text-center d-block w-100">
                            {{ item.quantity }}
                        </p>
                    </td>
                    <td class="subToTal text-center">
                        ${{ item.product.price * item.quantity }}
                    </td>
                </tr>
                <tr>
                    <td class="text-left subToTal">TOTAL:</td>
                    <td></td>
                    <td></td>
                    <td class="subToTal text-center block">
                        ${{
                            o.total
                                .toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span class="text-left subToTal confirm">CONFIRM</span>

                        <p v-if="o.confirm == true" class="green">
                            This order was confirmed!
                        </p>
                        <p v-else class="red">
                            This order have not confirm yet!
                        </p>
                    </td>
                    <td class="text-center subToTal">PAID</td>
                    <td class="text-center">
                        <p v-if="o.payment == true" class="green text-center">
                            You was paid this order!
                        </p>
                        <p v-else class="red text-center">
                            You have not pay yet!
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            <a href="/shop" class="a">BROWSE PRODUCTS</a>
            <p>No order has been made yet.</p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Orders",
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
};
</script>

<style lang="scss" scoped>
.container-fluid {
    div {
        p {
            line-height: 45px;
            float: left;
            margin-left: 15px;
        }
        .a {
            background-color: #446084;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 600;
            float: left;
        }
        .a:hover {
            background-color: #3d5779;
            color: #fff;
        }
        table {
            width: 100%;
            margin-bottom: 50px;
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
                .subToTal {
                    text-align: right;
                    font-size: 14px;
                    font-weight: 600;
                    color: #111;
                }
                .block {
                    line-height: 60px;
                }
            }
            td {
                .green,
                .red {
                    line-height: 60px;
                    margin: 0;
                    padding: 0;
                    background-color: white !important;
                }
                .green {
                    color: green;
                }
                .red {
                    color: red;
                }
                .confirm {
                    line-height: 60px;
                    float: left;
                    margin-right: 30px;
                }
            }
        }
    }
}
</style>
