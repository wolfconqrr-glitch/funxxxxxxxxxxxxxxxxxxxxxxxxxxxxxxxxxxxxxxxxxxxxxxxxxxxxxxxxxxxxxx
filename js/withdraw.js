async function requestWithdraw(amount, details) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return window.location.href = 'login.html';

    // Balance check logic (Optional: Yahan bhi balance check kar sakte hain)
    
    const { error } = await supabase.from("withdrawals").insert({
        user_id: user.id,
        amount: parseFloat(amount),
        details: details,
        method: "manual"
    });

    if (error) {
        alert("Withdrawal request failed. Please try again.");
    } else {
        alert("Withdrawal request submitted for approval.");
        window.location.href = "dashboard.html";
    }
}