<template>
<v-app>
    <v-container class="grow d-flex flex-column flex-nowrap login-back">
        <v-layout align-center justify-center>
            <v-card min-width="360" width="400" class="mx-auto login-pa" :disabled="submitted" outlined v-if="show_formReset">
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col>
                        <p class="text-h6 font-weight-bold">Restablecer contraseña</p>
                    </v-col>
                    <v-form @submit.prevent="updatePasswordUser" lazy-validation ref="formReset">
                        <v-col>
                            <v-text-field class="mb-3" @focus="$event.target.select()" outlined validate-on-blur v-model="password" :rules="passRules" label="Contraseña" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" @click:append="show1 = !show1" :disabled="onSave"></v-text-field>
                            <v-text-field class="mb-3" @focus="$event.target.select()" outlined v-model="confirm_password" :rules="passRules.concat(passwordConfirmationRule)" label="Confirmar contraseña" required :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" name="input-10-2" @click:append="show2 = !show2" :disabled="onSave"></v-text-field>
                            <v-btn depressed color="primary" large block :disabled="submitted" type="submit">
                                <span v-if="submitted">
                                    Verificando...
                                </span>
                                <span v-else>Continuar</span>
                            </v-btn>
                        </v-col>
                    </v-form>
                    <div></div>
                </v-row>
            </v-card>
            <v-card v-if="expiredToken" min-width="360" width="500" class="mx-auto login-pa" outlined>
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class="text-center">
                        <v-icon size="30" color="gray">mdi-alert</v-icon>

                        <p class="body-2 mt-2">Este vínculo para restablecer la contraseña ha caducado.</p>
                        <v-btn block class="my-3" style="text-transform:inherit !important;" color="primary" text to="/login">Intenta restablecer tu contraseña nuevamente.</v-btn>
                    </v-col>

                </v-row>
            </v-card>
            <v-card min-width="360" width="500" class="mx-auto login-pa" outlined v-if="successReset">
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class="text-center">
                        <p class="text-h6 font-weight-bold">Has cambiado con exito tu contraseña</p>

                        <v-btn large class="my-3" color="primary" to="/login">Iniciar sesion</v-btn>
                    </v-col>

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
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            successReset:false,
            expiredToken:false,
            show_formReset: true,
            onSave: false,
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
        };
    },
    created() {
        this.token = this.$route.query.token
        this.validateToken()
    },
    methods: {
        async validateToken() {
            let res = await this.axios.post('/validate-token', {
                'token': this.$route.query.token
            });
            if (res.data.expired) {
                this.expiredToken=true
                this.show_formReset = false
            } else {
                this.show_formReset = true
            }
            this.successReset=false
        },
        updatePasswordUser() {
            if (this.$refs.formReset.validate()) {
                this.onSave = true
                this.overlay = true
                
                let data_request = {
                    password: this.password,
                    confirm_password: this.confirm_password,
                    token: this.$route.query.token
                };
                this.axios
                    .post('/set-password-reset', data_request)
                    .then(response => {
                        if (response.data.success) {
                            this.onSave = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "success"
                            );
                            this.show1 = false
                            this.show2 = false
                            this.$refs.formReset.reset()
                            this.successReset=true
                        } else {
                            this.successReset=false
                            this.onSave = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "error"
                            );
                        }
                    })
                    .catch(error => {
                        this.successReset=false
                        this.onSave = false
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
