<template>
<v-container fluid>
    <goback class="mb-3" />
    <v-form @submit.prevent="create" lazy-validation ref="createCategoriaForm">
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="categoria.nombre" :rules="nombreRules" label="Nombre categoria (*)" hide-details="auto"  required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="categoria.vida_util" :rules="vidaUtilRule" @focus="$event.target.select()" label="Vida util  (*)" hide-details="auto"  required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="categoria.descripcion" :rules="descRules" label="Descripcion del categoria  (*)" hide-details="auto"  required></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <span class="caption">Campos obligatorios (*)</span>
                <v-spacer></v-spacer>
                <v-btn @click="$router.go(-1)" text> Cancelar </v-btn>
                <v-btn :loading="onSave" :disabled="onSave" color="primary" type="submit">
                    Crear categoria
                </v-btn>
            </v-card-actions>
            <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack" transition="slide-y-reverse-transition">
                <pre class="snackText">{{snackbar.message_snack}}</pre>
                <template v-slot:action="{ attrs }">
                    <v-btn :color="snackbar.color_snack" text v-bind="attrs" @click="snackbar.show_snack = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </v-card>
    </v-form>
</v-container>
</template>

<script>
import CategoriaServices from "../services/CategoriaServices";
export default {
    data() {
        return {
            permisos_select: [],
            permisos: [],
            onSave: false,
            categoria: {
                nombre: "",
                vida_util: 0,
                descripcion: "",
                condicion: true,
            },
            nombreRules: [
                (v) => !!v || "Nombre es obligatorio",
                (v) =>
                (v && v.length <= 20) ||
                "El nombre debe contener menos de 10 caracteres",
            ],
            vidaUtilRule: [
                (v) => !!v || "El campo es requerido",
                (v) =>
                Number.isInteger(Number(v)) ||
                "El valor debe ser un entero",
                (v) => v > 0 || "El valor debe ser mayor que cero",
                (v) => v <= 50 || "El valor debe ser menor que 50",
            ],
            descRules: [(v) => !!v || "Descripcion es obligatorio"],
            permisoRules: [
                (v) => v.length > 0 || "Debe asignar permisos al Rol.",
            ],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 3000
            },
        };
    },
    mixins: [CategoriaServices],
};
</script>
