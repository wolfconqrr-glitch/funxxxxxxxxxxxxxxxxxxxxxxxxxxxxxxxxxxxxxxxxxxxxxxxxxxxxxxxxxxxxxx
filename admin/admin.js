async function approveDeposit(depositId, userId, amount) {
    // 1. Update Deposit
    await supabase.from('deposits').update({ status: 'approved' }).eq('id', depositId);

    // 2. Update Balance
    const { data: profile } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    const newBal = parseFloat(profile.wallet_balance) + parseFloat(amount);
    await supabase.from('profiles').update({ wallet_balance: newBal }).eq('id', userId);

    // 3. Auto Referral Reward
    const { count } = await supabase.from('deposits').select('*', {count:'exact', head:true}).eq('user_id', userId).eq('status','approved');
    if(count === 1) {
        const { data: ref } = await supabase.from('referrals').select('*').eq('referred_id', userId).eq('status', 'pending').single();
        if(ref) {
            const { data: rp } = await supabase.from('profiles').select('wallet_balance').eq('id', ref.referrer_id).single();
            await supabase.from('profiles').update({ wallet_balance: parseFloat(rp.wallet_balance) + 100 }).eq('id', ref.referrer_id);
            await supabase.from('referrals').update({ status: 'rewarded' }).eq('id', ref.id);
        }
    }
    alert("Approved Successfully!");
}