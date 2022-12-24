<template>
<v-form ref="formCreateAsignacion" @submit.prevent="created">
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-select hide-details="auto" :loading="loadingUsuarios" v-model="asignacionForm.usuario_id" item-value="usuario_id" item-text="nombre_completo" :items="usuariosOptions" label="Usuarios (*)" :menu-props="{ bottom: true, offsetY: true }" attach required :rules="usuarioRule" validate-on-blur></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-select hide-details="auto" :loading="loadingServicios" v-model="asignacionForm.servicio_id" item-value="servicio_id" item-text="nombre" :items="serviciosOptions" label="Servicios (*)" :menu-props="{ bottom: true, offsetY: true }" attach required :rules="servicioRule" validate-on-blur></v-select>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <span class="caption">(*) Campos obligatorios</span>
            <v-spacer></v-spacer>
            <v-btn @click="cancelarCreateServicio" text class="mr-2">
                Cancelar
            </v-btn>
            <v-btn :loading="onSave" :disabled="onSave" color="primary" type="submit">
                Crear responsable
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" transition="slide-y-reverse-transition">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-form>
</template>
<script>
import AsignacionService from '../services/AsignacionService'
import FormAsignacionService from '../services/FormAsignacionService'
export default {
    data() {
        return {
            onSave: false,
            asignacionForm: {
                usuario_id: null,
                servicio_id: null,
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 3000,
            },
            servicioRule: [v => !!v || "Este campo es  obligatorio"],
            usuarioRule: [v => !!v || "Este campo es  obligatorio"],
            serviciosOptions: [],
            loadingServicios: false,
            usuariosOptions: [],
            loadingUsuarios: false
        }
    },
    mixins: [
        AsignacionService,
        FormAsignacionService
    ],
    props: {},
    mounted() {},
    created() {
        this.getUsuarios()
        this.getServicios()
    },
    components: {},
    watch: {}
}
</script>
