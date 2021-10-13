<template>
    <div class="contain-category">
        <div class="contain-filter">
            <div class="filter-price">
                <span>${{ filter_price[0] }}</span>
                <v-range-slider
                    v-model="filter_price"
                    :max="max"
                    :min="min"
                    class="align-center range"
                    color="black"
                    @change="getFilterProducts()"
                    @click="getFilterProducts()"
                >
                </v-range-slider>
                <span>${{ filter_price[1] }}</span>
            </div>
            <select
                name=""
                id="filter-type"
                v-model="filter_type"
                @click="getFilterProducts()"
            >
                {{
                    filter_type
                }}
                <option value="">Default sorting</option>
                <option value="up">Sorting by price: low to high</option>
                <option value="down">Sorting by price: high to low</option>
            </select>
        </div>
        <splide-slide
            v-for="p in newProducts"
            :key="p.slug"
            v-show="newProducts.length > 0"
        >
            <div class="box" v-if="p.categories.length > 1">
                <div class="slide-img">
                    <a
                        :href="
                            '/shop/' +
                            p.categories[0].toLowerCase() +
                            '/' +
                            p.categories[1].toLowerCase() +
                            '/' +
                            p.slug
                        "
                        ><img :src="p.gallery[0]" />
                        <img :src="p.gallery[1]" class="img-back"
                    />
                        <div class="sale" v-show="p.sale > 0">Sale!</div>
                    </a>

                    <button
                        class="add-cart-btn"
                        v-if="p.stock == 0"
                        disabled
                        style="opacity: 0.5"
                    >
                        Out of stock
                    </button>
                    <button
                        class="add-cart-btn"
                        v-else
                        @click.prevent="addToCart(p)"
                    >
                        Add to cart
                    </button>
                </div>
                <a
                    :href="
                        '/shop/' +
                        p.categories[0].toLowerCase() +
                        '/' +
                        p.categories[1].toLowerCase() +
                        '/' +
                        p.slug
                    "
                >
                    <div class="detail-box">
                        <div class="type">
                            <p class="categories-box">
                                {{ p.categories[0] }}
                            </p>
                            <p class="name-box">{{ p.name }}</p>
                            <p class="price-box" v-if="p.sale != 0">
                                <strike>
                                    ${{
                                        p.price
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }} </strike
                                >&nbsp; ${{
                                    (p.price - (p.price * p.sale) / 100)
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                            <p class="price-box" v-else>
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
            <div v-else class="box">
                <div class="slide-img">
                    <a
                        :href="
                            '/shop/' +
                            p.categories[0].toLowerCase() +
                            '/' +
                            p.slug
                        "
                    >
                        <img :src="p.gallery[0]" />
                        <img :src="p.gallery[1]" class="img-back"
                    />
                        <div class="sale" v-show="p.sale > 0">Sale!</div>
                    </a>
                    <button
                        class="add-cart-btn"
                        v-if="p.stock == 0"
                        disabled
                        style="opacity: 0.5"
                    >
                        Out of stock
                    </button>
                    <button
                        class="add-cart-btn"
                        v-else
                        @click.prevent="addToCart(p)"
                    >
                        Add to cart
                    </button>
                </div>
                <a
                    :href="
                        '/shop/' + p.categories[0].toLowerCase() + '/' + p.slug
                    "
                >
                    <div class="detail-box">
                        <div class="type">
                            <p class="categories-box">
                                {{ p.categories[0] }}
                            </p>
                            <p class="name-box">{{ p.name }}</p>
                            <p class="price-box" v-if="p.sale != 0">
                                <strike>
                                    ${{
                                        p.price
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }} </strike
                                >&nbsp; ${{
                                    (p.price - (p.price * p.sale) / 100)
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                            <p class="price-box" v-else>
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </splide-slide>
        <splide-slide v-for="p in filterProducts" :key="p._id">
            <div class="box" v-if="p.categories.length > 1">
                <div class="slide-img">
                    <a
                        :href="
                            '/shop/' +
                            p.categories[0].toLowerCase() +
                            '/' +
                            p.categories[1].toLowerCase() +
                            '/' +
                            p.slug
                        "
                        ><img :src="p.gallery[0]" />
                        <img :src="p.gallery[1]" class="img-back"
                    />
                        <div class="sale" v-show="p.sale > 0">Sale!</div>
                    </a>

                    <button
                        class="add-cart-btn"
                        v-if="p.stock == 0"
                        disabled
                        style="opacity: 0.5"
                    >
                        Out of stock
                    </button>
                    <button
                        class="add-cart-btn"
                        v-else
                        @click.prevent="addToCart(p)"
                    >
                        Add to cart
                    </button>
                </div>
                <a
                    :href="
                        '/shop/' +
                        p.categories[0].toLowerCase() +
                        '/' +
                        p.categories[1].toLowerCase() +
                        '/' +
                        p.slug
                    "
                >
                    <div class="detail-box">
                        <div class="type">
                            <p class="categories-box">
                                {{ p.categories[0] }}
                            </p>
                            <p class="name-box">{{ p.name }}</p>
                            <p class="price-box" v-if="p.sale != 0">
                                <strike>
                                    ${{
                                        p.price
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }} </strike
                                >&nbsp; ${{
                                    (p.price - (p.price * p.sale) / 100)
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                            <p class="price-box" v-else>
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
            <div v-else class="box">
                <div class="slide-img">
                    <a
                        :href="
                            '/shop/' +
                            p.categories[0].toLowerCase() +
                            '/' +
                            p.slug
                        "
                    >
                        <img :src="p.gallery[0]" />
                        <img :src="p.gallery[1]" class="img-back"
                    />
                        <div class="sale" v-show="p.sale > 0">Sale!</div>
                    </a>
                    <button
                        class="add-cart-btn"
                        v-if="p.stock == 0"
                        disabled
                        style="opacity: 0.5"
                    >
                        Out of stock
                    </button>
                    <button
                        class="add-cart-btn"
                        v-else
                        @click.prevent="addToCart(p)"
                    >
                        Add to cart
                    </button>
                </div>
                <a
                    :href="
                        '/shop/' + p.categories[0].toLowerCase() + '/' + p.slug
                    "
                >
                    <div class="detail-box">
                        <div class="type">
                            <p class="categories-box">
                                {{ p.categories[0] }}
                            </p>
                            <p class="name-box">{{ p.name }}</p>
                            <p class="price-box" v-if="p.sale != 0">
                                <strike>
                                    ${{
                                        p.price
                                            .toFixed(2)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                    }} </strike
                                >&nbsp; ${{
                                    (p.price - (p.price * p.sale) / 100)
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                            <p class="price-box" v-else>
                                ${{
                                    p.price
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </splide-slide>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    created() {},
    computed: {
        ...mapState(["products"]),
    },
    async mounted() {
        await this.$store.dispatch("loadProducts");
        this.getNewProducts();
    },
    data() {
        return {
            filter_type: "",
            min: 0,
            max: 10000,
            filter_price: [0, 10000],
            newProducts: [],
            filterProducts: [],
            search: "",
        };
    },
    methods: {
        getNewProducts() {
            let link = window.location.pathname;
            let linkArray = link.split(/[^A-Za-z0-9-]/);
            let search = linkArray.pop();
            let newProducts = [];
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].categories.length > 1) {
                    if (
                        search === this.products[i].categories[1].toLowerCase()
                    ) {
                        if (
                            this.products[i].slug != "woo-logo"
                        ) {
                            newProducts.push(this.products[i]);
                        }
                    }
                }
            }

            this.filterProducts = [];
            this.newProducts = newProducts;
        },
        getFilterProducts() {
            let link = window.location.pathname;
            let linkArray = link.split(/[^A-Za-z0-9-]/);
            let search = linkArray.pop();
            let newProducts = [];
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].categories.length > 1) {
                    if (
                        search === this.products[i].categories[1].toLowerCase()
                    ) {
                        if (
                            this.products[i].slug == "woo-logo" &&
                            this.products[i].categories.length > 1
                        ) {
                            this.products[i].categories.pop();
                        } else if (
                            this.products[i].price <= this.filter_price[1] &&
                            this.products[i].price >= this.filter_price[0]
                        ) {
                            newProducts.push(this.products[i]);
                        }
                    }
                }
            }

            if (this.filter_type == "up") {
                newProducts.sort(function (a, b) {
                    let x = a.price;
                    let y = b.price;
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
            }
            if (this.filter_type == "down") {
                newProducts.sort(function (a, b) {
                    let x = a.price;
                    let y = b.price;
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
                newProducts.reverse();
            }
            this.newProducts = [];
            this.filterProducts = newProducts;
        },
        addToCart(product) {
            if (product.sale != 0) {
                this.$store.dispatch("addToCart", {
                    product: {
                        ...product,
                        price:
                            product.price -
                            (product.price * product.sale) / 100,
                    },
                    quantity: 1,
                });
            } else {
                this.$store.dispatch("addToCart", {
                    product: product,
                    quantity: 1,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
strike {
    text-decoration: line-through !important;
    color: #ccc;
}
.contain-category {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .contain-filter {
        position: relative;
        top: 0;
        width: 100%;
        display: block;
        margin-bottom: 20px;
        #filter-type {
            min-width: 220px;
            height: 40px;
            float: right;
            outline: none;
            border: solid 1px #ccc;
            padding: 0 10px;
            font-size: 16px;
            font-weight: 400;
            color: #333;
        }
        .filter-price {
            width: 500px;
            float: left;
            span,
            .range {
                float: left;
                margin-right: 10px;
                line-height: 40px;
            }
            .range {
                width: 300px;
                margin-top: 3px;
            }
        }
    }
    .splide__slide {
        width: 30%;
        margin: 0 0 5% 3.3%;
        padding: 0;
        .box {
            .slide-img {
                height: 300px;
                width: 100%;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .img-back {
                    visibility: hidden;
                    display: block;
                    position: absolute;
                    bottom: 0;
                    transition: visibility 0.3s;
                }
                .add-cart-btn {
                    color: white;
                    background-color: #446084;
                    visibility: hidden;
                    display: block;
                    text-align: center;
                    line-height: 35px;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 0;
                    transition: visibility 0.3s, height 0.3s;
                }
                .category-btn {
                    background-color: white;
                    opacity: 0.9;
                    color: #555555;
                    text-align: center;
                    padding: 15px 0;
                    position: absolute;
                    bottom: 45px;
                    left: 0;
                    width: 100%;
                    p {
                        margin: 0;
                        padding: 0;
                    }
                    p:first-child {
                        font-size: 14px;
                        font-weight: 600;
                    }
                    p:last-child {
                        font-size: 10px;
                        font-weight: 400;
                    }
                }
                .sale {
                    background-color: #d26e4b;
                    border-radius: 50%;
                    position: absolute;
                    text-align:center;
                    padding: 10px 4px;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    top: 30px;
                    left: -5px;
                }
            }
            .detail-box {
                p {
                    margin-top: 10px;
                    margin-bottom: 0;
                }
                .categories-box {
                    font-size: 11px;
                    font-weight: 500;
                    color: #777777;
                }
                .name-box {
                    font-size: 14px;
                    font-weight: 400;
                    color: #111111;
                }
                .price-box {
                    font-size: 14px;
                    font-weight: 700;
                    color: black;
                }
            }
        }
        .box:hover .add-cart-btn,
        .box:hover .img-back {
            visibility: visible;
        }
        .box:hover .add-cart-btn {
            height: 35px;
        }
        .box:hover .category-btn {
            display: block;
            background-color: #446084;
            color: white;
        }
    }
}

@media (max-width: 1068px) {
    .contain-category {
        .splide__slide {
            margin: 0 1.65% 5% 1.65%;
            .box {
                .slide-img {
                    height: 100%;
                }
            }
        }
        .contain-filter {
            #filter-type {
                width: 30%;
                margin: 0 35%;
            }
            .filter-price {
                width: 60%;
                margin: 0 20%;
                float: left;
                span,
                .range {
                    float: left;
                    line-height: 40px;
                }
                .range {
                    width: 70%;
                    margin-top: 3px;
                }
                span {
                    width: 10%;
                }
            }
        }
    }
}
@media (max-width: 834px) {
    .contain-category {
        float: left;
        width: 100%;

        .contain-filter {
            #filter-type {
                width: 60%;
                margin: 0 20%;
            }
            .filter-price {
                width: 96%;
                margin: 0 2%;
                float: left;
                span,
                .range {
                    float: left;
                    line-height: 40px;
                    margin: 0;
                }
                .range {
                    width: 50%;
                    margin-top: 3px;
                }
                span {
                    width: calc(25% - 20px);
                    font-size: 9px;
                    text-align: right;
                    padding: 0 10px;
                }
                span:last-child {
                    text-align: left;
                }
            }
        }
    }
}
@media (max-width: 540px) {
    .contain-category {
        float: left;
        width: 100%;
        .splide__slide {
            margin: 0 2.5% 5% 2.5%;
            width: 45%;
        }
    }
}
</style>
