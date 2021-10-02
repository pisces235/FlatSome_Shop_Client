<template>
    <div class="container">
        <v-divider></v-divider>
        <nav class="link-page">
            <ul>
                <li v-for="(i, index) in items" :key="index">
                    <a v-if="index != items.length - 1" :href="i.href">{{
                        i.text
                    }}</a>
                    <span v-if="(index > 0) & (index < items.length)">/</span>
                    <div
                        v-if="index == items.length - 1"
                        class="link-page-last"
                    >
                        {{ i.text }}
                    </div>
                </li>
            </ul>
        </nav>

        <div class="shop-left" v-show="items.length < 5 && !$route.params.slug">
            <div class="title">
                BROWSE
                <hr size="2" />
            </div>
            <nav class="left-bar">
                <ul>
                    <li v-for="(c, index) in categories" :key="c.title">
                        <a
                            :href="'/product-category/' + c.title.toLowerCase()"
                            >{{ c.title }}</a
                        >
                        <v-icon
                            v-show="c.items.length > 1"
                            @click.left="show_item(index)"
                            class="v-icon"
                            >mdi-menu-down</v-icon
                        >
                        <ul class="child_item">
                            <li
                                v-show="ca != c.title"
                                v-for="ca in c.items"
                                :key="ca"
                                class="nav-dropdown"
                            >
                                <a
                                    :href="
                                        '/product-category/' +
                                        c.title.toLowerCase() +
                                        '/' +
                                        ca.toLowerCase()
                                    "
                                    >{{ ca }}</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="shop-right" v-if="items.length == 2">
            <splide-slide
                v-for="c in categories"
                :key="c.title"
                class="contain-box"
            >
                <a
                    :href="'/product-category/' + c.title.toLowerCase()"
                    class="box"
                >
                    <div class="slide-img">
                        <img :src="c.image" />
                        <a
                            :href="'/product-category/' + c.title.toLowerCase()"
                            class="category-btn"
                        >
                            <p>{{ c.title }}</p>
                            <p v-if="c.qty > 1">{{ c.qty }} PRODUCTS</p>
                            <p v-else>{{ c.qty }} PRODUCT</p>
                        </a>
                    </div>
                </a>
            </splide-slide>
        </div>

        <div class="shop-right" v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

let c = document.getElementsByClassName("child_item");
export default {
    created() {
        this.link = window.location.pathname;
        this.linkArray = this.link.split(/[^A-Za-z0-9-_]/);
        this.items.push({
            text: "shop",
            disabled: false,
            href: "/shop",
        });
        for (let i = 2; i < this.linkArray.length; i++) {
            if (i == 2) {
                this.items.push({
                    text: this.linkArray[i].toString(),
                    disabled: false,
                    href: "/product-category/" + this.linkArray[i].toString(),
                });
            } else if (i == 3) {
                this.items.push({
                    text: this.linkArray[i].toString(),
                    disabled: false,
                    href:
                        "/product-category/" +
                        this.linkArray[i - 1].toString() +
                        "/" +
                        this.linkArray[i].toString(),
                });
            } else {
                this.items.push({
                    text: this.linkArray[i].toString(),
                    disabled: true,
                    href: "",
                });
            }
        }
    },
    async mounted() {
        await this.$store.dispatch("loadProducts");
        await this.$store.commit("SET_CATEGORIES");
    },
    computed: {
        ...mapState(["categories"]),
    },
    data() {
        return {
            items: [
                {
                    text: "Home",
                    disabled: false,
                    href: "/",
                },
            ],
        };
    },
    methods: {
        show_item(index) {
            if (c[index].style.display == "none") {
                c[index].style.display = "block";
            } else {
                c[index].style.display = "none";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 73%;
    margin: 0 13.5%;
    padding: 0;
    hr {
        height: 1px;
        margin: 0;
        padding: 0;
    }
    .link-page {
        width: 100%;
        float: left;
        font-size: 18px;
        font-weight: 400;
        margin: 35px 0;
        ul {
            text-transform: uppercase;
            li {
                float: left;
                span {
                    float: left;
                    margin: 0 12px;
                }
                a {
                    color: #949494;
                }
                a:hover {
                    color: #111111;
                }
            }
            .link-page-last {
                float: left;
                font-weight: 700;
                color: #222222;
            }
        }
    }

    .shop-left {
        width: 20%;
        float: left;
        .title {
            color: #777777;
            font-weight: 500;
            margin-bottom: 35px;
            hr {
                width: 30px;
                margin-top: 20px;
            }
        }
        .left-bar {
            width: 100%;
            ul {
                padding: 0;
                li {
                    width: 100%;
                    position: relative;
                    a {
                        display: block;
                        color: #111111;
                        line-height: 40px;
                        border-top: 2px solid #f5f5f5;
                    }
                    .child_item {
                        display: none;
                        padding-left: 15px;
                        margin: 5px 0;
                        li {
                            a {
                                border-top: none;
                                border-left: 2px solid #f5f5f5;
                                padding-left: 15px;
                                line-height: 35px;
                            }
                        }
                    }
                    .v-icon {
                        position: absolute;
                        top: 5px;
                        right: 0;
                        display: block;
                        line-height: 30px;
                        width: 30px;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .shop-right {
        width: 80%;
        float: right;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .contain-box {
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
