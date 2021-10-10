<template>
    <div class="container-fluid">
        <div class="banner">
            <img src="../assets/images/banner.gif" alt="" width="100%" />
        </div>

        <div class="container">
            <div class="contain-link">
                <div class="hover column">
                    <a href="/">
                        <figure>
                            <img
                                src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/08/247251-0080_1-629x800.jpeg"
                            />
                        </figure>
                        <div class="overlay-link"></div>
                        <span>OUR BLOG</span>
                    </a>

                    <a href="/shop">
                        <figure>
                            <img
                                src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/08/589864-5295_1-629x800.jpeg"
                            />
                        </figure>
                        <div class="overlay-link"></div>
                        <span>SHOP NOW</span>
                    </a>

                    <a href="/">
                        <figure>
                            <img
                                src="https://fzi4k1gk2dw3t0fqy18sw8qi-wpengine.netdna-ssl.com/wp-content/uploads/2013/08/602779-0083_1-629x800.jpeg"
                            />
                        </figure>
                        <div class="overlay-link"></div>
                        <span>ABOUT US</span>
                    </a>
                </div>
            </div>

            <div class="contain-slider">
                <div class="slider-title">
                    <span>WEEKLY FEATURED PRODUCTS</span>
                    <hr />
                </div>
                <splide :options="options" :slides="products">
                    <splide-slide v-for="p in products" :key="p.slug">
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
                                /></a>

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
                                                (
                                                    p.price -
                                                    (p.price * p.sale) / 100
                                                )
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                            }}
                                        </p>
                                        <p class="price-box" v-else>
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
                                /></a>
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
                                                (
                                                    p.price -
                                                    (p.price * p.sale) / 100
                                                )
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                            }}
                                        </p>
                                        <p class="price-box" v-else>
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
                                    </div>
                                </div>
                            </a>
                        </div>
                    </splide-slide>
                </splide>
            </div>

            <div class="contain-slider">
                <div class="slider-title">
                    <span>NEW PRODUCTS</span>
                    <hr />
                </div>
                <splide :options="options" :slides="newProducts">
                    <splide-slide v-for="p in newProducts" :key="p.slug">
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
                                /></a>

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
                                                (
                                                    p.price -
                                                    (p.price * p.sale) / 100
                                                )
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                            }}
                                        </p>
                                        <p class="price-box" v-else>
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
                                /></a>
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
                                                (
                                                    p.price -
                                                    (p.price * p.sale) / 100
                                                )
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                            }}
                                        </p>
                                        <p class="price-box" v-else>
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
                                    </div>
                                </div>
                            </a>
                        </div>
                    </splide-slide>
                </splide>
            </div>

            <div class="contain-slider">
                <div class="slider-title">
                    <span>BROWSE OUR CATEGORIES</span>
                    <hr />
                </div>
                <splide :options="options" :slides="categories">
                    <splide-slide v-for="c in categories" :key="c.title">
                        <a :href="'/' + c.title" class="box">
                            <div class="slide-img">
                                <img :src="c.image" />
                                <a href="/" class="category-btn">
                                    <p>{{ c.title }}</p>
                                    <p v-if="c.qty > 1">{{ c.qty }} PRODUCTS</p>
                                    <p v-else>{{ c.qty }} PRODUCT</p>
                                </a>
                            </div>
                        </a>
                    </splide-slide>
                </splide>
            </div>
            <div class="information">
                <div class="contain-info">
                    <p><i class="fas fa-check"></i></p>
                    <p>FREE SHIPPING ON ALL ORDRES</p>
                    <p>
                        Get Free Shipping on all orders over $75 and free
                        returns to our UK returns centre! Items are dispatched
                        from the US and will arrive in 5-8 days.
                    </p>
                </div>

                <div class="contain-info">
                    <p><i class="far fa-heart"></i></p>
                    <p>AMAZING CUSTOMER SERVICE</p>
                    <p>
                        Get Free Shipping on all orders over $75 and free
                        returns to our UK returns centre! Items are dispatched
                        from the US and will arrive in 5-8 days.
                    </p>
                </div>

                <div class="contain-info">
                    <p><i class="fas fa-star"></i></p>
                    <p>NO CUSTOMS OR DUTY FEES!</p>
                    <p>
                        We pay these fees so you don’t have to! The total billed
                        at checkout is the final amount you pay, inclusive of
                        VAT, with no additional charges at the time of delivery!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { mapState } from "vuex";

export default {
    created() {
        this.options = {
            type: "loop",
            perMove: 1,
            rewind: true,
            autoWidth: true,
            gap: "1rem",
            pagination: false,
            cover: true,
        };
    },
    async mounted() {
        await this.$store.dispatch("loadProducts");
        await this.$store.dispatch("loadNewProducts");
        await this.$store.commit("SET_CATEGORIES");
    },
    computed: {
        ...mapState(["products", "newProducts", "categories"]),
    },
    async data() {
        return {};
    },
    components: {
        Splide,
        SplideSlide,
    },
    methods: {
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

<style lang="scss">
.container-fluid {
    .banner {
        width: 100%;
        float: left;
    }
    .container {
        width: 70%;
        margin: 0 15%;
        float: left;
        padding: 0;
        .contain-link {
            .overlay-link {
                background-color: #cdcdcd;
                display: block;
                position: absolute;
                height: 200px;
                width: 100%;
                bottom: 0;
                opacity: 0.2;
            }
            .column:last-child {
                padding-top: 30px;
                padding-bottom: 30px;
            }
            .column::after {
                content: "";
                clear: both;
                display: block;
            }
            .column a {
                position: relative;
                float: left;
                width: 31%;
                height: 200px;
                margin-right: 3.5%;
            }
            .column a:last-child {
                margin-right: 0;
            }
            .column a span {
                position: absolute;
                bottom: 80px;
                display: block;
                width: 100%;
                color: white;
                font-size: 21px;
                font-weight: 700;
                text-decoration: none;
                text-align: center;
            }
            figure {
                width: 100%;
                height: 200px;
                padding: 0;
                background: #fff;
                overflow: hidden;
                z-index: 1;
            }

            /* Zoom In #1 */
            .hover figure img {
                width: 400px;
                -webkit-transform: scale(1);
                transform: scale(1);
                -webkit-transition: 0.3s;
                transition: 0.3s;
            }
            .hover a:hover img {
                -webkit-transform: scale(1.1);
                transform: scale(1.1);
            }
        }

        .slider-title {
            margin-bottom: 50px;
            hr {
                height: 3px;
                color: #555555;
                font-weight: 700;
            }
            span {
                font-size: 20px;
                font-weight: 700;
                color: #555555;
                position: relative;
                display: block;
                background-color: white;
                text-align: center;
                padding: 0 20px;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
                top: 30px;
                z-index: 1;
            }
        }
        .splide__slide {
            .box {
                .slide-img {
                    height: 300px;
                    width: 250px;
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
        .information {
            margin: 70px 0;
            width: 100%;
            float: left;
            .contain-info {
                width: calc(100% / 3);
                float: left;
                text-align: center;
                i {
                    color: #b6b6b6;
                    font-size: 18px;
                    border: 2px solid #b6b6b6;
                    border-radius: 50%;
                    padding: 10px;
                }
                p {
                    width: 100%;
                }
                p:nth-child(2) {
                    font-size: 16px;
                    font-weight: 700;
                    color: #555;
                }
                p:last-child {
                    font-size: 16px;
                    font-weight: 400;
                    color: #777;
                }
            }
            .contain-info:first-child {
                padding-right: calc(2.5% - 1px);
            }
            .contain-info:nth-child(2) {
                padding-right: calc(2.5%);
                padding-left: calc(2.5%);
                border-left: solid 1px #b6b6b6;
                border-right: solid 1px #b6b6b6;
            }
            .contain-info:last-child {
                padding-left: calc(2.5% - 1px);
            }
            .contain-info:hover {
                i {
                    color: #fff;
                    background-color: #b6b6b6;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .container-fluid {
        .container {
            min-width: calc(100% - 10px);
            margin: 0;
            padding-left: 10px;
            .contain-link {
                .overlay-link {
                    height: 300px;
                }
                .column a {
                    width: 100%;
                    height: 300px;
                    margin-bottom: 10px;
                }
                .hover figure img {
                    width: 110%;
                }
                figure {
                    height: 300px;
                }
                .column a span {
                    bottom: 120px;
                }
            }
        }
    }
}
</style>
