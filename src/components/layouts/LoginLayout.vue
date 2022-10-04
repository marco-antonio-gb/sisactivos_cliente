<template>
<v-app>
    <v-container class="grow d-flex flex-column flex-nowrap login-back">
        <v-layout align-center justify-center>
            <v-card min-width="360" width="400" class="mx-auto login-pa" :disabled="submitted" outlined>
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class="text-center ">
                        <v-img src="@/assets/logo1.svg" contain max-width="40%" class="mx-auto  "></v-img>
                        <h3>Iniciar sesion</h3>
                    </v-col>
                    
                    <v-form @submit.prevent="handleSubmit" lazy-validation ref="form">
                        <v-col>
                            <v-text-field    outlined  validate-on-blur v-model="form.username" :rules="emailRules" label="Correo electronico" required></v-text-field>
                            <v-text-field   outlined  validate-on-blur v-model="form.password" :rules="passRules" type="password" label="Contraseña" required></v-text-field>
                            <v-btn depressed large  color="primary" block :disabled="form.password.length === 0 || form.username.length === 0 || submitted" type="submit">
                                <span v-if="submitted">
                                    Verificando...
                                </span>
                                <span v-else> Ingresar </span>
                            </v-btn>
                            
                            <v-alert class="mt-3 mb-3" color="error" dense dismissible text v-if="error"><small>{{ error }}</small></v-alert>
                            <v-btn block text color="primary" class="caption  my-3"   to="/forgot-password">¿No recuerdas la contraseña?</v-btn>
                            <div class="text-center grey--text small-text-lineheight">
                                <small>{{ app_name }} - Version {{ version }}</small>
                                <!-- <p class="pa-0 ma-0">
                                    <small> &copy;
                                        {{ new Date().getFullYear() }}
                                        {{ name }}.
                                    </small>
                                </p> -->
                            </div>
                        </v-col>
                    </v-form>
                    <div></div>
                </v-row>
            </v-card>
        </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{ snackbar.message_snack }}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-app>
</template>
<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            show_version: false,
            submitted: false,
            gestion: year,
            name: process.env.VUE_APP_COMPANY_NAME,
            form: {
                username: "",
                password: "",
            },
            emailRules: [
                (v) => !!v || "Correo electronico obligatorio",
                // v => /.+@.+/.test(v) || 'El email debe ser válido'
                (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
                (v) =>
                /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    v
                ) || "El nombre de usuario debe ser válido",
                // v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passRules: [
                (v) => !!v || "Contraseña obligatoria",
                (v) => v.length >= 6 || "Ingrese al menos 6 caracteres",
            ],
            version: process.env.VUE_APP_VERSION,
            app_name: process.env.VUE_APP_TITLE,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },
        };
    },
    methods: {
        onResize() {
            this.windowHeight = window.innerWidth;
        },
        ...mapActions({
            signIn: "auth/signIn",
            attemp: "auth/attempt",
            seterror: "auth/errorAction",
            setroute: "auth/set_route",
        }),
        handleSubmit() {
            if (navigator.onLine) {
                if (this.$refs.form.validate()) {
                    this.submitted = true;
                    this.signIn(this.form)
                        .then((response) => {
                            if (response.data.success) {
                                this.attemp(response.data.access_token)
                                    .then(() => {
                                        this.setroute();
                                    })
                                    .catch((error) => {
                                        this.seterror(error);
                                    });
                            } else {
                                this.seterror(response.data.message);
                            }
                            this.submitted = false;
                        })
                        .catch((err) => {
                            this.submitted = false;
                            if (err.response) {
                                this.seterror(err.response.data.error);
                            } else {
                                this.seterror("No se puede conectar al servidor");
                            }
                        });
                } else {
                    this.seterror("Complete los datos requeridos");
                }
            } else {
                this.seterror("No se puede conectar a Internet.");
            }
        },
    },
    computed: {
        ...mapGetters({
            error: "auth/error",
        }),
    },
};
</script>
