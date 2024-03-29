import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id is only required for devtools with the Pinia store
  id: 'loggedinUser',
  //central part of the store
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      role: "",
    }
  },
  // equivalent to methods in components, perfect to define business logic
  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password);
        this.$patch({
          isLoggedIn: response.isAllowed,
          name: response.name,
          role: response.role,
        })
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.$patch({
        name: "",
        isLoggedIn: false,
        role:"",
      });
    }
  },
  // prevents user from being logged out after refreshing
  persist: {storage: sessionStorage}
});

//simulate a login - we will later use our backend to handle authentication
function apiLogin(u, p) {
  if (u === "ed" && p === "ed") return Promise.resolve({ isAllowed: true, name: "John Doe" , role: 'admin'});
  if (u === "test" && p === "test") return Promise.resolve({ isAllowed: true, name: "default-user" , role: 'user'});
  return Promise.reject(new Error("invalid credentials"));
}