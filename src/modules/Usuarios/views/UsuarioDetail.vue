<template>
<v-container fluid>
    <!-- ---- HEADER ------ -->
    <loader :onLoading="onLoading" />
    <div class="d-flex justify-space-between d-flex align-center   mb-3">
        <goback />
        <v-spacer></v-spacer>
        <v-btn depressed @click="$router.push({path:'/usuarios/update/'+$route.params.idUsuario})">
            <span>
                <v-icon>mdi-pencil-outline</v-icon> Editar
            </span>
        </v-btn>
    </div>
    <divide title="Informacion personal"></divide>
    <v-card class="mb-3">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="3" class="text-center">
                    <v-card flat max-width="200" class="transparent mx-auto">
                       
                        <v-avatar size="200" class="profile-pic-update  avatar-shadow"  >
                            <v-img :src="url+usuario.foto" @error="usuario.foto=null" alt="Avatar usuario " v-if="usuario.foto"></v-img>
                            <v-avatar :color="usuario.avatar_color" size="200" v-else>
                                <span class="white--text display-4 font-weight-regular">{{usuario.avatar_letter}}</span>
                            </v-avatar>
                        </v-avatar>
                       
                        <v-fab-transition>
                            <v-btn small title="Cambiar imagen" absolute bottom right fab @click="openDialogImage">
                                <v-icon>mdi-camera</v-icon>
                            </v-btn>
                        </v-fab-transition>
                    </v-card>

                </v-col>
                <v-col cols="12" sm="9">
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-account
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="title">{{usuario.nombres}} {{usuario.paterno}} {{usuario.materno}}</v-list-item-title>
                                <v-list-item-subtitle>{{usuario.cargo}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-progress-circular v-if="onLoading" size="20" width="2" indeterminate color="primary"></v-progress-circular>
                                <v-chip :color="usuario.estado?'success':'error'" small v-else>
                                    <span v-if="usuario.estado">Activado</span>
                                    <span v-else>Desactivado</span>
                                </v-chip>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                    <div class="d-flex justify-space-between">
                        <v-list-item dense>
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-card
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{usuario.ci}} {{usuario.ci_ext}}</v-list-item-title>
                                <v-list-item-subtitle>Cedula de Identidad</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense>
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-phone
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{usuario.telefono}}</v-list-item-title>
                                <v-list-item-subtitle>Telefono</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense>
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-email
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{usuario.correo}}</v-list-item-title>
                                <v-list-item-subtitle>Correo</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                    <v-list dense>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>
                                    mdi-map
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{usuario.direccion}}</v-list-item-title>
                                <v-list-item-subtitle>Direccion</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <divide title="Roles y Permisos"></divide>
    <v-card class="mb-3">
        <v-card-text>
            <div v-for="rol in usuario.roles" :key="rol.id" class="ma-4">
                <h3 class="text--primary mb-2">
                    Rol: {{rol}}
                </h3>
                <span v-for="permiso in usuario.permisos" :key="permiso">
                    <v-chip small class="mr-1 mb-1"> {{permiso}}</v-chip>
                </span>
            </div>
        </v-card-text>
    </v-card>
    <divide title="Seguridad"></divide>
    <v-card class="mb-10">
        <v-card-text>
            <v-row>
                <!-- <v-col cols="4">
                    <p>Cambiar contraseña</p>
                </v-col>
                <v-col cols="8">
                    <v-btn @click.prevent="passwordUpdate">Cambiar </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col> -->
                <v-col cols="4">
                    <p>Restablecer contraseña</p>
                </v-col>
                <v-col cols="8">
                    <p>Envie un correo electronico para que el usuario restablesca su nueva contraseña.</p>
                    <v-btn depressed @click.prevent="sendEmailReset(usuario.correo)">Enviar correo </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
                <v-col cols="4">
                    <p>Activar/Desactivar cuenta</p>
                </v-col>
                <v-col cols="8">
                    <p v-if="usuario.estado">Esta accion denegara el acceso al usuario, toda la informacion generada por el usuario permanecera intacta.</p>
                    <p v-else>Esta accion permitira el acceso al usuario.</p>
                    <v-btn @click.prevent="suspend(usuario)" v-if="usuario.estado" color="error" depressed>Desactivar cuenta</v-btn>
                    <v-btn @click.prevent="suspend(usuario)" v-else color="success" depressed>Activar cuenta</v-btn>
                </v-col>
            </v-row>
            <div>
            </div>
        </v-card-text>
    </v-card>
    <ConfirmDlg ref="confirm" />
    <UpdateImage :dialogImage.sync="dialogImage" @updateParentImage="updateParentImage"></UpdateImage>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
    <updatePassword :dialogUpdatePass.sync="dialogUpdatePass" @clickUpdatePass="clickUpdatePass" :usuario_id="this.$route.params.usuario_id" />
</v-container>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import updatePassword from '../components/updatePassword.vue'
import UsuarioService from '../services/UsuarioService'
export default {
    data() {
        return {
            dialogImage: false,
            url: process.env.VUE_APP_URL_MEDIA + '/home/usuarios/fotos/',
            pass_data: " ",
            onblockUser: false,
            dialogUpdatePass: false,
            onLoading: false,
            toggle_exclusive: undefined,
            usuario: {
                paterno: '',
                materno: '',
                nombres: '',
                ci: '',
                ci_ext: '',
                telefono: '',
                celular: '',
                direccion: '',
                cargo: '',
                foto: '',
                email: '',
                estado: null
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    mounted() {
        this.show(this.$route.params.idUsuario)
    },
    mixins: [
        UsuarioService,
    ],
    methods: {
        ...mapActions({
            signOut: 'auth/signOut',
        }),
        getColor(estado) {
            if (estado === 0) return 'red'
            else if (estado === 1) return 'green'
            else return 'primary'
        },
        getLabel(estado) {
            if (estado === 1) return 'activa'
            else if (estado === 0) return 'suspendida'
            else return 'Error'
        },
        clickUpdatePass(data) {
            if (data.success) {
                this.signOut()
            }
        },
        passwordUpdate() {
            this.dialogUpdatePass = true
        },
        blockUser(data) {
            console.log(data)
        },
        copyToClipboard(value) {
            navigator.clipboard.writeText(value)
            this.showSnackbar("Contraseña copiado al portapapeles ",
                true,
                "success"
            );
        },
        resetPassword(correo) {
            let mail = {
                email: correo
            };
            this.axios
                .post('/forgot-password', mail)
                .then(response => {
                    if (response.data.success) {
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "success"
                        );
                        this.$refs.confirm.cancel()
                        // this.copyToClipboard(response.data.newPassword)
                    } else {
                        this.showSnackbar(
                            response.data.message,
                            true,
                            "error"
                        );
                    }
                })
                .catch(error => {
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
        },
        ...mapActions({
            signOutAction: "auth/signOut",
            changTheme: "auth/setTheme"
        }),
        async sendEmailReset(correo) {
            if (
                await this.$refs.confirm.open(
                    "Restablecer contraseña",
                    "Se enviara un correo a: <b>" + correo + "</b> ¿Seguro que quieres continuar?"
                )
            ) {
                this.resetPassword(correo);
            }
        },
        openDialogImage() {
            this.dialogImage = true
        },
        updateParentImage() {
            this.show(this.$route.params.idUsuario)
        }
    },
    components: {
        updatePassword,
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
        UpdateImage: () => import('../components/updateImage.vue')
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
        }),
        loginData() {
            return this.authenticated.data
        }
    }
}
</script>
