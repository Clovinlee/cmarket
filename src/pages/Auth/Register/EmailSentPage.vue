<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useEmailStore } from '../../../stores/EmailStore';
import { ref } from 'vue';

const emailStore = useEmailStore();
const router = useRouter();
const confirmAccess = ref(false);


if (emailStore.emailSent == "" || emailStore.emailSent == null) {
    router.replace({ name: "notfound" });
} else {
    confirmAccess.value = true;
    emailStore.setEmailSent("");
}


</script>

<style scoped>
.dashed-line {
    height: 60px;
    border: 1.8px dashed black;
}
</style>

<template>
    <v-container class="vh-100 d-flex flex flex-column align-center" v-if="confirmAccess">
        <div class="text-center flex-grow-1 justify-center align-center d-flex flex-column">
            <v-img src="/email_sent.png" class="mx-auto flex-grow-0" min-width="200" max-width="300">
            </v-img>
            <div class="text-h3 font-weight-bold">
                Email confirmation has been sent!
            </div>
            <div class="text-subtitle-1">
                Please check your email on
            </div>
            <hr class="dashed-line my-3">
            <div class="text font-weight-bold">
                clozzero@gmail.com
            </div>
            <RouterLink to="/">
            <v-btn class="mt-3" color="primary">
                    Go back
                </v-btn>
            </RouterLink>
        </div>
        <div class="text-overline">
            CMarket
        </div>
    </v-container>
</template>