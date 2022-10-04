<template>
<v-app>
    <v-container class="grow d-flex flex-column flex-nowrap login-back">
        <v-layout align-center justify-center>
            <v-card min-width="360" width="400" class="mx-auto login-pa" :disabled="submitted" outlined v-if="showForm">
                <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class=" ">
                        <!-- <v-icon size="45" color="primary">mdi-lock</v-icon> -->
                        <p class="text-h6 font-weight-bold">Restablecer la contraseña</p>
                        <p class="body-2">Introduce la dirección de correo electrónico asociada a tu cuenta y te enviaremos un vínculo para restablecer tu contraseña.</p>
                    </v-col>
                    <v-form @submit.prevent="submitForgotPass" ref="formForgotPass">
                        <v-col>
                            <v-text-field outlined validate-on-blur v-model="form.email" :rules="emailRules" label="Correo electronico" required ref="inputforgot"></v-text-field>
                            <p class="red--text font-weight-bold body-2" v-if="show_error">{{error}}</p>
                            <v-btn large depressed color="primary" :loading="submitted" block :disabled="submitted" type="submit">
                                <span v-if="submitted">
                                    Verificando...
                                </span>
                                <span v-else> Continuar </span>
                            </v-btn>
                            <v-btn block class="my-3" color="primary" text to="/login">Volver a inicio de sesión</v-btn>
                        </v-col>
                    </v-form>
                   
                </v-row>
            </v-card>
            <v-card v-else min-width="360" width="500" class="mx-auto login-pa"   outlined >
              <!-- <v-card min-width="360" class="mx-auto pa-8" :disabled="submitted"   :flat="windowHeight>460?false:true" outlined> -->
                <loader :onLoading="submitted" :color="`primary`" />
                <v-row class="flex-column">
                    <v-col class=" ">
                        <!-- <v-icon size="45" color="primary">mdi-lock</v-icon> -->
                        <p class="text-h6 font-weight-bold">Gracias. Comprueba si has recibido un correo electronico con las instrucciones para restablecer la contraseña.</p>
                        <p class="body-2">Si no has recibo un correo electronico pasados 5 minutos, revisa tu carpeta de correo no deseado.</p>
                        <v-btn block class="my-3" color="primary" text to="/login">Volver a inicio de sesión</v-btn>
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
            showForm:true,
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
        async submitForgotPass() {
            if (this.$refs.formForgotPass.validate()) {
                this.submitted = true
                this.error = ""
                this.show_error = false
                try {
                    let response = await this.axios.post('/forgot-password', this.form);
                    if (response.data.success) {
                        this.showForm=false
                    } else {
                        this.$nextTick(() => {
                            this.showForm=true
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
