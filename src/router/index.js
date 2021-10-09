import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages";
import Shop from "../pages/shop";

import Account from "../pages/my-account/login.vue";
import MyAccount from "../pages/my-account/index.vue";
import Addresses from "../pages/my-account/addresses";
import EditAddress from "../pages/my-account/addresses/edit.vue";
import AddAddress from "../pages/my-account/addresses/add.vue";
import Orders from "../pages/my-account/orders.vue";
import AccountDetails from "../pages/my-account/details.vue";

import Category from "../pages/shop/category";
import CategoryChild from "../pages/shop/category_child";
import Detail from "../pages/shop/detail";
import Cart from "../pages/cart";
import CheckOut from "../pages/cart/checkout.vue";
import Confirm from "../pages/cart/confirm.vue";

import ErrorPage from "../pages/error";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        name: "ErrorPage",
        component: ErrorPage,
        meta: { hideHeader: true, hideFooter: true, hideAdminHeader: true },
    },
    { path: "/", name: "Home", component: Home },
    {
        path: "/shop",
        name: "Shop",
        component: Shop,
        children: [
            {
                path: ":category/:slug",
                name: "Detail1",
                component: Detail,
            },
            {
                path: ":category/:category_child/:slug",
                name: "Detail2",
                component: Detail,
            },
        ],
    },
    { path: "/cart", name: "Cart", component: Cart },
    { path: "/confirm", name: "Confirm", component: Confirm },
    {
        path: "/product-category",
        name: "Shop",
        component: Shop,
        children: [
            {
                path: ":category",
                name: "Category",
                component: Category,
            },
            {
                path: ":category/:category_child",
                name: "CategoryChild",
                component: CategoryChild,
            },
        ],
    },
    {path: "/account", name: "Account", component: Account,},
    {
        path: "/my-account", name: "MyAccount", component: MyAccount,
        beforeEnter: (to, from, next) => {
            let currentUser = JSON.parse(
                window.localStorage.currentUser
            );
            if (currentUser && currentUser.typeAccount === "customer") {
                next();
            } else {
                next("/account");
            }
        },
        children: [
            {
                path: "addresses",
                name: "Addresses",
                component: Addresses,
            },
            {
                path: "orders",
                name: "Orders",
                component: Orders,
            },
            {
                path: "account-details",
                name: "AccountDetails",
                component: AccountDetails,
            },
            {
                path: "edit-address/billing",
                name: "EditAddress",
                component: EditAddress,
            },
            {
                path: "add-address/billing",
                name: "AddAddress",
                component: AddAddress,
            },
        ],
    },
    { path: "/checkout", name: "CheckOutPage", component: CheckOut },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
