<script setup lang="ts">
import { onMounted, ref } from "vue";
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

const quantity = ref(1);
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
                            <div class="text-h5 font-weight-bold">999</div>
                        </div>
                    </v-sheet>

                    <!--  -->
                    <v-sheet class="d-flex align-items-center justify-start ga-2">
                        <v-sheet class="bg-danger text-subtitle-2 font-weight-bold rounded-sm px-1"
                            style="background-color: #ffdbe2; color: #f94d63">{{ discountPercent }}%</v-sheet>
                        <v-sheet class="text-subtitle-2 text-disabled text-decoration-line-through font-weight-bold">{{
                            ((discountPercent+100)/100)*999 }}</v-sheet>
                    </v-sheet>

                    <!-- TABS -->
                    <v-sheet>
                        <v-tabs v-model="tabsModel" align-tabs="start" color="deep-purple-accent-4">
                            <v-tab :value="1">Detail</v-tab>
                            <v-tab :value="2">Important</v-tab>
                        </v-tabs>
                        <v-sheet>
                            <ReadMoreText v-if="tabsModel == 1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                libero diam, ultrices eget eros ut, fermentum sodales tortor.
                                Fusce id lorem nec lorem scelerisque lacinia et ac sem. Aliquam
                                viverra odio erat, nec tempus leo pellentesque nec. Donec
                                consequat ornare auctor. Vestibulum vulputate turpis lectus, id
                                vestibulum nisi gravida a. Phasellus accumsan luctus nisi vel
                                mollis. Vestibulum tempor, diam ut malesuada vulputate, purus
                                lectus malesuada tellus, et placerat elit arcu non libero. Sed
                                aliquam venenatis enim. Donec ullamcorper posuere enim, ac sodales
                                urna pharetra id. Proin leo nisi, eleifend ut congue et, aliquam
                                ut leo. Integer quis mi sit amet libero porttitor fermentum. Nulla
                                facilisi. Suspendisse eros purus, egestas sit amet congue eget,
                                commodo vitae ipsum. Cras tempor metus arcu, ac cursus neque
                                eleifend eget. In hac habitasse platea dictumst. Donec tortor
                                elit, vulputate ut nibh ut, tincidunt faucibus felis. Suspendisse
                                lacinia et enim semper placerat. Nulla lacinia nibh risus, et
                                pharetra dui dapibus non. Mauris et nibh porta, tempus leo non,
                                vehicula ante. Sed at gravida turpis. Proin luctus gravida augue
                                ut lobortis. Donec et turpis turpis. Fusce malesuada turpis
                                egestas, cursus tellus ut, fringilla quam. Integer quis ligula in
                                risus vestibulum tincidunt. Cras euismod nunc venenatis vehicula
                                tincidunt. Fusce ac lacus tincidunt, varius nunc quis, hendrerit
                                justo. Nunc egestas consequat lacus ut varius. Suspendisse nec
                                velit sed lectus sollicitudin sodales in quis risus. Praesent vel
                                maximus purus. Interdum et malesuada fames ac ante ipsum primis in
                                faucibus. Pellentesque nunc tortor, placerat nec aliquam non,
                                aliquet non est. Aliquam consequat sodales justo, sit amet
                                tincidunt leo fermentum sed. Mauris imperdiet libero non tortor
                                feugiat, pulvinar porta lacus posuere. Maecenas felis quam,
                                tincidunt vitae euismod sed, porta vel quam. Etiam sodales augue
                                vitae nisl aliquam, eget consectetur lorem lacinia. Integer a
                                risus nibh. Vivamus quis augue auctor, rhoncus odio ac, volutpat
                                mi. Nulla aliquam ex est, vel interdum quam aliquet a.
                                Pellentesque fermentum eu nisl eu lobortis. Donec sed fringilla
                                ex. Cras blandit elementum tempor. Maecenas ultrices turpis non ex
                                auctor, dictum ullamcorper orci porta. Pellentesque interdum ut
                                nibh at tincidunt. Fusce id bibendum augue, id laoreet eros.
                                Curabitur maximus, purus at rutrum sodales, augue nibh interdum
                                ipsum, quis egestas sapien libero vitae ipsum. Nam iaculis dictum
                                nunc et mollis. Phasellus commodo vitae est nec euismod. Donec
                                viverra purus at felis varius, id malesuada tortor faucibus. Nunc
                                mollis tortor id arcu elementum, quis cursus arcu semper.
                                Vestibulum ipsum mauris, ultricies non ultrices vel, rhoncus at
                                est. Nam vel enim tristique, luctus mauris eu, efficitur dolor.
                                Phasellus quis lacinia sapien. Mauris ac mauris risus. Duis sed
                                mattis sem, non sagittis velit. Suspendisse finibus vel eros ac
                                tincidunt. Mauris sed lobortis purus, quis sollicitudin est. Nam
                                venenatis ex id lacus tempor semper. Sed in mattis eros, a ornare
                                quam. Fusce consequat, nisi eu accumsan ornare, metus magna cursus
                                erat, a lobortis neque sapien eget nisl. Aliquam pretium tristique
                                magna feugiat vestibulum. Quisque urna ante, aliquam in dignissim
                                sed, commodo sed tortor. Ut feugiat imperdiet purus in mattis.
                                Aliquam sit amet turpis euismod, elementum dolor a, scelerisque
                                nisl. Phasellus lorem lectus, tempor at rhoncus quis, eleifend sed
                                quam. In vestibulum ante sit amet mattis commodo. In hac habitasse
                                platea dictumst. Donec sollicitudin, ex non pellentesque ornare,
                                justo arcu feugiat massa, vitae elementum justo nisi maximus nibh.
                                In sit amet tincidunt dui. Proin sed consequat erat. Nam semper
                                blandit metus quis elementum. Phasellus mattis nibh eu magna
                                rutrum, vel viverra turpis tempus. Phasellus ut nisl eget velit
                                imperdiet feugiat eu sed diam. Pellentesque at risus pretium nulla
                                aliquet fermentum nec vel ante. Cras vel tincidunt urna. Mauris id
                                eros ut lorem malesuada tincidunt eget interdum sem. Curabitur
                                finibus, eros nec efficitur dignissim, urna est fringilla ligula,
                                non tempor felis nunc vel massa. Maecenas lacinia eu erat at
                                posuere. Suspendisse mattis nec metus at maximus. Vestibulum vel
                                cursus ipsum, non convallis justo. Nunc porta finibus massa, ac
                                aliquet turpis congue id. In mollis nisi mauris, a porttitor sem
                                elementum eget. Cras dapibus magna a libero blandit, eget porta ex
                                hendrerit. Praesent non metus odio. Sed vel ultrices ex. Mauris
                                eget mi lobortis, sollicitudin libero nec, iaculis mauris. Sed in
                                odio commodo, mattis sem ut, laoreet massa. Donec mattis nunc
                                elementum, auctor libero a, efficitur nunc. Aliquam in magna ut
                                nisi placerat commodo. Aenean vitae viverra magna, ac maximus
                                urna. Curabitur et libero in risus vestibulum faucibus. Mauris in
                                tempus nunc. Integer vitae enim nec tellus tempor lobortis. Ut
                                ullamcorper justo et consectetur sagittis. Maecenas id enim
                                lobortis, rutrum dolor vitae, suscipit felis. Donec faucibus metus
                                diam. Suspendisse pharetra cursus elit, ut finibus libero tempor
                                non. Aenean eleifend fringilla augue, a congue magna porta a.
                                Curabitur eros lorem, molestie vitae nibh at, tempor ornare purus.
                                Nullam sed elementum nulla. Etiam ultricies viverra consectetur.
                                Suspendisse porta libero et lorem porta condimentum. In ultrices
                                leo vitae ultricies malesuada. Sed sed facilisis dolor.
                                Pellentesque quis orci commodo, facilisis risus eget, fermentum
                                lorem. Mauris elit lectus, malesuada et efficitur at, varius vitae
                                tortor. Mauris a lorem eros. Nam condimentum arcu quis lacus
                                pellentesque vulputate. Praesent tincidunt eget lorem ac molestie.
                                Donec finibus sem ac finibus lacinia. Duis felis massa, laoreet at
                                varius non, elementum eget nisi. Maecenas aliquet elit ut sapien
                                luctus molestie. Proin tortor quam, porta vitae erat a, laoreet
                                vestibulum magna. Vestibulum ac fermentum odio. Vestibulum ex mi,
                                tristique ut tortor at, vulputate bibendum nulla. Praesent sit
                                amet tincidunt orci. Donec auctor arcu sed odio lacinia, ac
                                vehicula magna congue. Phasellus sit amet est congue, rhoncus sem
                                non, luctus dolor. Ut sed felis quis ante consequat pharetra vel
                                eget dui. Curabitur quis magna sem. Sed tempus erat nec lorem
                                varius maximus. Etiam nec diam blandit, posuere diam sit amet,
                                tempor orci. Etiam commodo tortor ligula, eu tristique enim auctor
                                condimentum.
                            </ReadMoreText>
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
                                <span><v-icon icon="mdi-diamond-stone" class=""></v-icon></span>999
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
