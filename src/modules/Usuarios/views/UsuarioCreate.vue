<template>
<div>
    <div class="d-flex justify-space-between d-flex align-center  mb-3">
        <goback />
        <div>
            <!-- Contenido extra -->
        </div>
    </div>
    <!-- ------------------- CONTENIDO PRINCIPAL ------------------------ -->
    <v-form ref="createUsuarioForm" @submit.prevent="submitUsuarioCreate" enctype="multipart/form-data">
        <v-card flat>
            <v-card-text>
                <v-row>
                    <!-- <ContainerUserImage></ContainerUserImage> -->
                    <v-col>
                        <ContainerUserImage @finalImageResult="finalImageResult"></ContainerUserImage>
                    </v-col>
                    <v-col cols="8" sm="8">
                        <divide title="Informacion personal" class="mb-6"></divide>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Paterno" hide-details="auto" dense outlined required v-model="usuario.paterno"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Materno" hide-details="auto" dense outlined required v-model="usuario.materno"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Nombres *" hide-details="auto" dense outlined :rules="nombresRules" required v-model="usuario.nombres">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-text-field label="Cedula de Identidad *" hide-details="auto" dense outlined required v-model="usuario.ci" :rules="ciRules">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-row>
                                    <v-col v-if="new_ext">
                                        <v-text-field clearable @click:clear="new_ext = false" ref="newext" v-model="usuario.ci_ext" value="" hide-details="auto" dense outlined label="Nueva extencion" autofocus :rules="ciExtRules"></v-text-field>
                                    </v-col>
                                    <v-col v-else>
                                        <v-select hide-details="auto" dense outlined v-model="usuario.ci_ext" ref="extci" :rules="ciExtRules" item-value="value" item-text="text" :items="options_ci" label="Extension CI *" required @change="setExt"></v-select>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Telefono" hide-details="auto" dense outlined v-model="usuario.telefono"></v-text-field>
                            </v-col>
                           
                            <v-col cols="12" sm="6">
                                <v-text-field label="Cargo *" required hide-details="auto" dense outlined :rules="cargoRules" v-model="usuario.cargo"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field label="Direccion *" required hide-details="auto" dense outlined v-model="usuario.direccion"></v-text-field>
                            </v-col>
                        </v-row>
                        <Divider title="Datos de acceso" class="my-6"></Divider>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <div class="d-flex">
                                    
                                    
                                     <v-text-field label="Correo *" validate-on-blur required hide-details="auto" dense outlined :rules="correoRules" v-model="usuario.correo"></v-text-field>
 
                                </div>
                                
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="d-flex">
                                    
                                    <v-text-field v-model="usuario.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Contraseña" dense hide-details="auto" outlined hint="Minimo 8 caracteres" counter @click:append="show1 = !show1"></v-text-field>
                                    <v-btn class="ml-2" @click="openDialogPass" text icon color="primary">
                                        <v-icon>mdi-lock-reset</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-select :menu-props="{ closeOnContentClick: true }" v-model="usuario.roles" deletable-chips small-chips clearable hide-details="auto"   outlined :rules="rolesRules" required :items="roles" item-text="name" item-value="id" label="Roles del usuario" multiple></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select :menu-props="{ closeOnContentClick: false }" v-model="usuario.permisos" deletable-chips small-chips clearable hide-details="auto"   outlined :rules="rolesRules" required :items="permisos" item-text="name" item-value="id" label="Roles del usuario" multiple></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancelarCreateUsuario" text>
                    Cancelar
                </v-btn>
                <v-btn :loading="onSave" :disabled="onSave" color="primary" depressed type="submit">
                    Registrar usuario
                </v-btn>
            </v-card-actions>
        </v-card>

        <PasswordGenerator :dialogPass.sync="dialogPass" @setNewPassword="setNewPassword" />
    </v-form>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{ snackbar.message_snack }}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>

</div>
</template>

<script>
import {
    options_ci
} from "@/mixins/globalVariables";
import {
    cargoRules,
    rolesRules,
    nombresRules,
    ciRules,
    ciExtRules,
    celularRules,
    correoRules,
    passwordRules,
    usernameRules
} from "@/mixins/globalRules";
import UsuarioService from "../services/UsuarioService";
import RolesService from "@/modules/Roles/services/RolService";

export default {
    data() {
        return {

            switch_event: false,
            show1: false,
            onSave: false,
            roles: [],
            permisos:[],
            usuario: {
                paterno: "",
                materno: "",
                nombres: "",
                ci: "",
                ci_ext: "",
                direccion: "",
                telefono: "",
                correo: "",
                cargo: "",
                roles: [],
                permisos: [],
                password: "",
                username: "",
            },
            finalProfileImage: null,
            cargoRules: cargoRules,
            rolesRules: rolesRules,
            nombresRules: nombresRules,
            ciRules: ciRules,
            ciExtRules: ciExtRules,
            celularRules: celularRules,
            correoRules: correoRules,
            passwordRules: passwordRules,
            usernameRules: usernameRules,
            options_ci: options_ci,
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 5000,
            },

            new_ext: false,
            dialogPass: false,
            eventos: [],
            cargoRule: [(v) => !!v || "Este campo es  obligatorio"],
            options: {
                duration: 1000,
                offset: 0,
                easing: "easeInCubic",
            },
        };
    },
    mounted() {
        if (this.$route.query.evento_id) {
            (this.usuario.gestor_evento = true), (this.switch_event = true);
            this.usuario.evento_id = this.$route.query.evento_id;
        }
    },
    created() {
        this.getRoles();
        this.getPermisos();
    },
    components: {
        PasswordGenerator: () => import("../components/PasswordGenerator.vue"),
        Divider: () => import("@/components/partials/divider"),
        ContainerUserImage: () => import('../components/UserImage.vue')
    },
    mixins: [UsuarioService, RolesService],
    methods: {
        async getPermisos() {
            try {
                let response = await this.axios.get('/permisos');
                this.permisos = response.data.data
            } catch (error) {
                this.showSnackbar(
                    error.name + ": " + error.response.data.message,
                    true,
                    "error"
                );
            } finally {
                this.onLoading = false;
            }
        },
        finalImageResult(imageResultURL) {

            let byteString =
                imageResultURL.split(',')[0].indexOf('base64') >= 0 ?
                atob(imageResultURL.split(',')[1]) :
                unescape(imageResultURL.split(',')[1])
            const mimeString = imageResultURL
                .split(',')[0]
                .split(':')[1]
                .split(';')[0]
            let ia = new Uint8Array(byteString.length)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            var reader = new FileReader()
            reader.readAsDataURL(new Blob([ia], {
                type: mimeString
            }))
            reader.onload = () => {
                this.finalProfileImage = reader.result

            };

        },
        copyEmail() {
            if (this.usuario.email.length === 0 || this.usuario.email === '') {
                this.showSnackbar("Ingrese un email para copiar", true, " ");
            } else {
                navigator.clipboard.writeText(this.usuario.email);
                this.showSnackbar("Email copiada al portapapeles ", true, " ");
            }
        },
        copyPassword() {
            if (this.usuario.password.length === 0 || this.usuario.password === '') {
                this.showSnackbar("Ingrese una Contraseña para copiar", true, " ");
            } else {
                navigator.clipboard.writeText(this.usuario.password);
                this.showSnackbar("Contraseña copiada al portapapeles ", true, " ");
            }
        },
        focusEvent($event) {
            $event.target.select();
            this.generateName();
        },

        setNewPassword(pass) {
            this.usuario.password = pass;
        },
        openDialogPass() {
            this.dialogPass = true;
        },
        setExt(e) {
            if (e === "otro") {
                this.new_ext = true;
            }
        },
    },
    watch: {
        inputImage(value) {
            if (!value) {
                this.files = []
                this.$refs.inputImg.blur()
            }
        },
        new_ext(val) {
            if (val) {
                this.$nextTick(() => {
                    // this.$refs.newext.isFocused = true;
                    this.$refs.newext.isMenuActive = true;
                    this.usuario.ci_ext = "";
                });
            } else {
                this.usuario.ci_ext = "";
                this.$nextTick(() => {
                    // this.$refs.extci.isFocused = true;
                    this.$refs.extci.isMenuActive = true;
                });
            }
        },
    },
};
</script>
