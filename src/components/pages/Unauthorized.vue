<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="440">
            <v-img eager src="@/assets/icons/login-password-11923.svg" max-height="60" contain class="mx-auto mb-3"></v-img>
            <h2>Acceso denegado...</h2>
            <p class="grey--text text--darken-1">No tiene permisos para ver el contenido.</p>
            <v-btn color="primary" depressed rounded @click="$router.go(-1)" class="mt-3" v-if="loginRedirect">
                Volver a la pagina anterior
            </v-btn>
            <v-btn large to="/login" v-else>
                Iniciar sesion
            </v-btn>
        </v-card>
    </v-layout>
</v-container>
</template>

<script>
import store from "@/store";
export default {
    name: 'error-403',
    data() {
        return {
            loginRedirect: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            var logIn = store.getters["auth/authenticated"];
            if (logIn) {
                this.loginRedirect = true
            } else {
                this.loginRedirect = false
            }
        }
    }
}
</script>
