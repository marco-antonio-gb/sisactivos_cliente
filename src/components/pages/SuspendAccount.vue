<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="500">
            <div class="display-1 font-weight-bold">
                <v-img src="@/assets/images/undraw_security_re_a2rk.svg" width="200" class="mx-auto"></v-img>
                <h5 class="my-10">Desactivar cuenta</h5>
            </div>
            <div class="mt-3 mb-4">
                <p>
                    <strong>La desactivacion de la cuenta es permanente.</strong> Ya no
                    podras acceder al sistema, pero tu informacion y tu actividad
                    permanecera.
                </p>
            </div>
            <v-btn @click="$router.go(-1)" class="mr-2" text> Cancelar </v-btn>
            <v-btn color="error" depressed @click="blockUserAccount()" :loading="onSave"  :disabled="onSave"> Desactivar cuenta </v-btn>
        </v-card>
    </v-layout>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{ snackbar.message_snack }}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>

</v-container>
</template>

<script>
import {
    mapActions,
     
} from 'vuex'
export default {
    name: "error-403",
    data() {
        return {
            loginRedirect: false,
            onSave: false,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },

        };
    },
    mounted() {},
    methods: {
        ...mapActions({
            signOutAction: "auth/signOut",
        }),
        async blockUserAccount( ) {
            this.onSave=true
            if (this.$store.state.auth.user.data.usuario_id ===
                this.$route.params.usuario_id) {
                let user = {
                    usuario_id: this.$route.params.usuario_id,
                };
                
                try {
                    let response = await this.axios.post('/suspend-account', user);
                    if (response.data.success) {
                         this.onSave=false
                        this.showSnackbar(response.data.message, true, "success");
                        setTimeout(() => {
                             this.signOutAction()
                                .then(() => {
                                    this.$router.replace({
                                        name: "login",
                                    });
                                })
                                .catch((error) => {
                                    if (error.response.status === 401) {
                                        this.$router.replace({
                                            name: "login",
                                        });
                                        this.signOutAction();
                                    }
                                });
                        }, 1500);
                    } else {
                        this.showSnackbar(response.data.message, true, "error");
                    }
                } catch (error) {
                     this.onSave=false
                    this.showSnackbar(
                        error.name + ": " + error.response.data.message,
                        true,
                        "error"
                    );
                }
            } else {
                this.$router.go(-1)
            }
        },
    },
};
</script>
