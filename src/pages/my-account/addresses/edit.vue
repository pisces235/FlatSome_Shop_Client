<template>
    <div class="container-fluid">
        <div class="title">BILLING ADDRESS</div>
        <v-text-field
            label="Email"
            placeholder="Enter your email address"
            type="text"
            v-model="user.email"
            disabled
        ></v-text-field>

        <v-text-field
            label="Full name"
            placeholder="Enter your full name"
            type="text"
            v-model="user.name"
        ></v-text-field>
        <v-combobox
            class="combobox"
            v-model="user.address[0].province"
            :items="provinces"
            label="Province"
            dense
        ></v-combobox>

        <v-combobox
            class="combobox"
            v-model="user.address[0].district"
            :items="districts"
            label="District"
            dense
            v-show="
                user.address[0].province != '' &&
                user.address[0].province != null
            "
            @focus="getDistricts()"
        ></v-combobox>
        <v-combobox
            class="combobox"
            v-model="user.address[0].ward"
            :items="wards"
            label="Ward"
            dense
            v-show="
                user.address[0].district != '' &&
                user.address[0].district != null
            "
            @focus="getWards()"
        ></v-combobox>

        <v-text-field
            label="Apartment, suite, unit, etc (optional)"
            placeholder="Enter apartment, suite, unit, etc (optional)"
            type="text"
            v-model="user.address[0].left_address"
        ></v-text-field>
        <v-text-field
            label="Phone"
            placeholder="Enter your phone number"
            type="text"
            v-model="user.phoneNumber"
        ></v-text-field>
        <button @click="updateUser()">SAVE CHANGE</button>
        <div class="errors" v-for="e in errors" :key="e">
            <p>{{ e }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: "Addresses-edit",
    async mounted() {
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
        ...mapState(["user"]),
    },
    data() {
        return {
            allProvince: [],
            allDistrict: [],
            allWard: [],
            errors: [],
            provinces: [],
            districts: [],
            wards: [],
            left_address: "",
        };
    },
    methods: {
        getDistricts() {
            this.allProvince.data.forEach((p) => {
                if (p.name == this.user.address[0].province) {
                    this.allDistrict = p.districts;
                }
            });
            this.allDistrict.forEach((d) => {
                this.districts.push(d.name);
            });
        },
        getWards() {
            this.allDistrict.forEach((d) => {
                if (d.name == this.user.address[0].district) {
                    this.allWard = d.wards;
                }
            });
            this.allWard.forEach((w) => {
                this.wards.push(w.name);
            });
        },
        updateUser() {
            this.errors = [];
            this.addErrors();
            let newAddress = {
                type: "billing address",
                province: this.user.address[0].province,
                district: this.user.address[0].district,
                ward: this.user.address[0].ward,
                left_address: this.user.address[0].left_address,
            };
            if (this.errors.length == 0) {
                this.$store
                    .dispatch("updateUserAddress", {
                        email: this.user.email,
                        name: this.user.name,
                        phoneNumber: this.user.phoneNumber,
                        newAddress: newAddress,
                        id: this.user._id,
                    })
                    .then((response) => {
                        if (response.message != true) {
                            this.errors.push(response.message);
                        } else {
                            alert("Your billing address is updated!");
                            this.$router.push("/my-account/addresses");
                        }
                    });
            }
        },
        addErrors() {
            this.errors = [];
            if (this.user != {}) {
                if (this.user.name == "" || this.user.name == null) {
                    this.errors.push("You must input a name");
                }

                if (
                    this.user.phoneNumber == "" ||
                    this.user.phoneNumber == null
                ) {
                    this.errors.push("You must input a phone number");
                }
            }
            if (
                this.user.address[0].province == "" ||
                this.user.address[0].province == null
            ) {
                this.errors.push("You must input a province");
            }
            if (
                this.user.address[0].district == "" ||
                this.user.address[0].district == null
            ) {
                this.errors.push("You must input a district");
            }
            if (
                this.user.address[0].ward == "" ||
                this.user.address[0].ward == null
            ) {
                this.errors.push("You must input a ward");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.container-fluid {
    button {
        background-color: #446084;
        color: white;
        width: 160px;
        display: block;
        padding: 8px 15px;
        margin-bottom: 20px;
    }
    button:hover {
        background-color: #37436c;
    }
    .errors {
        color: red;
        font-size: 14px;
    }
}
</style>
