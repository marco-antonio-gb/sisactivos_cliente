<template>
<v-app>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <v-form @submit.prevent="submitForgotPass" ref="formForgotPass">
                        <v-card max-width="380" class="mx-auto" :flat="$vuetify.breakpoint.xs" :loading="submitted" :disabled="submitted">
                            <template slot="progress">
                                <v-progress-linear color="primary" absolute indeterminate></v-progress-linear>
                            </template>
                            <v-card-text class="pa-11 text-center" v-if="showForm">
                                <v-img src="@/assets/icons/mail-1021.svg" contain max-height="80" class="my-3"></v-img>
                                <h3>Restablecer la contraseña</h3>
                                <p class="body-2">Ingresa la dirección de correo electrónico de tu cuenta.</p>
                                <v-text-field class="mt-6" validate-on-blur v-model="form.email" :rules="emailRules" label="Correo electronico" required ref="inputforgot"></v-text-field>
                                <v-alert   color="error" @input="clearError" dense dismissible text v-if="show_error"><small>{{ error }}</small></v-alert>
                                <v-btn class="my-3" depressed color="primary" block :disabled="submitted" type="submit">
                                    <span v-if="submitted">
                                        Enviando correo...
                                    </span>
                                    <span v-else> Continuar </span>
                                </v-btn>
                                <p class="my-6 custom-link" @click="$router.push({name:'login'})">Volver a inicio de sesión</p>

                            </v-card-text>
                            <v-card-text class="pa-11 text-center" v-else>
                                <v-img src="@/assets/icons/mail-1013.svg" contain max-height="120"></v-img>
                                <h3>Revisa tu correo electronico con las instrucciones para restablecer la contraseña.</h3>
                                <p class="body-2">Tambien revisa tu carpeta de correo no deseado.</p>
                                <p class="my-3 custom-link" @click="$router.push({name:'login'})">Ir a inicio de sesión</p>
                            </v-card-text>
                        </v-card>
                    </v-form>

                </v-flex>
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
    </v-main>
</v-app>
</template>

<script>
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            showForm: true,
            show_error: false,
            error: "",
            show_version: false,
            submitted: false,
            gestion: year,
            name: process.env.VUE_APP_COMPANY_NAME,
            form: {
                email: "",
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
        resetForm() {
            this.showForm = true
            this.$refs.formForgotPass.reset()
            this.$refs.inputforgot.$refs.input.focus()

        },
		clearError(){
            this.error=""
        },
        async submitForgotPass() {
            if (this.$refs.formForgotPass.validate()) {
                this.submitted = true
                this.error = ""
                this.show_error = false
                try {
                    let response = await this.axios.post('/forgot-password', this.form);
                    if (response.data.success) {
                        this.showForm = false
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                    } else {
                        this.$nextTick(() => {
                            this.showForm = true
                            this.show_error = true
                            this.error = response.data.message
                            this.$refs.inputforgot.$refs.input.focus()
                        })
                    }
                } catch (error) {
                    this.showSnackbar(
                        error.name + ": " + error.response.data.message,
                        true,
                        "error"
                    );
                } finally {
                    this.submitted = false
                }
            }
        },
    },
};
</script>
