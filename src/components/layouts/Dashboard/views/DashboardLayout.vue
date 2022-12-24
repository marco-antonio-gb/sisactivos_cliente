<template>
<v-app id="inspire">
    <v-navigation-drawer dark v-model="drawer" app>
        <template v-slot:prepend>
            <v-list-item class="my-2">
                <v-list-item-avatar tile class="mr-4">
                    <img src="@/assets/warehouse-svgrepo-com.svg" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="title font-weight-bold "> {{app_name}} </v-list-item-title>
                    <v-list-item-subtitle class="caption font-weight-regular">Version {{version}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <Sidebar></Sidebar>
    </v-navigation-drawer>
    <v-app-bar   elevation="3" app dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <!-- <span v-if="authenticated" class="font-weight-medium body-2">{{ usuario.data.nombre_completo }}</span> -->
        <v-menu :nudge-width="260" max-width="260" offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mx-1" v-if="authenticated">
                    <v-avatar size="36" v-if="usuario.data.foto">
                        <v-img eager @error="usuario.data.foto=null" :src="url+usuario.data.foto" alt="Foto usuario"></v-img>
                    </v-avatar>
                    <v-avatar :color="usuario.data.avatar_color" size="36" v-else>
                        <span class="white--text title font-weight-medium">{{usuario.data.avatar_letter}}</span>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card v-if="authenticated">
                <v-list dense>
                    <v-list-item>
                        <!-- <v-list-item-avatar size="46">
                            <v-avatar v-if="usuario.data.foto">
                                <v-img eager @error="usuario.data.foto=null" :src="url+usuario.data.foto" alt="Foto usuario"></v-img>
                            </v-avatar>
                            <v-avatar :color="usuario.data.avatar_color" v-else>
                                <span class="white--text headline font-weight-medium">{{usuario.data.avatar_letter}}</span>
                            </v-avatar>
                        </v-list-item-avatar> -->
                        <v-list-item-content>
                            <v-list-item-title class="body-1 text-wrap">{{ usuario.data.nombre_completo }}</v-list-item-title>
                            <v-list-item-subtitle :title="usuario.data.cargo" class="caption font-weight-regular text-wrap">{{ usuario.data.cargo }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider class="my-1"></v-divider> -->
                    <!-- <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Roles</v-list-item-title>
                            <v-list-item-subtitle class="caption">
                                <span v-for="(rol) in usuario.data.roles" :key="rol.id">
                                    <span class="  mr-1">{{rol}}</span>
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item> -->
                    <v-divider class="my-3"></v-divider>
                    <v-list-item link @click="$router.push({ name: 'perfil' }).catch(err => {})">
                        <v-list-item-icon>
                            <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Perfil y preferencias</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="my-3"></v-divider>
                    <v-list-item link @click="signOut()">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Cerrar sesion </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
    <v-main>
            <router-view ></router-view>
    </v-main>
    <v-snackbar v-model="snackbar.show_snack" :right="true" :timeout="snackbar.timeout_snack">
        {{snackbar.message_snack}}
    </v-snackbar>
</v-app>
</template>
<script>
import {
    mapGetters,
} from "vuex";
import DashboardLayoutServices from '../services/DashboardLayoutServices';
import Sidebar from "../components/Sidebar";
export default {
    data() {
        return {
            url: process.env.VUE_APP_URL_MEDIA + '/home/usuarios/fotos/',
            AvatarLetter: "",
            avatarClass: "",
            initial: "",
            email: "",
            nombres: "",
            cargo: "",
            drawer: null,
            pageName: this.$route.name,
            selectedItem: 0,
            switch1: true,
            app_name: process.env.VUE_APP_TITLE,
            version: process.env.VUE_APP_VERSION,
            snackbar: {
                show_snack: false,
                message_snack: '',
                color_snack: 'light',
                timeout_snack: 3000
            },
        };
    },
    created() {
        // this.countDownTimer()
    },
    components: {
        Sidebar,
    },
    mixins:[
		DashboardLayoutServices
	],
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            usuario: "auth/user",
        }),
    },
};
</script>
