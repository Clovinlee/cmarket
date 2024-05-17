<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { emailRules, notNullRules } from '../AuthScript';
import { checkEmail, loginEmail } from './LoginScript';
import { AxiosResponse } from 'axios';
import { User } from '../../../models/User';
import { useUserStore } from '../../../stores/UserStore';

const loginLoading = ref(false);
const githubLoading = ref(false);
const googleLoading = ref(false);
const validateOn = ref("submit");

const router = useRouter();

// FORM
const form: any = ref(null);
const email = ref("");
const password = ref("");
const remember = ref(false);

const emailErrorMessages = ref("");
const passwordErrorMessages = ref("");

const emailConfirmed = ref(false);
// END FORM


watch(() => password.value, () => {
    passwordErrorMessages.value = "";
});

watch(() => email.value, () => {
    emailErrorMessages.value = "";
});

const visible = ref(false);
email.value="clozzero@gmail.com"
password.value ="Chris";
async function login() {
    loginLoading.value = true;
    const { valid, errors } = await form.value?.validate();
    if (valid) {
        if (emailConfirmed.value) {
            // login to API
            loginLoading.value = false;

            let response: AxiosResponse = await loginEmail(email.value, password.value);
            if(response.request.status == 401){
                // wrong password

                passwordErrorMessages.value = "Invalid Password";
                validateOn.value = "input";
            }else{
                //login success
                let user: User = User.From(response.data.user);
                router.replace({"name": "home"});
                return;
            }

        } else {
            // expand password field
            // Email Validation Form VALID

            //Check Email in API
            let response = await checkEmail(email.value);
            emailConfirmed.value = response.status < 300;

            if (!emailConfirmed.value) {
                // Email not found
                validateOn.value = "input";

                emailErrorMessages.value = "Email not found";
            }else if(emailConfirmed.value && email.value == response.data.email){
                // else -> emailConfirmed = true (v)
                emailConfirmed.value = true;
                emailErrorMessages.value = "";
            }
        }
    } else {
        validateOn.value = "input";
    }



    loginLoading.value = false;
}

// async function authTest(){
//     let response = await AxiosClient.getInstance().post(LOGIN_JWT_ENDPOINT, {}, {withCredentials: true});
//     console.log("AuthTest: ")
//     console.log(response);
// }

</script>

<style scoped></style>

<template>
    <v-container class="vh-100 d-flex flex-column">
        <v-sheet class="w-100 text-h2 text-center text-title mb-8">CMarket</v-sheet>
        <!-- <v-btn @click="authTest">TEST</v-btn> -->
        <v-row class="flex-1-1-100 d-flex align-center mt-2 justify-center px-10">
            <v-col class="text-center elevation-4 pa-10 mb-10" cols="12" sm="8" md="6" lg="4">
                <div class="text-h4 font-weight-bold">Login</div>
                <div class="text-subtitle-1 mb-6">Don't have an account? <RouterLink to="register">Register now
                    </RouterLink>
                </div>


                <v-form @submit.prevent :validate-on="validateOn" ref="form" class="text-left">
                    <div class="text-subtitle-1 text-medium-emphasis text-left">Email Address</div>
                    <v-text-field v-if=!emailConfirmed ref="emailRef" v-model="email" name="email" density="compact"
                        placeholder="Email address" prepend-inner-icon="mdi-email-outline" variant="outlined"
                        hint="Example: johndoe@mail.com" class="text-left" :class="{ 'mb-2': !emailConfirmed }"
                        :error-messages="emailErrorMessages" :readonly="emailConfirmed"
                        :rules="[(value: string) => notNullRules(value, 'Email'), emailRules]">
                    </v-text-field>
                    <div v-else class="d-flex justify-space-between align-center mb-3">
                        <div class="text-subtitle-1">{{ email }}</div>
                        <div class="text-subtitle-2 pointer" style="color:blue" @click="emailConfirmed = false">Change</div>
                    </div>

                    <div v-if="emailConfirmed">
                        <div class="text-subtitle-1 text-medium-emphasis text-left mt-1">Password</div>
                        <v-text-field :type="visible ? 'text' : 'password'" density="compact" v-model="password"
                            :error-messages="passwordErrorMessages" placeholder="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined" class="" :rules="[(v: string) => notNullRules(v, 'Password')]">
                            <template #append-inner>
                                <button @click="visible = !visible" tabindex="-1" class="pointer" style="color:grey">
                                    <v-icon v-if="visible">mdi-eye</v-icon>
                                    <v-icon v-else>mdi-eye-off</v-icon>
                                </button>
                            </template>
                        </v-text-field>

                        <div class="d-flex justify-space-between align-center mb-5 mt-0">
                            <v-checkbox hide-details density="compact" class="" color="primary" v-model="remember">
                                <template v-slot:label>
                                    <div class="text-body-2" color="grey">
                                        Remember Me
                                    </div>
                                </template>
                            </v-checkbox>
                            <RouterLink to="reset-password" class="text-body-2">Forgot Password?</RouterLink>
                        </div>
                    </div>

                    <v-btn block :loading="loginLoading" @click="login" class="" variant="tonal" color="blue-darken-1"
                        type="submit">Login</v-btn>
                </v-form>
                <div class="text-overline my-3">Or Login With</div>

                <!-- -->
                <div class="d-flex flex-column ga-2">
                    <v-btn prepend-icon="mdi-google" variant="outlined" :loading="googleLoading">Google</v-btn>
                    <v-btn prepend-icon="mdi-github" variant="outlined" :loading="githubLoading">Github</v-btn>
                </div>
                <!-- -->
            </v-col>
        </v-row>
    </v-container>
</template>