<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { emailRules, notNullRules } from '../AuthScript';
import {windowScreenSize} from "../../../utils/ScreenSize.ts"
import { registerEmail } from './RegisterScripts.ts';
import { AxiosResponse } from 'axios';

const registerLoading = ref(false);
const githubLoading = ref(false);
const googleLoading = ref(false);
const validateOn = ref("submit");

// FORMS
const form:any = ref(null);
const email = ref("");
// END FORMS

async function register() {
    registerLoading.value = true;
    validateOn.value = "input";
    const {valid, errors} = await form.value?.validate();
    if(valid){
        let result: AxiosResponse = await registerEmail(email.value);
        if(result.status == 200){
            
        }
    }
    registerLoading.value = false;
}

const { isMobile } = windowScreenSize(600);

onMounted(() => {
    console.log("Mounted");
});

</script>

<style scoped>
    a{
        text-decoration: none;
    }
</style>

<template>
    <v-container class="vh-100 d-flex flex-column">
        <v-sheet class="w-100 text-h2 text-center text-title mb-15">CMarket</v-sheet>
        <v-sheet class="flex-1-1-100 d-flex align-center mt-2">
            <v-row no-gutters class="ga-15">
                <v-col class="d-flex flex-column justify-center align-center" cols="12" sm="5" md="7">
                   <div class="">
                    <v-img class="mx-auto" src="/CMarket.png" min-width="200" max-width="500">
                    </v-img>
                    <div class="text-subtitle font-italic font-thin text-center">
                        All the magic tools you wish it existed, now in one place.
                    </div>
                    <hr class="mt-4">
                   </div>
                </v-col>
                <v-col class="text-center elevation-4 pa-10 mb-10" cols="12" sm="5" md="4">
                    <div class="text-h4 mb-5">Register</div>

                    <!-- -->
                    <div class="d-flex flex-column ga-2">
                        <v-btn prepend-icon="mdi-google" variant="outlined" :loading="googleLoading">Google</v-btn>
                        <v-btn prepend-icon="mdi-github" variant="outlined" :loading="githubLoading">Github</v-btn>
                    </div>
                    <div class="text-overline mt-5">Or Register With</div>
                    <!-- -->

                    <div class="text-subtitle-1 text-medium-emphasis text-left">Email Address</div>

                    <v-form @submit.prevent :validate-on="validateOn" ref="form">
                        <v-text-field v-model="email" name="email" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                        variant="outlined" hint="Example: johndoe@mail.com" class="text-left mb-5" :rules="[(value) => notNullRules(value, 'Email'), emailRules]"></v-text-field>

                        <v-btn block :loading="registerLoading" @click="register" class="mb-3" variant="tonal" color="blue-darken-1" type="submit">Register</v-btn>
                    </v-form>

                    <div class="text-caption">
                        By registering, you agree to the <a href="#">Magic Terms and Conditions</a> <br> as well as the <a href="#">Magic Privacy Policy</a>
                    </div>

                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>