<template>
<v-app id="inspire">
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex>
                    <v-form @submit.prevent="handleSubmit" lazy-validation ref="form">
                        <v-card max-width="380" class="mx-auto" :flat="$vuetify.breakpoint.mobile" :loading="submitted" :disabled="submitted">
                            <template slot="progress">
                                <v-progress-linear color="primary" absolute indeterminate></v-progress-linear>
                            </template>
                            <v-card-text class="pa-11">
                                <v-img src="@/assets/warehouse-svgrepo-com.svg" contain max-width="80" class="mx-auto"></v-img>
                                <div class="text-center mt-4 mb-6">
                                    <h3>Iniciar sesion</h3>
                                    <p>Ingrese tu correo y contraseña</p>
                                </div>

                                <v-text-field validate-on-blur v-model="form.correo" :rules="emailRules" prepend-icon="mdi-account" name="Correo" label="Correo" type="text"></v-text-field>
                                <v-text-field validate-on-blur v-model="form.password" :rules="passRules" prepend-icon="mdi-lock" name="Contraseña" label="Contraseña" type="password"></v-text-field>
                                <v-alert class="mt-3 mb-3" color="error" @input="clearError" dense dismissible text v-if="error"><small>{{ error }}</small></v-alert>
                                <div class="mb-2 mt-3">
                                    <router-link class="text-decoration-none body-2" to="/forgot-password">¿No recuerdas la contraseña?</router-link>
                                </div>
                                <div class="mb-6">
                                    <v-btn color="primary" block :disabled="submitted" type="submit">
                                        <span v-if="submitted">
                                            Verificando...
                                        </span>
                                        <span v-else> Ingresar </span>
                                    </v-btn>
                                </div>
                                <div class="caption text-center grey--text">
                                    <span>{{ app_name }} - Version {{ version }}</span>
                                    <h5>
                                        &copy;
                                        {{ new Date().getFullYear() }}
                                        {{ name }}.
                                    </h5>
                                </div>
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
import AuthLayoutServices from '../services/AuthLayoutServices'
export default {
    name: "Login",
    data() {
        const year = new Date().getFullYear();
        return {
            error: "",
            show_version: false,
            submitted: false,
            gestion: year,
            name: process.env.VUE_APP_COMPANY_NAME,
            form: {
                correo: "",
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
    mixins: [
        AuthLayoutServices
    ]

};
</script>
