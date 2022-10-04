<template>
<v-layout row justify-center>
    <v-dialog v-model="dialogUpdatePass" persistent max-width="450">
        <v-form ref="updatePassForm" @submit.prevent="updatePasswordUser" lazy-validation>
            <v-card>
                <v-card-title>
                    Cambiar Contraseña
                </v-card-title>
                <v-card-text>
                    <div >
                        <v-text-field class="mb-3" label="Contraseña actual *" :rules="passwordRules" type="password" @focus="$event.target.select()" outlined dense hide-details="auto" required v-model="userInfo.old_password" :disabled="onSave"></v-text-field>
                        <v-text-field class="mb-3" label="Nueva contraseña *" :rules="passwordRules" @focus="$event.target.select()" outlined dense hide-details="auto" required v-model="userInfo.new_password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" @click:append="show1 = !show1" :disabled="onSave"></v-text-field>
                        <v-text-field class="mb-3" label="Confirmar nueva contraseña *" :rules="confirmPasswordRules.concat(passwordConfirmationRule)" required @focus="$event.target.select()" outlined dense hide-details="auto" v-model="userInfo.confirm_password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'" name="input-10-2" @click:append="show2 = !show2" :disabled="onSave"></v-text-field>
                    </div>
                   
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn @click.native="closeUpdate" text class="mr-2">
                        Cancelar
                    </v-btn>
                    <v-btn depressed :loading="onSave" :disabled="onSave" type="submit" class="primary">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-layout>
</template>
<script>
export default {
    data() {
        return {
            absolute: true,
            overlay: false,
            onSave: false,
            show1: false,
            show2: false,
            userInfo: {
                old_password: '',
                new_password: '',
                confirm_password:''
            },
             
            passwordRules: [v => !!v || "Contraseña es obligatoria"],
            confirmPasswordRules: [v => !!v || "Contraseña es obligatoria"],
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    
    props: {
        dialogUpdatePass: {
            default: false
        },
        usuario_id: {
            default: null
        },
        statusUpdateCircle: {
            default: false
        },
    },
    mixins: [],
    components: {
    },
    methods: {
      
        updatePasswordUser() {
            if (this.$refs.updatePassForm.validate()) {
                this.onSave = true
                this.overlay = true
                this.axios
                    .post('/change-password', this.userInfo)
                    .then(response => {
                        if (response.data.success) {
                            this.onSave = false
                            this.overlay = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "success"
                            );
                            this.show1 = false
                            this.show2 = false
                            this.$refs.updatePassForm.reset()
                            this.$emit('update:dialogUpdatePass', false)
                            this.$emit('clickUpdatePass', response.data);
                        } else {
                            this.onSave = false
                            this.overlay = false
                            this.showSnackbar(
                                response.data.message,
                                true,
                                "error"
                            );
                        }
                    })
                    .catch(error => {
                        this.onSave = false
                        this.overlay = false
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
                this.userInfo.new_password === this.userInfo.confirm_password || "La contraseña no coincide";
        }
    },
    watch: {
        dialogUpdatePass() {
            this.$nextTick(() => {
                this.$refs.updatePassForm.resetValidation()
            });
            if (this.dialogUpdatePass && this.usuario_id != null) {
                this.userInfo.idUsuario = {
                    ...this.usuario_id
                }
            }
        }
    }
}
</script>
<style>
</style>
