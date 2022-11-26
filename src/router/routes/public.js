// const LandingPage = () => import("../layouts/LandingPage.vue")
const AboutPage = () => import("@/components/pages/About.vue")
const AuthLayout = () => import("@/components/layouts/Auth/views/AuthLayout.vue")
const ForgotPassword = () => import("@/components/pages/ForgotPassword.vue")
const ResetPassword = () => import("@/components/pages/ResetPassword.vue")

const routes = [
	{
		path: "/about",
		component: AboutPage,
		name: "About",
		meta: {
			title: "About Admin",
		},
	},
	{
		path: "/login",
		component: AuthLayout,
		name: "login",
		meta: {
			title: "Login",
		},
	},
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: ForgotPassword,
		meta: {
			title: "Olvide mi contraseña",
		},
	},
	{
		path: "/reset-password",
		name: "reset-password",
		component: ResetPassword,
		meta: {
			title: "Restablecer contraseña",
		},
	}
]

export default routes.map(route => {
	const meta = {
		public:true,
		onlyLoggedOut:true
	}
	return {...route, meta}
});