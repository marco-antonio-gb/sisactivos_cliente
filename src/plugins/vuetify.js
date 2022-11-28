import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/es5/locale/es";
Vue.use(Vuetify);
Vue.component("my-component", {
	methods: {
		changeLocale() {
			this.$vuetify.lang.current = "es";
		},
	},
});
export default new Vuetify({
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				customgrey: "#424242",
				primary: "#1a73e8",
				secondary: "#1e1e1e",
				accent: "#1565C0",
				error: "#FF003D",
				info: "#2196F3",
				success: "#34c759",
				warning: "#FFC107",
				dark: "#1e1e1e",
				htmlback: "#ffffff",
				linkhover: "#1565C0",
			},
			dark: {
				customgrey: "#E0E0E0",
				primary: "#1a73e8",
				secondary: "#1e1e1e",
				accent: "#1565C0",
				error: "#FF003D",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FFC107",
				dark: "#1e1e1e",
				htmlback: "#121212",
				linkhover: "#1565C0",
			},
		},
	},
	lang: {
		locales: { es },
		current: "es",
	},
});
