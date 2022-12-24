<template>
<v-form ref="formCreateOrgfinanciero" @submit.prevent="created">
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field label="Nombre (*)" hide-details="auto" v-model="orgfinancieroForm.nombre" :rules="nombreRule" validate-on-blur> </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field label="Descripcion" hide-details="auto" v-model="orgfinancieroForm.descripcion"></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <span class="caption">(*) Campos obligatorios</span>
            <v-spacer></v-spacer>
            <v-btn @click="cancelarCreateOrgfinanciero" text class="mr-2">
                Cancelar
            </v-btn>
            <v-btn :loading="onSave" :disabled="onSave" color="primary" type="submit">
                Guardar
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
import OrgfinancieroService from '../services/OrgfinancieroService'
export default {
    data() {
        return {
            onSave: false,
            orgfinancieroForm: {
                nombre: '',
                codigo: '',
                observacion: '',
            },
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: "light",
                timeout_snack: 3000,
            },
            nombreRule: [v => !!v || "Este campo es  obligatorio"]
        }
    },
    mixins: [
        OrgfinancieroService
    ],
    props: {},
    mounted() {},
    components: {},
    watch: {}
}
</script>
