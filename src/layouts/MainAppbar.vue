<script setup lang='ts'>

import { onMounted, Ref, ref } from "vue";
import { User } from "../models/User";
import { useUserStore } from "../stores/UserStore"
import { authLogout } from "../pages/Auth/AuthScript";
import { useRouter } from "vue-router";

let userStore = useUserStore();
const user: Ref<User | null> = ref<User | null>(null);

const loadingUserInformation: Ref<boolean> = ref(true);
const loadingUserLogout: Ref<boolean> = ref(false);

const router = useRouter();


onMounted(() => {
  user.value = userStore.getUser;
  loadingUserInformation.value = false;
  console.log(user.value);
});

function getInitials(): string | null {
  if (user.value) {
    const splitInitials = user.value.name.split(" ");
    if (splitInitials.length === 1) {
      return splitInitials[0].charAt(0);
    } else {
      return splitInitials[0].charAt(0) + splitInitials[splitInitials.length - 1].charAt(0);
    }
  } else {
    return null
  }
}

async function logout() {
  loadingUserLogout.value = true;

  const logoutSuccess: boolean = await authLogout();
  if (logoutSuccess) {
    window.location.reload();
  }
  loadingUserLogout.value = false;
}

</script>

<template>
  <v-app-bar class="px-3">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-app-bar-title>CMarket</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu min-width="200px" rounded v-if="!loadingUserInformation.value && user">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown">
            <span class="text-h5">{{ getInitials() }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown mb-3">
              <span class="text-h5">{{ getInitials() }}</span>
            </v-avatar>
            <h3>{{ user.name }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>

            <RouterLink :to="{ name: 'profile' }">
              <v-btn variant="text" rounded class="text-black">
                Profile
              </v-btn>
            </RouterLink>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded @click="logout">
              Logout
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>

    <span v-else class="d-flex ga-3">
      <RouterLink :to="{ name: 'login' }">
        <v-btn color="primary" variant="elevated">Login</v-btn>
      </RouterLink>
      <RouterLink :to="{ name: 'register' }">
        <v-btn color="primary" variant="outlined">Register</v-btn>
      </RouterLink>
    </span>

  </v-app-bar>
</template>