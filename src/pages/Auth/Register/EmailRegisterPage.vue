<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { checkUuid, registerUser, loginUser } from './EmailRegisterScript';
import { useRoute, useRouter } from 'vue-router';
import { notNullRules, minimumLength, minimumCapital, sameField } from '../AuthScript';
import { AxiosResponse } from 'axios';


const registerLoading = ref(false);
const visible = ref(false);
const visibleConfirm = ref(false);

//FORM
const form: any = ref(null);
const validateOn = ref("submit");

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
// END FORM

// ROUTER
const router = useRouter();
// CURRENT ROUTE
const route = useRoute();

onMounted(async () => {
    email.value = await checkUuid(route.params.uuid.toString()) ?? "";
    if (email.value == null || email.value == "") {
        router.replace({ name: "register" });
    }
});

watch(() => password.value, async (value) => {
    if (validateOn.value == "input") {
        await form.value?.validate();
    }
});

watch(() => confirmPassword.value, async (value) => {
    if (validateOn.value == "input") {
        await form.value?.validate();
    }
});

async function register() {
    registerLoading.value = true;
    validateOn.value = "input";
    const { valid, errors } = await form.value?.validate();
    if (valid) {
        let res: AxiosResponse | null = await registerUser(email.value, name.value, password.value, confirmPassword.value);
        if (res == null) {
            // TODO: Error Handling of failed register
            return;
        }
        // TODO: Login
        let resLogin: AxiosResponse | null = await loginUser(email.value, password.value);
        if (resLogin == null) {
            //TODO: Login Failed
            // Redirect to login page
            router.replace({ name: "login" });
        }
        // Login Success
        // Redirect to Home Page
        router.replace({ name: "home" });
        return;
    }

    registerLoading.value = false;
}

</script>

<template>
    <v-container class="text-center" v-if="email">
        <div class="text-title text-h3">CMarket</div>
        <hr class="my-5">
        <v-row no-gutters class="d-flex justify-center mx-8">
            <v-col cols="12" sm="8" md="6" lg="4" class="elevation-6 pa-10">
                <div class="text-h4 font-weight-bold">One Last Step..</div>
                <div class="text-subtitle-1">Please complete your registration form</div>
                <v-form @submit.prevent :validate-on="validateOn" ref="form" class="my-5 text-start">

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Email</div>
                    <v-text-field v-model="email" name="email" density="compact" prepend-inner-icon="mdi-email-outline"
                        variant="outlined" class="text-left" disabled></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Name</div>
                    <v-text-field v-model="name" name="name" density="compact" placeholder="Name" prepend-inner-icon="mdi-account"
                        variant="outlined" class="text-left mb-2"
                        :rules="[(v: string) => notNullRules(v, 'Name')]"></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Password</div>

                    <v-text-field 
                        :type="visible ? 'text' : 'password'" density="compact" v-model="password"
                        placeholder="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        :rules="[
                            (value) => notNullRules(value, 'Password'),
                            (v) => minimumLength(v, 5),
                            (v) => minimumCapital(v, 1)
                        ]" class="mb-2">
                        <template #append-inner>
                            <button @click="visible = !visible" tabindex="-1" class="pointer" style="color:grey">
                                <v-icon v-if="visible">mdi-eye</v-icon>
                                <v-icon v-else>mdi-eye-off</v-icon>
                            </button>
                        </template>
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Confirm Password</div>

                        <v-text-field 
                        :type="visibleConfirm ? 'text' : 'password'" density="compact" v-model="confirmPassword"
                        placeholder="Confirm Password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        :rules="[(v: string) => sameField(v, password, 'Confirm Password', 'Password')]">
                        <template #append-inner>
                            <button @click="visibleConfirm = !visibleConfirm" tabindex="-1" class="pointer" style="color: grey;">
                                <v-icon v-if="visibleConfirm">mdi-eye</v-icon>
                                <v-icon v-else>mdi-eye-off</v-icon>
                            </button>
                        </template>
                    </v-text-field>

                    <v-btn block :loading="registerLoading" @click="register" class="mb-3 mt-6" variant="tonal"
                        color="blue-darken-1" type="submit" style="height:40px">Register</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>