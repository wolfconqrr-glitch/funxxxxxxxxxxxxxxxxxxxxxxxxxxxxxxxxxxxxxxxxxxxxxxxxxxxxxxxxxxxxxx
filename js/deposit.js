// File: js/deposit.js
async function submitDeposit(amount, utr, duration) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { error } = await supabase.from("deposits").insert({
    user_id: user.id,
    amount: parseFloat(amount),
    utr: utr,
    duration_days: parseInt(duration)
  });

  if (error) alert("Error: UTR already exists!");
  else {
    alert("Submitted! Waiting for Admin Approval.");
    window.location.href = "dashboard.html";
  }
}