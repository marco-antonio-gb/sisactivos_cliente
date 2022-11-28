<template>
<v-container fill-height>
    <v-layout align-center justify-center>
        <v-card flat class="pa-5 text-center transparent" max-width="440">
            <v-img eager src="@/assets/icons/warning-sign-9762.svg" max-height="60" contain class="mx-auto mb-3"></v-img>
            <h2>Página no encontrada...</h2>
            <p class="grey--text text--darken-1">La página que busca no existe,por favor verifique la direccion e intente nuevamente. </p>
            <v-btn color="primary" depressed rounded  @click="$router.go(-1)" class="mt-3">
              Volver a la pagina anterior
            </v-btn>
        </v-card>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'error-403'
}
</script>
