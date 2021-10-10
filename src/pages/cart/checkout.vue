<template>
    <div class="container">
        <hr />

        <div
            class="contain-errors"
            v-show="errors.length > 0"
            v-for="e in errors"
            :key="e"
        >
            <p>{{ e }}</p>
        </div>

        <div class="contain-left" v-if="user == {}">
            <div class="title">BILLING ADDRESS</div>
            <v-text-field
                label="Email"
                placeholder="Enter your email address"
                type="text"
                v-model="email"
            ></v-text-field>

            <v-text-field
                label="Full name"
                placeholder="Enter your full name"
                type="text"
                v-model="name"
            ></v-text-field>
            <v-combobox
                class="combobox"
                v-model="province"
                :items="provinces"
                label="Province"
                dense
            ></v-combobox>

            <v-combobox
                class="combobox"
                v-model="district"
                :items="districts"
                label="District"
                dense
                v-show="province != '' && province != null"
                @focus="getDistricts()"
            ></v-combobox>
            <v-combobox
                class="combobox"
                v-model="ward"
                :items="wards"
                label="Ward"
                dense
                v-show="district != '' && district != null"
                @focus="getWards()"
            ></v-combobox>

            <v-text-field
                label="Apartment, suite, unit, etc (optional)"
                placeholder="Enter apartment, suite, unit, etc (optional)"
                type="text"
                v-model="left_address"
            ></v-text-field>
            <v-text-field
                label="Phone"
                placeholder="Enter your phone number"
                type="text"
                v-model="phone"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            ></v-text-field>

            <v-textarea
                solo
                label="Note about your oder, e.g, special note for delivery."
                placeholder="Enter note"
                v-model="note"
            ></v-textarea>
        </div>

        <div class="contain-left" v-else>
            <div class="title">BILLING ADDRESS</div>
            <v-text-field
                label="Email"
                placeholder="Enter your email address"
                type="text"
                v-model="user.email"
            ></v-text-field>

            <v-text-field
                label="Full name"
                placeholder="Enter your full name"
                type="text"
                v-model="user.name"
            ></v-text-field>
            <v-combobox
                class="combobox"
                v-model="province"
                :items="provinces"
                label="Province"
                dense
            ></v-combobox>

            <v-combobox
                class="combobox"
                v-model="district"
                :items="districts"
                label="District"
                dense
                v-show="province != '' && province != null"
                @focus="getDistricts()"
            ></v-combobox>
            <v-combobox
                class="combobox"
                v-model="ward"
                :items="wards"
                label="Ward"
                dense
                v-show="district != '' && district != null"
                @focus="getWards()"
            ></v-combobox>

            <v-text-field
                label="Apartment, suite, unit, etc (optional)"
                placeholder="Enter apartment, suite, unit, etc (optional)"
                type="text"
                v-model="left_address"
            ></v-text-field>
            <v-text-field
                label="Phone"
                placeholder="Enter your phone number"
                type="text"
                v-model="user.phoneNumber"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            ></v-text-field>

            <v-textarea
                solo
                label="Note about your oder, e.g, special note for delivery."
                placeholder="Enter note"
                v-model="note"
            ></v-textarea>
        </div>

        <div class="contain-right">
            <div class="title">YOUR ODER</div>
            <table>
                <tr>
                    <th>PRODUCT</th>
                    <th class="text-right">SUBTOTAL</th>
                </tr>
                <tr v-for="c in cart" :key="c.product.slug">
                    <td>
                        {{ c.product.name }} x
                        <span class="qty">{{ c.quantity }}</span>
                    </td>
                    <td class="text-right">
                        <span class="price"
                            >${{
                                (c.product.price * c.quantity)
                                    .toFixed(2)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}</span
                        >
                    </td>
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
                    <td class="text-right bold">
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
            </table>

            <div class="contain-btn">
                <button class="checkout-btn" @click="addNewOrder()">
                    PLACE ORDER
                </button>
            </div>
            <div class="our-note">
                <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    created() {},
    async mounted() {
        if (this.cart.length == 0) {
            alert("Your cart is empty! Return to shop ?");
            this.$router.push("/shop");
        }
        this.$store.commit("SET_CART");
        this.allProvince = await axios.get(
            "https://provinces.open-api.vn/api/?depth=3"
        );
        this.allProvince.data.forEach((p) => {
            this.provinces.push(p.name);
        });

        this.localUser = JSON.parse(window.localStorage.currentUser);

        this.$store.dispatch("loadUserById", this.localUser.id);
    },
    computed: {
        ...mapState(["cart", "user"]),
    },
    data() {
        return {
            address: [],
            allProvince: [],
            allDistrict: [],
            allWard: [],
            errors: [],
            provinces: [],
            districts: [],
            wards: [],
            email: "",
            name: "",
            province: "",
            district: "",
            ward: "",
            left_address: "",
            phone: "",
            note: "",
            ship: 0,
        };
    },
    methods: {
        getDistricts() {
            this.allProvince.data.forEach((p) => {
                if (p.name == this.province) {
                    this.allDistrict = p.districts;
                }
            });
            this.allDistrict.forEach((d) => {
                this.districts.push(d.name);
            });
        },
        getWards() {
            this.allDistrict.forEach((d) => {
                if (d.name == this.district) {
                    this.allWard = d.wards;
                }
            });
            this.allWard.forEach((w) => {
                this.wards.push(w.name);
            });
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
        addNewOrder() {
            let newOrder = {};

            this.addErrors();

            if (this.errors.length > 0) return;

            if (this.user == {}) {
                newOrder = {
                    email: this.email,
                    name: this.name,
                    address: {
                        type: "billing address",
                        province: this.province,
                        district: this.district,
                        ward: this.ward,
                        left_address: this.left_address,
                    },
                    phoneNumber: this.phone,
                    note: this.note,
                    cart: this.cart,
                    total: this.getCartSubToTal(),
                };
            } else {
                newOrder = {
                    email: this.user.email,
                    name: this.user.name,
                    address: {
                        type: "billing address",
                        province: this.province,
                        district: this.district,
                        ward: this.ward,
                        left_address: this.left_address,
                    },
                    phoneNumber: this.user.phoneNumber,
                    note: this.note,
                    cart: this.cart,
                    total: this.getCartSubToTal(),
                };
            }
            this.$store
                .dispatch("addOrder", newOrder)
                .then((response) => {
                    if (response.message != "success") {
                        this.message = response.message;
                    } else {
                        window.localStorage.cart = JSON.stringify([]);
                        this.$router.push("/confirm");
                    }
                })
                .catch((errors) => {
                    this.message = errors;
                });
        },
        addErrors() {
            this.errors = [];
            if (this.user != {}) {
                if (this.user.email == "" || this.user.email == null) {
                    this.errors.push("You must input a email");
                }

                if (this.user.name == "" || this.user.name == null) {
                    this.errors.push("You must input a name");
                }

                if (
                    this.user.phoneNumber == "" ||
                    this.user.phoneNumber == null
                ) {
                    this.errors.push("You must input a phone number");
                }
            } else {
                if (this.email == "" || this.email == null) {
                    this.errors.push("You must input a email");
                }
                if (this.name == "" || this.name == null) {
                    this.errors.push("You must input a name");
                }
                if (this.phone == "" || this.phone == null) {
                    this.errors.push("You must input a phone number");
                }
            }
            if (this.province == "" || this.province == null) {
                this.errors.push("You must input a province");
            }
            if (this.district == "" || this.district == null) {
                this.errors.push("You must input a district");
            }
            if (this.ward == "" || this.ward == null) {
                this.errors.push("You must input a ward");
            }
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
        height: 1px;
    }
    .contain-errors {
        margin-top: 20px;
        p {
            color: #b20000;
            font-weight: 400;
            font-size: 14px;
        }
    }
    .contain-left {
        margin: 20px 0;
        width: 57.5%;
        float: left;
        .combobox {
            margin-top: 20px;
        }
    }
    .contain-right {
        width: 40%;
        float: left;
        margin: 30px 0 20px 2.5%;
        border: solid 3px #446084;
        padding: 30px 3%;
        .title {
            font-size: 18px;
            font-weight: 600;
            color: #555;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            tr {
                th {
                    font-size: 14px;
                    font-weight: 600;
                    color: #777;
                    border-bottom: 2px solid #ececec;
                    padding: 10px 0;
                }
                td {
                    font-size: 14px;
                    font-weight: 400;
                    color: #666;
                    padding: 15px 0;
                    border-bottom: 1px solid #ececec;
                    .price {
                        font-weight: 600;
                        color: #111;
                    }
                    .qty {
                        font-weight: 600;
                        color: #666;
                    }
                }
                .bold {
                    font-weight: 600;
                    color: #111;
                }
            }
        }
        .contain-btn {
            .checkout-btn {
                color: white;
                font-weight: 600;
                font-size: 16px;
                background-color: #d26e4b;
                display: block;
                text-align: center;
                padding: 8px 18px;
                margin-top: 20px;
            }
            .checkout-btn:hover {
                background-color: #a95a3d;
            }
        }
        .our-note {
            margin-top: 20px;
            p {
                font-size: 14px;
                font-weight: 400;
                color: #777;
                margin: 0;
                padding: 0;
            }
        }
    }
}
</style>
