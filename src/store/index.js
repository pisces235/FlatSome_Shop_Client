import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

import api from "../service/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentUser: {},
        currentAdminUser: {},
        products: [],
        newProducts: [],
        relatedProducts: [],
        categories: [],
        deletedProducts: [],
        product: {},
        cart: [],
        blogs: [],
    },
    mutations: {
        ADD_TO_CART(state, { product, quantity }) {
            if (typeof window.localStorage.cart != "undefined") {
                state.cart = JSON.parse(window.localStorage.cart);
            }
            let productInCart = state.cart.find((item) => {
                return item.product.slug === product.slug;
            });
            if (productInCart) {
                productInCart.quantity += quantity;
            } else {
                state.cart.push({
                    product,
                    quantity,
                });
            }
            window.localStorage.cart = JSON.stringify(state.cart);
        },
        SET_CART(state) {
            if (typeof JSON.parse(window.localStorage.cart) != "undefined") {
                state.cart = JSON.parse(window.localStorage.cart);
            }
        },
        SET_CATEGORIES(state) {
            let count = 0;
            let categories = [];
            for (var i = 0; i < state.products.length; i++) {
                if (categories.length > 0) {
                    for (var j = 0; j < categories.length; j++) {
                        if (
                            categories[j].title ==
                            state.products[i].categories[0]
                        ) {
                            categories[j].qty += 1;
                            state.products[i].categories.forEach(async (p) => {
                                if (!categories[j].items.includes(p)) {
                                    categories[j].items.push(p);
                                }
                            });
                        }
                    }

                    for (var k = 0; k < categories.length; k++) {
                        if (
                            categories[k].title !=
                            state.products[i].categories[0]
                        ) {
                            count++;
                        }
                    }

                    if (count == categories.length) {
                        categories.push({
                            title: state.products[i].categories[0],
                            image: state.products[i].gallery[0],
                            items: state.products[i].categories,
                            qty: 1,
                        });
                        count = 0;
                    }
                } else {
                    categories.push({
                        title: state.products[i].categories[0],
                        image: state.products[i].gallery[0],
                        items: state.products[i].categories,
                        qty: 1,
                    });
                }
            }
            state.categories = categories.sort(function (a, b) {
                var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        LOGOUT_USER(state) {
            state.currentUser = {};
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            window.localStorage.currentUser = JSON.stringify(user);
        },
        LOGOUT_ADMINUSER(state) {
            state.currentAdminUser = {};
            window.localStorage.currentAdminUser = JSON.stringify({});
        },
        SET_CURRENT_ADMINUSER(state, user) {
            state.currentAdminUser = user;
            window.localStorage.currentAdminUser = JSON.stringify(user);
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_NEW_PRODUCTS(state, products) {
            state.newProducts = products;
        },
        SET_RELATED_PRODUCTS(state, product) {
            let newArray = [];
            for (var i = 0; i < state.products.length; i++) {
                if (
                    product.categories[0] == state.products[i].categories[0] &&
                    product.name != state.products[i].name
                ) {
                    newArray.push(state.products[i]);
                }
            }
            state.relatedProducts = newArray;
        },
        SET_DELETED_PRODUCTS(state, products) {
            state.deletedProducts = products;
        },
        SET_PRODUCT(state, product) {
            state.product = product;
        },
    },
    actions: {
        async addProduct(newProduct) {
            try {
                await api().post(`/products`, newProduct);
                return { message: "success" };
            } catch (error) {
                return { message: error.message };
            }
        },
        addToCart({ commit }, { product, quantity }) {
            commit("ADD_TO_CART", { product, quantity });
        },
        async deleteProduct(slug) {
            try {
                await api().delete(`/products/${slug}/force`);
            } catch (error) {
                return { message: error.message };
            }
        },
        async loadUsers({ commit }) {
            let response = await api().get("/users");
            commit("SET_USERS", response.data);
        },
        loadCurrentAdminUser({ commit }) {
            let user = JSON.parse(window.localStorage.currentAdminUser);
            commit("SET_CURRENT_ADMINUSER", user);
        },
        async loginAdminUser({ commit }, loginInfo) {
            try {
                let response = await api().post("/users/signin", {
                    email: loginInfo.email,
                    password: loginInfo.password,
                });
                let decode = jwt_decode(response.data.info.token);
                let user = {
                    name: response.data.info.name,
                    id: decode.sub,
                    typeAccount: response.data.info.typeAccount,
                };

                commit("SET_CURRENT_ADMINUSER", user);

                return user;
            } catch {
                return {
                    error: "Email / password combination was incorrect. Please try again!",
                };
            }
        },
        logoutAdminUser({ commit }) {
            commit("LOGOUT_ADMINUSER");
        },
        async loginUser({ commit }, loginInfo) {
            try {
                let response = await api().post("/users/signin", {
                    email: loginInfo.email,
                    password: loginInfo.password,
                });
                let decode = jwt_decode(response.data.info.token);
                let user = {
                    name: response.data.info.name,
                    id: decode.sub,
                    typeAccount: response.data.info.typeAccount,
                };

                if (user.typeAccount != "admin") {
                    commit("SET_CURRENT_USER", user);

                    return user;
                } else {
                    return {
                        error: "Email / password combination was incorrect. Please try again!",
                    };
                }
            } catch {
                return {
                    error: "Email / password combination was incorrect. Please try again!",
                };
            }
        },
        logoutUser({ commit }) {
            commit("LOGOUT_USER");
        },
        async loadProducts({ commit }) {
            let response = await api().get("/products");
            commit("SET_PRODUCTS", response.data);
        },
        async loadNewProducts({ commit }) {
            let response = await api().get("/products/newProducts");
            commit("SET_NEW_PRODUCTS", response.data);
        },
        async loadDeletedProducts({ commit }) {
            let response = await api().get("/products/deletedProducts");
            commit("SET_DELETED_PRODUCTS", response.data);
        },
        async loadProductBySlug({ commit }, slug) {
            let response = await api().get(`/products/${slug}`);
            commit("SET_PRODUCT", response.data);
        },
        async trashProduct(slug) {
            try {
                await api().delete(`/products/${slug}`);
            } catch (error) {
                return { message: error.message };
            }
        },
        async restoreProduct(slug) {
            try {
                await api().patch(`/products/${slug}`);
            } catch (error) {
                return { message: error.message };
            }
        },
        async updateProduct(newProduct) {
            try {
                await api().put(`/products/${newProduct.slug}`, newProduct);
            } catch (error) {
                return { message: error.message };
            }
        },
    },
    modules: {},
    getters: {},
});
