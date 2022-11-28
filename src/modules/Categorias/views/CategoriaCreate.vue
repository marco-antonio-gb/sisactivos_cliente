<template>
<v-container fluid>
    <goback class="mb-3" />
    <v-form @submit.prevent="create" lazy-validation ref="createCategoriaForm">
        <v-card outlined>
            <v-card-text class="pb-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="categoria.nombre" :rules="nombreRules" label="Nombre categoria" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-text-field v-model="categoria.descripcion" :rules="descRules" label="Descripcion del categoria" hide-details="auto" outlined dense required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-select v-model="categoria.permisos" item-value="name" :rules="permisoRules" item-text="name" :items="permisos" label="Permisos" multiple chips hide-details="auto" outlined hint="Seleccione los permisos para asignar a este categoria" persistent-hint></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text>
                    Cancelar
                </v-btn>
                <v-btn :loading="loading" :disabled="loading" color="primary" type="submit">
                    Crear categoria
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
        <template v-slot:action="{ attrs }">
            <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</v-container>
</template>

<script>
import CategoriaServices from '../services/CategoriaServices'
export default {
    data() {
        return {
            permisos_select: [],
            permisos: [],
            loading: false,
            categoria: {
                nombre: '',
                descripcion: '',
            },
            nombreRules: [
                v => !!v || 'Nombre es obligatorio',
                v => (v && v.length <= 20) || 'El nombre debe contener menos de 10 caracteres',
            ],
            descRules: [
                v => !!v || 'Descripcion es obligatorio',
            ],
            permisoRules: [(v) => v.length > 0 || "Debe asignar permisos al Rol."],
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    mixins: [
        CategoriaServices,

    ],

}
</script>
