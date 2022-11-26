<template>
<div>
    <div class="mb-3 d-flex align-center">
        <h2>{{$route.meta.title}}</h2>
        <v-spacer></v-spacer>
        <v-btn icon @click="reloadUsuarios" title="Actualizar">
            <v-icon>mdi-autorenew</v-icon>
        </v-btn>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list dense nav>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>Item menu A</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
    <v-card flat>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" dense label="Buscar..." outlined hide-details="true"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="$router.push('/usuarios/create')">Crear usuario</v-btn>
        </v-card-title>
        <v-data-table v-model="selected" show-select item-key="idUsuario" :headers="headers" :items="usuarios" :search="search" :items-per-page="5" :sort-desc="true" :sort-by="['idUsuario']" :footer-props="{
           'items-per-page-text':'Items por pagina','show-first-last-page':true}" :loading="onLoading" loading-text="Cargando... Espere por favor">
            <v-progress-linear v-show="onLoading" slot="progress" color="primary" indeterminate></v-progress-linear>
            <template v-slot:top>
                <v-toolbar dense outlined elevation="0" v-if="selected.length>0">
                    <div class="d-flex align-center pa-3 caption">
                        <span class=" mr-2"><strong>{{selected.length}}</strong> Seleccionados</span>
                        <v-tooltip bottom transition="none">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-lock-check</v-icon>
                                </v-btn>
                            </template>
                            <span>Desactivar seleccionados</span>
                        </v-tooltip>
                    </div>
                </v-toolbar>
            </template>
            <template v-slot:[`item.nombre_completo`]="{item}">
                <v-list-item class="pa-0" :ripple="false" link @click="$router.push({ name: 'usuariosDetail', params: { idUsuario: item.usuario_id }})">
                    <v-list-item-avatar size="50">
                        <v-menu open-on-hover :nudge-width="200" offset-x rounded="lg" transition="slide-y-transition" v-if="item.foto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-img v-bind="attrs" v-on="on"   @error="item.foto=null" :src="url+item.foto" alt="Foto usuario"></v-img>
                            </template>
                            <v-img max-width="300" @error="item.foto=null"   :src="url+item.foto" alt="Foto usuario" v-if="item.foto"></v-img>
                        </v-menu>
                        <v-avatar :color="item.avatar_color" size="36" v-else>
                            <span class="white--text title font-weight-regular">{{item.avatar_letter}}</span>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class=" font-weight-medium" v-html="item.nombre_completo"></v-list-item-title>
                        <v-list-item-subtitle  v-html="item.cargo"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-slot:[`item.correo`]="{ item }">
                {{item.correo}}
            </template>
            <template v-slot:[`item.telefono`]="{ item }">
                <span>
                    {{item.telefono}}
                </span>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
                <v-chip :color="getColor(item.estado)" dark small class="  pa-2">
                    {{ getLabel(item.estado) }}
                </v-chip>
            </template>
            <template v-slot:[`item.roles`]="{ item }">
                <span v-for="rol in item.roles" :key="rol.id">
                    <v-chip class="mr-1" small outlined link @click="$router.push({path:'/roles/detail/'+rol.id})">
                        {{rol.name}}
                    </v-chip>
                </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn-toggle v-model="toggle_none">
                    <v-btn small icon @click="$router.push({path:'/usuarios/detail/'+item.usuario_id})">
                        <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn small icon @click="$router.push({path:'/usuarios/update/'+item.usuario_id})">
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small icon @click="suspend(item)">
                        <v-icon small>mdi-lock</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </template>
        </v-data-table>
    </v-card>
    <ConfirmDlg ref="confirm" />
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        <pre class="snackText">{{snackbar.message_snack}}</pre>
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
    mapActions,
    mapGetters
} from 'vuex'
import UsuarioService from '../services/UsuarioService'
export default {
    name: 'lista-usuarios',
    data() {
        return {
            url: process.env.VUE_APP_URL_MEDIA + '/usuarios/',
            toggle_none: null,
            singleSelect: false,
            selected: [],
            onLoading: false,
            search: '',
            headers: [{
                    text: 'Usuario',
                    align: 'start',
                    value: 'nombre_completo',
                },
                {
                    text: 'Correo',
                    value: 'correo'
                },
                {
                    text: 'Telefonos',
                    value: 'telefono'
                },
                {
                    text: 'Cuenta',
                    value: 'estado'
                },
                {
                    value: 'actions',
                    sortable: false,
                    width: '10%',
                    align: 'end'
                },
            ],
            usuarios: [],
            snackbar: {
                show_snack: false,
                message_snack: "",
                color_snack: 'light',
                timeout_snack: 5000
            },
        }
    },
    created() {
        this.getUsuarios();
    },
    mounted() {},
    mixins: [
        UsuarioService
    ],
    components: {
        ConfirmDlg: () => import("@/components/partials/ConfirmDlg"),
    },
    methods: {
        reloadUsuarios() {
            this.usuarios = []
            this.getUsuarios()
        },
        ...mapActions({
            signOutAction: "auth/signOut",
        }),
    },
    watch: {
        onLoading(val) {
            if (!val) return
            setTimeout(() => (this.onLoading = false), 3000)
        },
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
