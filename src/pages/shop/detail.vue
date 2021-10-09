<template>
    <div class="contain-detail">
        <div class="contain-gallery">
            <img :src="imageSource" id="featured" />

            <div
                class="contain-thumbs"
                v-for="(p, index) in product.gallery"
                :key="index"
            >
                <img
                    :src="p"
                    class="thumbnail thumbnail_last"
                    @click="changeSource(p)"
                    v-if="index == product.gallery.length - 1"
                />
                <img
                    :src="p"
                    class="thumbnail"
                    @click="changeSource(p)"
                    v-else
                />
            </div>
        </div>
        <div class="contain-info">
            <p class="name">{{ product.name }}</p>
            <hr />
            <p class="price" v-if="product.price % 1 == 0">
                <sup>$</sup>{{ product.price }}.00
            </p>
            <p class="price" v-else><sup>$</sup>{{ product.price }}0</p>
            <p class="description" v-html="product.description"></p>
            <div class="contain-cart">
                <button class="minus-btn" @click="removequantity">-</button>
                <input
                    class="quantity"
                    type="number"
                    name="quantity"
                    required
                    min="1"
                    v-model="quantity"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                />
                <button class="plus-btn" @click="addquantity">+</button>
                <button
                    class="cart-btn"
                    v-if="product.stock == 0"
                    disabled
                    style="opacity: 0.5"
                >
                    OUT OF STOCK
                </button>
                <button class="cart-btn" v-else @click="addToCart()">
                    ADD TO CART
                </button>
            </div>
            <hr class="last_hr" />
            <p class="categories">
                Categories:
                <span v-for="(c, index) in product.categories" :key="c">
                    <span v-show="index == product.categories.length - 1"
                        >{{ c }}.</span
                    >
                    <span v-if="index < product.categories.length - 1"
                        >{{ c }},
                    </span>
                </span>
            </p>
        </div>
        <div class="description">
            <ul>
                <li
                    v-bind:class="{ border_top_li: isActiveDescription }"
                    @click="activeDescription"
                >
                    DESCRIPTION
                </li>
                <li
                    v-bind:class="{ border_top_li: isActiveReview }"
                    @click="activeReview"
                >
                    REVIEW
                </li>
            </ul>
            <div
                class="description"
                v-html="product.description"
                v-show="showDescription"
            ></div>
            <div class="review" v-show="showReview">
                <div
                    class="fb-comments"
                    data-href="https://flatsome-shop.netlify.app"
                    data-width=""
                    data-numposts="10"
                ></div>
            </div>
        </div>
        <div class="contain-related">
            <hr />
            <p class="title">RELATED PRODUCTS</p>
            <splide :options="options" :slides="relatedProducts">
                <splide-slide v-for="p in relatedProducts" :key="p.slug">
                    <a
                        v-if="p.categories.length > 1"
                        :href="
                            '/shop/' +
                            p.categories[0].toLowerCase() +
                            '/' +
                            p.categories[1].toLowerCase() +
                            '/' +
                            p.slug
                        "
                        class="box"
                    >
                        <div class="slide-img">
                            <img :src="p.gallery[0]" />
                            <img :src="p.gallery[1]" class="img-back" />
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
                                @click.prevent="additemToCart(p)"
                            >
                                Add to cart
                            </button>
                        </div>
                        <div class="detail-box">
                            <div class="type">
                                <p class="categories-box">
                                    {{ p.categories[0] }}
                                </p>
                                <p class="name-box">{{ p.name }}</p>
                                <p class="price-box">
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
                    <a
                        v-else
                        :href="'/shop/' + p.categories + '/' + p.slug"
                        class="box"
                    >
                        <div class="slide-img">
                            <img :src="p.gallery[0]" />
                            <img :src="p.gallery[1]" class="img-back" />
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
                                @click.prevent="addItemToCart(p)"
                            >
                                Add to cart
                            </button>
                        </div>
                        <div class="detail-box">
                            <div class="type">
                                <p class="categories-box">
                                    {{ p.categories[0] }}
                                </p>
                                <p class="name-box">{{ p.name }}</p>
                                <p class="price-box">
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
                </splide-slide>
            </splide>
        </div>
    </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { mapState } from "vuex";

export default {
    created() {
        this.link = window.location.href;
        this.options = {
            perMove: 1,
            rewind: true,
            autoWidth: true,
            gap: "1rem",
            pagination: false,
            cover: true,
        };
    },
    async mounted() {
        await this.$store.dispatch(
            "loadProductBySlug",
            this.$route.params.slug
        );
        await this.$store.dispatch("loadProducts");
        this.$store.commit("SET_RELATED_PRODUCTS", this.product);
        this.imageSource = this.product.gallery[0];
    },
    computed: {
        ...mapState(["product", "products", "relatedProducts"]),
    },
    components: {
        Splide,
        SplideSlide,
    },
    data() {
        return {
            imageSource: "",
            quantity: 1,
            isActiveDescription: true,
            isActiveReview: false,
            showDescription: true,
            showReview: false,
        };
    },
    methods: {
        changeSource(image) {
            this.imageSource = image;
        },
        addquantity() {
            this.quantity += 1;
        },
        removequantity() {
            if (this.quantity > 1) this.quantity -= 1;
        },
        activeDescription() {
            this.isActiveDescription = true;
            this.isActiveReview = false;
            this.showDescription = true;
            this.showReview = false;
        },
        activeReview() {
            this.isActiveDescription = false;
            this.isActiveReview = true;
            this.showDescription = false;
            this.showReview = true;
        },
        addToCart() {
            this.$store.dispatch("addToCart", {
                product: this.product,
                quantity: this.quantity,
            });
        },
        addItemToCart(product) {
            this.$store.dispatch("addToCart", {
                product: product,
                quantity: 1,
            });
        },
    },
};
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
.border_top_li {
    border-top: 3px solid #446084 !important;
}
.contain-detail {
    position: relative;
    min-width: 125%;
    left: -25%;
    display: block;
    .contain-gallery {
        max-width: 510px;

        float: left;
        #featured {
            width: 100%;
            max-height: 650px;
            float: left;
            cursor: pointer;
            object-fit: cover;
        }
        .contain-thumbs {
            margin: 15px 0;
            max-width: 100%;
            float: left;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            .thumbnail {
                max-width: 115px;
                height: 130px;
                margin-right: 27.5px;
                cursor: pointer;
            }
            .thumbnail_last {
                margin-right: 0;
            }
            .thumbnail:hover {
                border: solid 1px #ccc;
            }
        }
    }
    .contain-info {
        float: right;
        width: calc(100% - 540px);
        hr {
            width: 30px;
            margin-top: 20px;
            height: 3px;
        }
        .last_hr {
            width: 100%;
            margin-top: 20px;
            height: 1px;
        }
        .name {
            font-weight: 700;
            font-size: 27px;
            color: #555;
        }
        .price {
            font-weight: 650;
            font-size: 24px;
            color: #111;
        }
        .contain-cart {
            width: 100%;
            .minus-btn,
            .plus-btn {
                width: 28px;
                height: 45px;
                background-color: #f9f9f9;
                border: solid 1px #ccc;
            }
            .cart-btn {
                background-color: #d26e4b;
                padding: 10px 20px;
                color: white;
                margin-left: 25px;
            }
            .quantity {
                outline: none;
                width: 45px;
                height: 45px;
                border: solid 1px #ccc;
                text-align: center;
            }
        }
        .categories {
            font-size: 13px;
            font-weight: 400;
            color: #111;
        }
    }
    .description {
        width: 100%;
        float: left;
        margin-top: 40px;
        ul {
            width: 100%;
            border-top: 1px solid #f5f5f5;
            margin: 0;
            padding: 0;
            li {
                border-top: 3px solid white;
                width: fit-content;
                float: left;
                padding: 10px;
                font-size: 13px;
                font-weight: 500;
                color: #d1d2d1;
                cursor: pointer;
            }
        }
        .description {
            width: 100%;
            margin-top: 40px;
        }
        .review {
            width: 100%;
            // .fb-comments {
            //     width: 100%;
            // }
        }
    }
    .contain-related {
        margin: 50px 0;
        width: 100%;
        float: left;
        hr {
            height: 1px;
        }
        .title {
            font-weight: 700;
            font-size: 20px;
            color: #555;
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
    }
}
</style>
