// File: js/auth.js
async function registerUser(email, password) {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get("ref");

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);

  if (refCode) {
    await supabase.from("referrals").insert({
      referrer_id: refCode, 
      referred_id: data.user.id,
      reward_amount: 100,
      status: "pending"
    });
  }
  alert("Success! Please Login.");
  window.location.href = "login.html";
}