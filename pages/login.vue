<template>
    <div>
        <Header loginPage />
        <div class="container">
            <div class="row valign-wrapper">
                <div class="col s6 center-align">
                    <form id="form" class="row center">
                        <div class="input-field col s12">
                            <input
                                v-model="email"
                                class="validate"
                                id="email" 
                                type="email" 
                                autocomplete="off"
                            >
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input
                                v-model="password"
                                class="validate"
                                id="password" 
                                type="password" 
                                autocomplete="off"
                            >
                            <label for="password">Password</label>
                        </div>
                        <div class="col s12">
                            <a 
                                class="waves-effect waves-light green btn-small"
                                @click="loginEmail"
                            >
                                Login In
                            </a>
                        </div>
                    </form>
                </div>
                <div class="col s6 center">
                    <h3 class="grey-text text-darken-1">Login with Social</h3>
                    <div>
                        <a 
                            class="waves-effect waves-light red btn-small"
                            @click="loginGoogle"
                        >
                            Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/sections/main/Header";

export default {
  components: {
    Header
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    this.check;
  },
  methods: {
    loginEmail() {},
    loginGoogle() {
      this.$store
        .dispatch("signInWithGoogle")
        .then(() => {
          this.$toast.success("Logging...", { icon: "fingerprint" });
          console.log("inside then statement on login");
        })
        .catch(e => {
          this.$toast.error("Error while logging", { icon: "fingerprint" });
          console.log(e.message);
        });
    },
    check() {
      console.log(this.$auth.loggedIn);
    }
  }
};
</script>

<style lang="scss" scoped>
#form {
  margin: 40px;
}
</style>
