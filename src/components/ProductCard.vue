<style scoped>
.title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 3.2em;
    line-height: 1.6em;
    display: flex;
    align-items: center;
}

.description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 3.2em;
    line-height: 1.6em;
}

.common:hover {
    background-color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
    color: black;
}

.uncommon {
    border-color: rgb(0, 255, 0);
}

.uncommon:hover {
    background-color: rgb(0, 255, 0);
    border-color: rgb(0, 255, 0);
    color: black;
}

.uncommon:hover .raritytext {
    color: black;
}

.uncommon .raritytext {
    color: rgb(0, 255, 0);
}


.rare {
    border-color: rgb(0, 0, 255);
}

.rare:hover {
    background-color: rgb(0, 0, 255);
    border-color: rgb(0, 0, 255);
    color: white;
}

.rare:hover .raritytext {
    color: white;
}

.rare .raritytext {
    color: rgb(0, 0, 255);
}


.epic {
    border-color: rgb(255, 0, 255);
}

.epic:hover {
    background-color: rgb(255, 0, 255);
    border-color: rgb(255, 0, 255);
    color: #ffffff;

}

.epic:hover .raritytext {
    color: white;
}

.epic .raritytext {
    color: rgb(255, 0, 255);
}

.legendary {
    border-color: red;
}

.legendary:hover {
    background-color: red;
    border-color: red;
    color: white !important;
}

.legendary:hover .raritytext {
    color: white;
}

.legendary .raritytext {
    color: red;
}

.maincard {
    transition: transform 0.3s ease;
}

.maincard:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

.maincard .productimg {
    transition: transform 0.3s ease;
}

.maincard:hover .productimg {
    transform: scale(1.2);
    transition: transform 0.3s ease;
}
</style>

<script setup>
const props = defineProps(["product"])
const product = props.product;

function getClass() {
    switch (parseInt(product.rarity.level)) {
        case 2:
            return "uncommon"
        case 3:
            return "rare"
        case 4:
            return "epic"
        case 5:
            return "legendary"
        default:
            return "common"
    }
}
</script>

<template>

    <div @click.stop="() => { dialogProduct = true; }">
        <v-card :color="'black' + product.rarity.color" variant="outlined" class="mx-auto pointer h-100 maincard"
            :class="getClass()">
            <v-card-item class="pa-0">
                <div class="pa-3">
                    <div class="text-overline mb-1 font-weight-black raritytext">
                        {{ product.rarity.name }}
                    </div>
                    <v-img class="productimg" height="200"
                        :src="product.image || 'https://upload.wikimedia.org/wikipedia/commons/6/6e/One_Ring.png'">
                    </v-img>
                    <v-spacer></v-spacer>
                    <div class="text-h6 title">
                        {{ product.name }}
                    </div>
                    <div class="text-caption description">
                        {{ product.description }}
                    </div>
                </div>
                <div class="bg-green">
                    <div class="pa-2">
                        {{ product.price }} GEMS
                    </div>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>