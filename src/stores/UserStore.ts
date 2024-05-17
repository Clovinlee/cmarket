// Utilities
import { defineStore } from 'pinia'
import { User } from '../models/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: User
  }),
  getters: {
    getUser(){
        return this.user ?? null;
    }
  },
  actions: {
    setUser(user: User){
        this.user = user;
    }
  }
})
