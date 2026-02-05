async function initDashboard() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return window.location.href = "login.html";

    document.getElementById("user-email").innerText = user.email;

    const { data, error } = await supabase
        .from("profiles")
        .select("wallet_balance")
        .eq("id", user.id)
        .single();

    if (!error && data) {
        document.getElementById("balance").innerText = data.wallet_balance;
    }
}
initDashboard();