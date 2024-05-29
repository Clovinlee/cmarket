<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Product from "../../models/Product";
import { AxiosClient } from "../../api/AxiosClient";
import { PRODUCT_ENDPOINT } from "../../ApiEndpoints";
import { AxiosResponse } from "axios";

import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import getRandomNumber from "../../utils/GetRandomNumber";

const route = useRoute();
const product = ref<Product | null>(null);

const discountPercent = ref<number>(getRandomNumber(1, 25));
const wishList = ref<boolean>(false);
const tabsModel = ref(null);

const quantity = ref<number>(1);
watch(quantity, (val) => {
    if (val < 1) {
        quantity.value = 1;
    }
});


const subtotal = ref(1);

const imageCol = ref<HTMLElement | null>(null); //col 1
const descriptionCol = ref<HTMLElement | null>(null); //col 2
const buyCol = ref<HTMLElement | null>(null); //col 3

// Carousel Scroll Image
const currentSlide = ref<number>(0);
//

const loading = ref<boolean>(false);

const toggleNote = ref(false);
const note = ref("");

onMounted(() => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        let response: AxiosResponse = await AxiosClient.getInstance().get(
            PRODUCT_ENDPOINT + "/" + route.params.slug
        );
        product.value = Product.From(response.data);
    } catch (e) {
        console.error(e);
    }
}

function carouselSlideTo(val: number) {
    currentSlide.value = val;
}

function setToggleNote() {
    toggleNote.value = !toggleNote.value;
    if (toggleNote.value == false) {
        note.value = "";
    }
}

</script>

<style>
.imageSelected {
    border: 3px solid rgb(75, 75, 192);
    border-radius: 15px;
}
</style>

<template>
    <v-container fluid class="d-flex flex-column h-100">
        <v-row class="flex-grow-0">
            <!-- FIRST COLUMN -->
            <v-col cols="3" class="">
                <div ref="imageCol">
                    <v-sheet class="pa-3">
                        <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide">
                            <Slide v-for="slide in 10" :key="slide">
                                <div class="carousel__item">
                                    <v-img :src="product?.image" width="300px"></v-img>
                                </div>
                            </Slide>
                        </Carousel>
                    </v-sheet>
                    <v-sheet>
                        <Carousel id="thumbnails" :items-to-show="5" :wrap-around="true" v-model="currentSlide"
                            ref="carousel" class="pointer">
                            <template #addons>
                                <navigation class="text-primary" />
                            </template>
                            <Slide v-for="slide in 10" :key="slide">
                                <div class="carousel__item" @click="carouselSlideTo(slide - 1)">
                                    <v-img :src="product?.image" width="50"></v-img>
                                </div>
                            </Slide>
                        </Carousel>
                    </v-sheet>
                </div>
            </v-col>

            <!-- MID COLUMN -->
            <v-col cols="6" class="overflow-y-hidden">
                <!--  -->
                <div ref="descriptionCol" class="">
                    <v-sheet class="d-flex justify-space-between align-center">
                        <div>
                            <div class="d-flex align-center ga-3">
                                <div class="text-h4 font-weight-bold">Ring of Goliath</div>
                                <v-divider class="border-opacity-75" vertical
                                    style="width: 200px; height: 30px"></v-divider>
                                <v-tooltip :text="wishList ? 'Remove from wishlist' : 'Add to wishlist'"
                                    location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-sheet v-bind="props" class="rounded-circle pointer"
                                            @click="wishList = !wishList">
                                            <v-icon v-if="wishList" class="text-red">mdi-heart</v-icon>
                                            <v-icon v-else class="text-red">mdi-heart-outline</v-icon>
                                        </v-sheet>
                                    </template>
                                </v-tooltip>
                            </div>
                            <ul class="d-flex ga-8">
                                <li class="text-body-1" style="list-style: none">Sold 10K+</li>
                                <li class="text-body-1">Sold 10K+</li>
                                <li class="text-body-1">Sold 10K+</li>
                            </ul>
                        </div>

                        <div class="d-flex align-center">
                            <v-icon icon="mdi-diamond-stone" class="" size="large"></v-icon>
                            <div class="text-h5 font-weight-bold">{{ product ? product.price : 0 }}</div>
                        </div>
                    </v-sheet>

                    <!--  -->
                    <v-sheet class="d-flex align-items-center justify-start ga-2">
                        <v-sheet class="bg-danger text-subtitle-2 font-weight-bold rounded-sm px-1"
                            style="background-color: #ffdbe2; color: #f94d63">{{ discountPercent }}%</v-sheet>
                        <v-sheet class="text-subtitle-2 text-disabled text-decoration-line-through font-weight-bold">{{
                            ((discountPercent+100)/100)* (product ? product.price : 0) }}</v-sheet>
                    </v-sheet>

                    <!-- TABS -->
                    <v-sheet>
                        <v-tabs v-model="tabsModel" align-tabs="start" color="deep-purple-accent-4">
                            <v-tab :value="1">Detail</v-tab>
                            <v-tab :value="2">Important</v-tab>
                        </v-tabs>
                        <v-sheet>
                            <div v-if="tabsModel == 1">
                                <ReadMoreText v-if="product.description == undefined">
                                    No Description
                                </ReadMoreText>
                                <ReadMoreText v-else>
                                    {{ product.description }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima asperiores ducimus unde eaque fugiat quod. Molestiae suscipit distinctio, saepe reiciendis deleniti harum sint, doloribus dolore officia officiis ex temporibus aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem doloribus dolorum id unde similique, quaerat expedita possimus doloremque maxime repellendus nisi eligendi, corporis ad. Repudiandae suscipit dolorum id ipsa cum.
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. At laboriosam exercitationem aliquid ut libero doloribus placeat provident consectetur, distinctio, facere qui maxime consequuntur nobis aliquam dolore repudiandae voluptas, illo quisquam.
                                </ReadMoreText>
                            </div>
                            <v-sheet v-else>
                                <div class="text-body-1">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Ducimus facilis beatae voluptas deleniti ex harum qui pariatur,
                                    cumque nemo! Repellendus exercitationem doloribus dicta?
                                    Facilis, voluptate iure. Nam veniam dicta recusandae.
                                </div>
                            </v-sheet>
                        </v-sheet>
                    </v-sheet>

                    <!-- MERCHANT -->
                    <v-sheet class="d-flex justify-space-between align-center my-4">
                        <div class="d-flex align-center ga-3 pointer">
                            <v-avatar color="secondary">JM</v-avatar>
                            <div class="">
                                <div class="text-body-1 font-weight-bold">James Murray</div>
                                <div class="text-subtitle-1 text-grey">Local Merchant</div>
                            </div>
                        </div>
                        <v-btn variant="outlined" color="primary" class="px-10">Visit</v-btn>
                    </v-sheet>

                    <!-- DELIVERY OPTIONS -->
                    <v-sheet class="d-flex flex-column ga-2">
                        <div class="text-h6 font-weight-bold">Delivery Option</div>
                        <v-sheet class="d-flex align-center ga-2">
                            <v-icon icon="mdi-map-marker-outline" class="" size="large"></v-icon>
                            <div class="text-body-1">Will be sent using dimensional magic</div>
                        </v-sheet>
                        <v-sheet class="d-flex align-start ga-2">
                            <v-icon icon="mdi-magic-staff" class="" size="large"></v-icon>
                            <div class="">
                                <div class="text-body-1">
                                    Delivery Fee will varies on location magic resource
                                </div>
                                <div class="text-subtitle-2 text-grey">
                                    Delivery Fee will varies on your location magic resource
                                </div>
                                <div class="text-subtitle-1">
                                    Estimated Time of Arrival: 5 Hour after purchasing
                                </div>
                            </div>
                        </v-sheet>
                    </v-sheet>
                </div>

            </v-col>

            <!-- THIRD COLUMN -->
            <v-col class="">
                <div ref="buyCol" class="h-100">
                    <v-sheet border="opacity-25 sm" class="border-md rounded-lg pa-5 h-100">
                        <div class="text-h5 font-weight-bold">Purchase Now</div>
                        <div class="d-flex align-center justify-start my-3 ga-2">
                            <div>
                                <v-img :src="product?.image" style="width: 50px" class=""></v-img>
                            </div>
                            <div class="text-body-1 text-black">Ring of Goliath</div>
                        </div>

                        <v-row no-gutters class="d-flex align-center ga-2">
                            <v-col cols="7">
                                <div></div>
                                <v-sheet border="opacity-25 sm primary" class="rounded-lg px-3 d-flex pb-2 mb-2">
                                    <v-text-field type="number" variant="underlined" v-model="quantity"
                                        density="compact" hide-details single-line class="centered-input"
                                        hide-spin-buttons>
                                        <template v-slot:prepend>
                                            <v-sheet class="pa-1 rounded-circle pointer elevation-3 text-primary"
                                                @click="() => {
                                                        quantity - 1 > 0 ? quantity-- : '';
                                                    }
                                                    " v-ripple>
                                                <v-icon>mdi-minus</v-icon>
                                            </v-sheet>
                                        </template>
                                        <template v-slot:append>
                                            <v-sheet class="pa-1 rounded-circle pointer elevation-3 text-primary"
                                                @click="() => {
                                                        quantity++;
                                                    }
                                                    " v-ripple>
                                                <v-icon>mdi-plus</v-icon>
                                            </v-sheet>
                                        </template>
                                    </v-text-field>
                                </v-sheet>
                            </v-col>
                            <v-col>
                                <div class="text-body-1">Stock Left: <strong>9</strong></div>
                            </v-col>
                        </v-row>

                        <v-sheet>
                            <v-text-field v-if="toggleNote" v-model="note" hide-details density="compact"
                                variant="outlined" placeholder="Example: Please Add Anti Gravity Protection Spell"
                                color="primary"></v-text-field>
                            <v-btn :prepend-icon="toggleNote ? '' : 'mdi-pencil'" variant="text" color="primary"
                                density="compact" class="px-2" @click="setToggleNote">{{ toggleNote ? "Remove Note" :
                                "Add Note" }}</v-btn>
                        </v-sheet>
                        <v-sheet class="d-flex justify-space-between align-center my-5">
                            <div class="text-body-1 text-grey">Subtotal</div>
                            <div class="text-h6 font-weight-bold">
                                <span><v-icon icon="mdi-diamond-stone" class=""></v-icon></span>{{ ((product ? product.price : 0) * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                            </div>
                        </v-sheet>

                        <v-btn block color="primary" prepend-icon="mdi-cart-arrow-down">Add to cart</v-btn>
                        <div class="my-2"></div>
                        <v-btn block color="primary" prepend-icon="">Buy</v-btn>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>
        <v-sheet class="flex-grow-1 mt-5">
            <div class="text-h6 font-weight-bold"></div>
        </v-sheet>
    </v-container>
</template>
