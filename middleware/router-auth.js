export default function({ store, redirect, route }) {
  store.state.user != null && (route.name == "login" || route.path == "/")
    ? redirect("/profile")
    : "";
  store.state.user == null && route.name != "login" ? redirect("/login") : "";
}
