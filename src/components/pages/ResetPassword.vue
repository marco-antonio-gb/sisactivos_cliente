<template>
<v-app>
    <v-main>
        <v-container fill fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <v-card max-width="380" class="mx-auto" :flat="$vuetify.breakpoint.xs" :loading="onReset" :disabled="onReset">
                        <template slot="progress">
                            <v-progress-linear color="primary" absolute indeterminate></v-progress-linear>
                        </template>
                        <v-card-text class="pa-11 text-center" v-if="loadingToken">
                            <v-img src="@/assets/icons/mail-1021.svg" contain max-height="80" class="my-6"></v-img>
                            <div style="width:150px;" class="mx-auto mb-3">
                                <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
                            </div>
                            <p>Verificando token...</p>
                        </v-card-text>
                        <v-card-text class="pa-11 text-center" v-if="show_formReset">
                            <v-row class="flex-column mb-6">
                                <v-img src="@/assets/icons/login-password-11923.svg" contain max-height="80" class="mx-auto"></v-img>
                                <v-col>
                                    <h3>Establecer nueva contraseña</h3>
                                    <password-meter :password="password" class="my-2" />
                                    <span class="caption">La contraseña debe tener al menos 10 caracteres, incluye varias palabras y frases para hacerla mas segura.</span>
                                </v-col>
                                <v-form @submit.prevent="updatePasswordUser" lazy-validation ref="formReset">
                                    <v-col>
                                        <v-text-field @focus="$event.target.select()" validate-on-blur v-model="password" :rules="passRules" label="Nueva contraseña" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" @click:append="show1 = !show1" :disabled="onReset"></v-text-field>
                                        <v-text-field @focus="$event.target.select()" v-model="confirm_password" :rules="passRules.concat(passwordConfirmationRule)" label="Confirmar nueva contraseña" required :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" name="input-10-2" @click:append="show2 = !show2" :disabled="onReset"></v-text-field>
                                        <v-btn depressed color="primary" block :disabled="onReset" type="submit">
                                            <span v-if="onReset">
                                                Verificando...
                                            </span>
                                            <span v-else>Cambiar contraseña</span>
                                        </v-btn>
                                    </v-col>
                                </v-form>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card v-if="expiredToken" min-width="380" width="380" class="mx-auto login-pa">
                        <v-card-text class="pa-11 text-center">
                            <v-img eager src="@/assets/icons/expired.png" max-height="120" contain></v-img>
                            <loader :onLoading="onReset" :color="`primary`" />
                            <p class="body-2 mt-2">Este vínculo para restablecer la contraseña ha caducado. Vuela a intentarlo.</p>
                            <v-btn class="my-3" color="primary" depressed @click="$router.replace({path:'forgot-password'})">Volver a enviar correo</v-btn>
                        </v-card-text>
                    </v-card>
                    <v-card min-width="380" width="380" class="mx-auto login-pa" v-if="successReset">
                        <v-card-text class="pa-11 text-center">
                            <v-img src="@/assets/icons/check-symbol-4794.svg" max-height="90" contain class="my-6"></v-img>
                            <loader :onLoading="onReset" :color="`primary`" />
                            <p class="text-h6 font-weight-bold">Has cambiado con exito tu contraseña</p>
                            <v-btn depressed class="my-3" color="primary" @click="$router.replace({path:'login'})">Iniciar sesion</v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
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
    </v-main>
</v-app>
</template>
<script>
import passwordMeter from "vue-simple-password-meter";
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            successReset: false,
            expiredToken: false,
            show_formReset: false,
            onReset: false,
            show1: false,
            show2: false,
            show_version: false,
            submitted: false,
            gestion: year,
            name: process.env.VUE_APP_COMPANY_NAME,
            password: "",
            confirm_password: "",
            token: null,
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
            loadingToken: false
        };
    },
    components: {
        passwordMeter
    },
    created() {
        this.token = this.$route.query.token
        this.validateToken()
    },
    methods: {
        async validateToken() {
            this.loadingToken = true
            let res = await this.axios.post('/validate-token', {
                'token': this.$route.query.token
            });
            if (res.data.expired) {
                this.loadingToken = false
                this.expiredToken = true
                this.show_formReset = false
            } else {
                this.loadingToken = false
                this.show_formReset = true
            }
            this.successReset = false
            this.loadingToken = false
        },
        updatePasswordUser() {
            if (this.$refs.formReset.validate()) {
                this.onReset = true
             
                let data_request = {
                    password: this.password,
                    confirm_password: this.confirm_password,
                    token: this.$route.query.token
                };
                this.axios
                    .post('/set-password-reset', data_request)
                    .then(response => {
                        if (response.data.success) {
                            this.onReset = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "success"
                            );
                            this.show1 = false
                            this.show2 = false
                            this.show_formReset=false
							this.successReset = true
                            // this.$refs.formReset.reset()
                        } else {
                            this.successReset = false
                            this.onReset = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "error"
                            );
                        }
                    })
                    .catch(error => {
                        this.successReset = false
                        this.onReset = false
                        if (error.response) {
                            this.showSnackbar(
                                error.response.data.message,
                                true,
                                "error"
                            );
                        } else if (error.request) {
                            this.showSnackbar(
                                "No se puede conectar con el servidor",
                                true,
                                "error"
                            );
                        } else {
                            this.showSnackbar(error.message, true, "error");
                        }
                    });
            }
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.password === this.confirm_password || "La contraseña no coincide";
        },
    },
};
</script>
<style scoped>
.input_container {
    padding: 5px;
    list-style-type: none;
    text-align: left
}
</style>
