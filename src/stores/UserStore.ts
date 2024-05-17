// Utilities
import { defineStore } from 'pinia'
import { User } from '../models/User';
import { Role } from '../models/Role';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  getters: {
    getUser(): User | null{
        return this.user ?? null;
    },
    getUserRole(): Role | null{
        return this.user?.role ?? null;
    }
  },
  actions: {
    setUser(user: User){
        this.user = user;
    }
  }
})
