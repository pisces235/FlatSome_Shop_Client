<template>
    <div class="contain-category">
        <splide-slide v-for="p in getNewProducts()" :key="p.slug">
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
                            <p class="price-box" v-if="p.price % 1 == 0">
                                ${{ p.price }}.00
                            </p>
                            <p class="price-box" v-else>${{ p.price }}0</p>
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
                        '/shop/' + p.categories[0].toLowerCase() + '/' + p.slug
                    "
                >
                    <div class="detail-box">
                        <div class="type">
                            <p class="categories-box">
                                {{ p.categories[0] }}
                            </p>
                            <p class="name-box">{{ p.name }}</p>
                            <p class="price-box" v-if="p.price % 1 == 0">
                                ${{ p.price }}.00
                            </p>
                            <p class="price-box" v-else>${{ p.price }}0</p>
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
    computed: {
        ...mapState(["products"]),
    },
    async mounted() {
        await this.$store.dispatch("loadProducts");
    },
    data() {
        return {
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
                            this.products[i].slug == "woo-logo" &&
                            this.products[i].categories.length > 1
                        ) {
                            this.products[i].categories.pop();
                        }
                        newProducts.push(this.products[i]);
                    }
                }
            }

            return newProducts;
        },
        addToCart(product) {
            this.$store.dispatch("addToCart", {
                product: product,
                quantity: 1,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.contain-category {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .splide__slide {
        width: 250px;
        margin: 0 0 5% 5%;
        padding: 0;
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
                    z-index: 1;
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
</style>
