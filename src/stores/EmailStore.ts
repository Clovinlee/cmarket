// Utilities
import { defineStore } from 'pinia'

export const useEmailStore = defineStore('email', {
  state: () => ({
    emailSent: "",
  }),
  getters: {
    getEmailSent(){
      const email = this.emailSent;
      return email;
    }
  },
  actions: {
    setEmailSent(email: string){
      this.emailSent = email;
    }
  }
})
