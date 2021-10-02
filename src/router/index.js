import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages";
import Shop from "../pages/shop";
import Account from "../pages/my-account";
import Category from "../pages/shop/category";
import CategoryChild from "../pages/shop/category_child";
import Detail from "../pages/shop/detail";
import Cart from "../pages/cart";
import CheckOut from "../pages/cart/checkout.vue";

import AdminHome from "../pages/admin";
import AdminLogin from "../pages/admin/login";
import AdminAccounts from "../pages/admin/accounts";
import AdminProducts from "../pages/admin/products";
import AdminTrashProducts from "../pages/admin/products/trashProducts.vue";
import AdminAddProduct from "../pages/admin/products/addNewProduct";
import AdminEditProduct from "../pages/admin/products/editProduct";

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
    { path: "/my-account", name: "Account", component: Account },
    { path: "/checkout", name: "CheckOutPage", component: CheckOut },

    {
        path: "/admin",
        name: "AdminHome",
        component: AdminHome,
        meta: { hideHeader: true, hideFooter: true },
        beforeEnter: (to, from, next) => {
            let currentAdminUser = JSON.parse(
                window.localStorage.currentAdminUser
            );
            if (currentAdminUser && currentAdminUser.typeAccount === "admin") {
                next();
            } else {
                next("/admin/login");
            }
        },
        children: [
            {
                path: "accounts",
                name: "AdminAccounts",
                component: AdminAccounts,
                meta: { hideHeader: true, hideFooter: true },
            },
            {
                path: "products",
                name: "AdminProducts",
                component: AdminProducts,
                meta: { hideHeader: true, hideFooter: true },
            },
            {
                path: "products/trash",
                name: "AdminTrashProducts",
                component: AdminTrashProducts,
                meta: { hideHeader: true, hideFooter: true },
            },
            {
                path: "product/addNew",
                name: "AdminAddProduct",
                component: AdminAddProduct,
                meta: { hideHeader: true, hideFooter: true },
            },
            {
                path: "product/edit/:slug",
                name: "AdminEditProduct",
                component: AdminEditProduct,
                meta: { hideHeader: true, hideFooter: true },
            },
        ],
    },
    {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminLogin,
        meta: { hideHeader: true, hideFooter: true },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
