// // // dev after
// document.getElementById('loading-screen').style.visibility = 'hidden'
// document.getElementById('main').style.visibility = 'visible'



servers_alive = false
// main server alive check
fetch('https://api.kusama.wallety.org/').then(() => {
    servers_alive = true
    document.getElementById('serversDown').style.visibility = 'hidden'
    // active or not
    let root = document.querySelector(':root');
    root.style.setProperty('--status-color', 'green');
    var status = 'Active'
    document.getElementById('status').innerHTML = status;
    // pulse colour
    root.style.setProperty('--pulse-color', 'green');
    root.style.setProperty('--pulse-color-light', '#6CB56C');
  }).catch(() => {
    servers_alive = false
    document.getElementById('loading-gif').innerHTML = ''
    document.getElementById('loading-screen').style.visibility = 'hidden'
    document.getElementById('main').style.visibility = 'hidden'
    document.getElementById('serversDown').style.visibility = 'visible'
});


// on load data defualts to dollar rate
var general_data_loaded = true
window.onload = async function load(){

    general_data_loaded = false

    // on load data
    var general_api_url = 'https://api.kusama.wallety.org/kusama/general/'
    var general_responce = await fetch(general_api_url);
    var general_data = await general_responce.json();

    current_dates = general_data.kusama_general.current_dates.date
    document.getElementById('current_dates').innerHTML = current_dates;
    kusamaPrice = general_data.kusama_general.kusama_price
    exchangeRates(kusamaPrice, 'dollar', 'kusama_price')
    market_cap = general_data.kusama_general.kusama_market_cap
    exchangeRates(market_cap, 'dollar', 'market_cap')
    coin_gas_price = general_data.kusama_general.recent_gas.coin_gas_fee
    document.getElementById('coin_gas_price').innerHTML = coin_gas_price;
    dollar_gas_price = general_data.kusama_general.recent_gas.dollar_gas_fee
    document.getElementById('dollar_gas_price').innerHTML = '$' + dollar_gas_price
    kusama_p_increase = general_data.kusama_general.kusama_p_increase
    document.getElementById('kusama_p_increase').innerHTML = kusama_p_increase;
    transfer_count = general_data.kusama_general.recent_gas.transfer_count
    document.getElementById('transfer_count').innerHTML = transfer_count
    if (kusama_p_increase[0] == '-') {
        document.getElementById('kusama_p_increase').style.color = 'red'
        r = document.querySelector(':root')
        r.style.setProperty('--middle-tool-text-img', 'red');
    } else { 
        document.getElementById('kusama_p_increase').style.color = 'green'
        r = document.querySelector(':root')
        r.style.setProperty('--middle-tool-text-img', 'green');
        r.style.setProperty('--middle-tool-text-img-margin', '3px');
        r.style.setProperty('--middle-tool-text-img-rotate', '180deg');
    }

    document.getElementById('loading-screen').style.visibility = 'hidden'
    document.getElementById('main').style.visibility = 'visible'
    general_data_loaded = true
};



entryLoading = false
function submit_entry() {
    if (servers_alive == true) {
        if (entryLoading == false) {
            entryLoading = true
            var wallet_address = document.getElementById('wallet_address').value;
            var option = document.getElementById("network");
            var option = option.value;
            document.getElementById('loading-gif').innerHTML = ''
            if (wallet_address != ''){
                if (option == 'kusama'){
                    async function checkReq(){
                        var loading_img = document.createElement("img");
                        loading_img.src = 'images/loading.gif';
                        var loading_span = document.getElementById("loading-gif");
                        loading_span.appendChild(loading_img);
                        var api_url = 'https://api.kusama.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=kusama'
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network.network == 'kusama') {
                            var api_url = 'https://wallety.org/kusama?wallet_address=' + checkNetworkReqResponce.wallet_network.wallet_address
                            location.href = api_url;}    
                        else {
                            if (checkNetworkReqResponce.wallet_network.network != false) {
                                var alert_text = 'Kusama wallet address not found, this is a ' + checkNetworkReqResponce.wallet_network.network + ' wallet address'
                                alert(alert_text)
                            } else {alert('Kusama wallet address not found or any matching networks we support')}
                        }
                        document.getElementById('loading-gif').innerHTML = ''
                        entryLoading = false
                    }
                    checkReq();        
                }
                if (option == 'polkadot'){
                    async function checkReq(){
                        var loading_img = document.createElement("img");
                        loading_img.src = 'images/loading.gif';
                        var loading_span = document.getElementById("loading-gif");
                        loading_span.appendChild(loading_img);
                        var api_url = 'https://api.polkadot.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=polkadot'
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network.network == 'polkadot') {
                            var api_url = 'https://wallety.org/polkadot?wallet_address=' + checkNetworkReqResponce.wallet_network.wallet_address
                            location.href = api_url;}
                        else {
                            if (checkNetworkReqResponce.wallet_network.network != false) {
                                var alert_text = 'Polkadot wallet address not found, this is a ' + checkNetworkReqResponce.wallet_network.network + ' wallet address'
                                alert(alert_text)
                            } else {alert('Polkadot wallet address not found or any matching networks we support')}
                        }
                        document.getElementById('loading-gif').innerHTML = ''
                        entryLoading = false
                    }
                    checkReq();
                }
                if (option == 'all'){
                    async function checkReq(){
                        var loading_img = document.createElement("img");
                        loading_img.src = 'images/loading.gif';
                        var loading_span = document.getElementById("loading-gif");
                        loading_span.appendChild(loading_img);
                        var api_url = 'https://api.polkadot.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=all'
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network.network == 'polkadot') {
                            var api_url = 'https://wallety.org/polkadot?wallet_address=' + checkNetworkReqResponce.wallet_network.wallet_address
                            location.href = api_url;}
                        else if (checkNetworkReqResponce.wallet_network.network == 'kusama') {
                            var api_url = 'https://wallety.org/kusama?wallet_address=' + checkNetworkReqResponce.wallet_network.wallet_address
                            location.href = api_url;}    
                        else {alert('Wallet address not found for the networks we support')}
                        document.getElementById('loading-gif').innerHTML = ''
                        entryLoading = false
                    }
                    checkReq();
                }
            } else {alert('Please enter a Wallet address')};

        } else {alert('Please wait for the last search to load')}

    } else {alert('Our servers are currently down, please try again later')}
}


document.getElementById("wallet_address")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if (entryLoading == false) {
            document.getElementById("search-button").click();
        } else {alert('Please wait for the last search to load')}
    }
});


var data_loaded = false

async function kusama() {
    data_loaded = false

    // loading start
    var loading_img = document.createElement("img");
    loading_img.src = 'images/loading.gif';
    var loading_span = document.getElementById("loading-gif");
    loading_span.appendChild(loading_img);

    var url_string = window.location.href
    var url = new URL(url_string);
    var wallet_address = url.searchParams.get('wallet_address');
    document.getElementById('wallet_address').value = wallet_address;

    const api_url = 'https://api.kusama.wallety.org/kusama/?wallet_address=' + wallet_address
    const responce = await fetch(api_url);
    data = await responce.json();

    function displayData() {
        // general data
        current_dates = data.general_kusama.kusama_general.current_dates.date
        document.getElementById('current_dates').innerHTML = current_dates;
        kusamaPrice = data.general_kusama.kusama_general.kusama_price
        exchangeRates(kusamaPrice, 'dollar', 'kusama_price')
        market_cap = data.general_kusama.kusama_general.kusama_market_cap
        exchangeRates(market_cap, 'dollar', 'market_cap')
        coin_gas_price = data.general_kusama.kusama_general.recent_gas.coin_gas_fee
        document.getElementById('coin_gas_price').innerHTML = coin_gas_price;
        dollar_gas_price = data.general_kusama.kusama_general.recent_gas.dollar_gas_fee
        document.getElementById('dollar_gas_price').innerHTML = '$' + dollar_gas_price
        kusama_p_increase = data.general_kusama.kusama_general.kusama_p_increase
        document.getElementById('kusama_p_increase').innerHTML = kusama_p_increase;
        transfer_count = data.general_kusama.kusama_general.recent_gas.transfer_count
        document.getElementById('transfer_count').innerHTML = transfer_count
        if (kusama_p_increase[0] == '-') {
            document.getElementById('kusama_p_increase').style.color = 'red'
            r = document.querySelector(':root')
            r.style.setProperty('--middle-tool-text-img', 'red');
            
        } else { 
            document.getElementById('kusama_p_increase').style.color = 'green'
            r = document.querySelector(':root')
            r.style.setProperty('--middle-tool-text-img', 'green');
            r.style.setProperty('--middle-tool-text-img-margin', '3px');
            r.style.setProperty('--middle-tool-text-img-rotate', '180deg');
        }

        

        // profile
        // display name img judgement_img
        var judgementImg = ''
        const profileJudgement = data.kusama_wallet_profile.wallet_profile.wallet_profile.judgements
        const identity = data.kusama_wallet_profile.wallet_profile.wallet_profile.identity
        const sub = data.kusama_wallet_profile.wallet_profile.wallet_profile.sub
        if (identity == true) {
            if (profileJudgement == false) {
                judgementImg = 'images/false-judgement.svg';}
                
            else if (profileJudgement == true) {
                judgementImg = 'images/true-judgement.svg';}

        }   if (identity == false) { 
            judgementImg = '';
        }   if (sub == true) {
            judgementImg = 'images/sub-judgement.svg';}
        document.getElementById('judgement_img').innerHTML = "";
        var img = document.createElement("img");
        img.src = judgementImg;
        var div = document.getElementById("judgement_img");
        div.appendChild(img);

        // socials display
        document.getElementById('socials-div').style.display = ''
        document.getElementById('socials-dash').style.display = 'none'
        document.getElementById('wallet-twitter').innerHTML = "";
        const wallet_twitter = document.getElementById("wallet-twitter");
        twitter = data.kusama_wallet_profile.wallet_profile.wallet_profile.twitter
        document.getElementById("wallet-twitter").href=twitter;
        document.getElementById("wallet-twitter-tt").href=twitter;
        document.getElementById("wallet-twitter-tt").innerHTML = twitter;
        if (twitter != '') {
            var img = document.createElement("img");
            img.src = 'images/twitter.svg';
            document.getElementById('twitter-tooltip').style.display = 'inline-block'
            wallet_twitter.appendChild(img);} else {twitter = '-'}

        document.getElementById('wallet-website').innerHTML = "";
        const wallet_website = document.getElementById("wallet-website");
        website = data.kusama_wallet_profile.wallet_profile.wallet_profile.website
        document.getElementById("wallet-website").href=website;
        document.getElementById("wallet-website-tt").href=website;
        document.getElementById("wallet-website-tt").innerHTML = website;
        if (website != '') {
            var img = document.createElement("img");
            img.src = 'images/website.svg';
            document.getElementById('website-tooltip').style.display = 'inline-block'
            wallet_website.appendChild(img);} else {website = '-'}

        document.getElementById('wallet-email').innerHTML = "";
        const wallet_email = document.getElementById("wallet-email");
        email = data.kusama_wallet_profile.wallet_profile.wallet_profile.email
        document.getElementById("wallet-email").href=email;
        document.getElementById("wallet-email-tt").href=email;
        document.getElementById("wallet-email-tt").innerHTML = email;
        if (email != '') {
            var img = document.createElement("img");
            img.src = 'images/email.svg';
            document.getElementById('email-tooltip').style.display = 'inline-block'
            wallet_email.appendChild(img);} else {email = '-'}

        document.getElementById('wallet-element').innerHTML = "";
        const wallet_element = document.getElementById("wallet-element");
        element = data.kusama_wallet_profile.wallet_profile.wallet_profile.riot
        document.getElementById("wallet-element").href=element;
        document.getElementById("wallet-element-tt").href=element;
        document.getElementById("wallet-element-tt").innerHTML = element;
        if (element != '') {
            var img = document.createElement("img");
            img.src = 'images/element.svg';
            document.getElementById('element-tooltip').style.display = 'inline-block'
            wallet_element.appendChild(img);} else {element = '-'}
            


        
        // network keys
        document.getElementById('wallet-key').innerHTML = "";
        const wallet_key = document.getElementById("wallet-key");

        key = data.kusama_wallet_address
        kusama_address = data.kusama_wallet_profile.wallet_profile.wallet_profile.kusama_address
        polkadot_address = data.kusama_wallet_profile.wallet_profile.wallet_profile.polkadot_address


        if (key != '') {
            var img = document.createElement("img");
            img.src = 'images/key.svg';
            img.style.marginLeft = '3px'
            img.style.marginRight = '2.5px'
            wallet_key.appendChild(img);

            document.getElementById('key-tooltip').style.display = 'inline-block'
            document.getElementById('tool-tip-wallet-key').innerHTML = key + '\nClick to copy';}

        

        

        display_name = data.kusama_wallet_profile.wallet_profile.wallet_profile.display_name
        document.getElementById('display_name').innerHTML = display_name;

        // identicon
        var identicon = document.createElement("polkadot-web-identicon");
        identicon.address = key;
        identicon.theme = 'polkadot';
        identicon.size = '30'
        document.getElementById('indenticon-span').appendChild(identicon);

        legal_name = data.kusama_wallet_profile.wallet_profile.wallet_profile.legal_name
        document.getElementById('legal_name').innerHTML = legal_name;
        index = data.kusama_wallet_profile.wallet_profile.wallet_profile.account_index
        document.getElementById('index').innerHTML = index;
        role = data.kusama_wallet_profile.wallet_profile.wallet_profile.role
        document.getElementById('role').innerHTML = role;

        // balances
        total_balance = data.kusama_wallet_profile.wallet_profile.balances.total_balance
        document.getElementById('total_balance').innerHTML = total_balance;
        total_balance_dollars = data.kusama_wallet_profile.wallet_profile.balances.total_balance_dollars
        exchangeRates(total_balance_dollars, 'dollar', 'total_balance_dollars')
        transferable_balance = data.kusama_wallet_profile.wallet_profile.balances.transferable_balance
        document.getElementById('transferable_balance').innerHTML = transferable_balance;
        transferable_balance_dollars = data.kusama_wallet_profile.wallet_profile.balances.transferable_balance_dollars
        exchangeRates(transferable_balance_dollars, 'dollar', 'transferable_balance_dollars')
        locked_balance = data.kusama_wallet_profile.wallet_profile.balances.locked_balance
        document.getElementById('locked_balance').innerHTML = locked_balance;
        locked_balance_dollars = data.kusama_wallet_profile.wallet_profile.balances.locked_balance_dollars
        exchangeRates(locked_balance_dollars, 'dollar', 'locked_balance_dollars')
        reserved_balance = data.kusama_wallet_profile.wallet_profile.balances.reserved_balance
        document.getElementById('reserved_balance').innerHTML = reserved_balance;
        reserved_balance_dollars = data.kusama_wallet_profile.wallet_profile.balances.reserved_balance_dollars
        exchangeRates(reserved_balance_dollars, 'dollar', 'reserved_balance_dollars')

        // paper handed and diamond handed
        // paper
        paper_coins = data.kusama_paper_diamond_handed.handed.paper_handed.paper_handed_coins
        document.getElementById('paper-coins').innerHTML = paper_coins
        paper_dollars = data.kusama_paper_diamond_handed.handed.paper_handed.paper_handed_coins_dollars
        exchangeRates(paper_dollars, 'dollar', 'paper-dollars')

        // diamond
        diamond_coins = data.kusama_paper_diamond_handed.handed.diamond_handed.diamond_handed_coins
        document.getElementById('diamond-coins').innerHTML = diamond_coins
        diamond_dollars = data.kusama_paper_diamond_handed.handed.diamond_handed.diamond_handed_coins_dollars
        exchangeRates(diamond_dollars, 'dollar', 'diamond-dollars')

        // monthly
        // monthly data title date
        monthly_data_title_date = data.kusama_monthly_transfers.monthly_total.monthly_dates_title
        document.getElementById('monthly-data-title-date').innerHTML = monthly_data_title_date;

        // monthly deposit
        monthly_deposit_interactions = data.kusama_monthly_transfers.monthly_deposit.monthly_deposit_interactions
        document.getElementById('monthly_deposit_interactions').innerHTML = monthly_deposit_interactions;
        monthly_deposit_volume_coins = data.kusama_monthly_transfers.monthly_deposit.monthly_deposit_volume_coins
        document.getElementById('monthly_deposit_volume_coins').innerHTML = monthly_deposit_volume_coins;
        monthly_deposit_volume_dollars = data.kusama_monthly_transfers.monthly_deposit.monthly_deposit_volume_dollars
        exchangeRates(monthly_deposit_volume_dollars, 'dollar', 'monthly_deposit_volume_dollars')
        monthly_deposits_first_txn_date_date = data.kusama_monthly_transfers.monthly_deposit.monthly_deposits_first_txn_date.first_txn_full_date
        document.getElementById('monthly_deposits_first_txn_date_date').innerHTML = monthly_deposits_first_txn_date_date;
        monthly_deposits_first_txn_date_days = data.kusama_monthly_transfers.monthly_deposit.monthly_deposits_first_txn_date.days_since
        document.getElementById('monthly_deposits_first_txn_date_days').innerHTML = monthly_deposits_first_txn_date_days;
        monthly_deposits_last_txn_date_date = data.kusama_monthly_transfers.monthly_deposit.monthly_deposits_last_txn_date.last_txn_full_date
        document.getElementById('monthly_deposits_last_txn_date_date').innerHTML = monthly_deposits_last_txn_date_date;
        monthly_deposits_last_txn_date_days = data.kusama_monthly_transfers.monthly_deposit.monthly_deposits_last_txn_date.days_since
        document.getElementById('monthly_deposits_last_txn_date_days').innerHTML = monthly_deposits_last_txn_date_days;

        // monthly total
        monthly_total_failed_gas_coin = data.kusama_monthly_transfers.monthly_total.monthly_total_failed_gas_coin
        document.getElementById('monthly_total_failed_gas_coin').innerHTML = monthly_total_failed_gas_coin;
        monthly_total_failed_gas_dollars = data.kusama_monthly_transfers.monthly_total.monthly_total_failed_gas_dollars
        exchangeRates(monthly_total_failed_gas_dollars, 'dollar', 'monthly_total_failed_gas_dollars')
        monthly_total_failed_interactions = data.kusama_monthly_transfers.monthly_total.monthly_total_failed_interactions
        document.getElementById('monthly_total_failed_interactions').innerHTML = monthly_total_failed_interactions;
        monthly_total_gas_coin = data.kusama_monthly_transfers.monthly_total.monthly_total_gas_coin
        document.getElementById('monthly_total_gas_coin').innerHTML = monthly_total_gas_coin;
        monthly_total_gas_dollars = data.kusama_monthly_transfers.monthly_total.monthly_total_gas_dollars
        exchangeRates(monthly_total_gas_dollars, 'dollar', 'monthly_total_gas_dollars')
        monthly_total_interactions = data.kusama_monthly_transfers.monthly_total.monthly_total_interactions
        document.getElementById('monthly_total_interactions').innerHTML = monthly_total_interactions;
        monthly_total_volume_coins = data.kusama_monthly_transfers.monthly_total.monthly_total_volume_coins
        document.getElementById('monthly_total_volume_coins').innerHTML = monthly_total_volume_coins;
        monthly_total_volume_dollars = data.kusama_monthly_transfers.monthly_total.monthly_total_volume_dollars
        exchangeRates(monthly_total_volume_dollars, 'dollar', 'monthly_total_volume_dollars')
        monthly_total_successful_interactions = monthly_total_interactions - monthly_total_failed_interactions;
        document.getElementById('monthly-total-successful-interactions').innerHTML = monthly_total_successful_interactions;
        monthly_total_last_txn_date_date = data.kusama_monthly_transfers.monthly_total.monthly_total_last_txn_date.last_txn_full_date
        document.getElementById('monthly_total_last_txn_date_date').innerHTML = monthly_total_last_txn_date_date;
        monthly_total_last_txn_date_days = data.kusama_monthly_transfers.monthly_total.monthly_total_last_txn_date.days_since
        document.getElementById('monthly_total_last_txn_date_days').innerHTML = monthly_total_last_txn_date_days;
        monthly_total_first_txn_date_date = data.kusama_monthly_transfers.monthly_total.monthly_total_first_txn_date.first_txn_full_date
        document.getElementById('monthly_total_first_txn_date_date').innerHTML = monthly_total_first_txn_date_date;
        monthly_total_first_txn_date_days = data.kusama_monthly_transfers.monthly_total.monthly_total_first_txn_date.days_since
        document.getElementById('monthly_total_first_txn_date_days').innerHTML = monthly_total_first_txn_date_days;

        // monthly withdrawal
        monthly_withdrawal_failed_gas_coin = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_failed_gas_coin
        document.getElementById('monthly_withdrawal_failed_gas_coin').innerHTML = monthly_withdrawal_failed_gas_coin;
        monthly_withdrawal_failed_gas_dollars = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_failed_gas_dollars
        exchangeRates(monthly_withdrawal_failed_gas_dollars, 'dollar', 'monthly_withdrawal_failed_gas_dollars')
        monthly_withdrawal_failed_interactions = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_failed_interactions
        document.getElementById('monthly_withdrawal_failed_interactions').innerHTML = monthly_withdrawal_failed_interactions;
        monthly_withdrawal_first_txn_date_date = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_first_txn_date.first_txn_full_date
        document.getElementById('monthly_withdrawal_first_txn_date_date').innerHTML = monthly_withdrawal_first_txn_date_date;
        monthly_withdrawal_first_txn_date_days = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_first_txn_date.days_since
        document.getElementById('monthly_withdrawal_first_txn_date_days').innerHTML = monthly_withdrawal_first_txn_date_days;
        monthly_withdrawal_gas_coin = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_gas_coin
        document.getElementById('monthly_withdrawal_gas_coin').innerHTML = monthly_withdrawal_gas_coin;
        monthly_withdrawal_gas_dollars = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_gas_dollars
        exchangeRates(monthly_withdrawal_gas_dollars, 'dollar', 'monthly_withdrawal_gas_dollars')
        monthly_withdrawal_interactions = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_interactions
        document.getElementById('monthly_withdrawal_interactions').innerHTML = monthly_withdrawal_interactions;
        monthly_withdrawal_last_txn_date_date = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_last_txn_date.last_txn_full_date
        document.getElementById('monthly_withdrawal_last_txn_date_date').innerHTML = monthly_withdrawal_last_txn_date_date;
        monthly_withdrawal_last_txn_date_days = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_last_txn_date.days_since
        document.getElementById('monthly_withdrawal_last_txn_date_days').innerHTML = monthly_withdrawal_last_txn_date_days;
        monthly_withdrawal_volume_coin = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_volume_coin
        document.getElementById('monthly_withdrawal_volume_coin').innerHTML = monthly_withdrawal_volume_coin;
        monthly_withdrawal_volume_dollars = data.kusama_monthly_transfers.monthly_withdrawal.monthly_withdrawal_volume_dollars
        exchangeRates(monthly_withdrawal_volume_dollars, 'dollar', 'monthly_withdrawal_volume_dollars')
        monthly_withdrawal_successful_interactions = monthly_withdrawal_interactions - monthly_withdrawal_failed_interactions;
        document.getElementById('monthly-withdrawal-successful-interactions').innerHTML = monthly_withdrawal_successful_interactions;

        // total
        // total data title date
        total_data_title_date = data.kusama_transfers_data.total_transfers.total.total_dates_title
        document.getElementById('total-data-title-date').innerHTML = total_data_title_date;

        // total deposit
        total_deposit_interactions = data.kusama_transfers_data.total_transfers.total_deposits.total_deposit_interactions
        document.getElementById('total_deposit_interactions').innerHTML = total_deposit_interactions;
        total_deposit_volume_coins = data.kusama_transfers_data.total_transfers.total_deposits.total_deposit_volume_coins
        document.getElementById('total_deposit_volume_coins').innerHTML = total_deposit_volume_coins;
        total_deposit_volume_dollars = data.kusama_transfers_data.total_transfers.total_deposits.total_deposit_volume_dollars
        exchangeRates(total_deposit_volume_dollars, 'dollar', 'total_deposit_volume_dollars')
        total_deposits_first_txn_date_date = data.kusama_transfers_data.total_transfers.total_deposits.deposits_first_txn_date.first_txn_full_date
        document.getElementById('total_deposits_first_txn_date_date').innerHTML = total_deposits_first_txn_date_date;
        total_deposits_first_txn_date_days = data.kusama_transfers_data.total_transfers.total_deposits.deposits_first_txn_date.days_since
        document.getElementById('total_deposits_first_txn_date_days').innerHTML = total_deposits_first_txn_date_days;
        total_deposits_last_txn_date_date = data.kusama_transfers_data.total_transfers.total_deposits.deposits_last_txn_date.last_txn_full_date
        document.getElementById('total_deposits_last_txn_date_date').innerHTML = total_deposits_last_txn_date_date;
        total_deposits_last_txn_date_days = data.kusama_transfers_data.total_transfers.total_deposits.deposits_last_txn_date.days_since
        document.getElementById('total_deposits_last_txn_date_days').innerHTML = total_deposits_last_txn_date_days;

        // total total
        total_total_failed_gas_coin = data.kusama_transfers_data.total_transfers.total.total_gas_coins_failed
        document.getElementById('total_total_failed_gas_coin').innerHTML = total_total_failed_gas_coin;
        total_total_failed_gas_dollars = data.kusama_transfers_data.total_transfers.total.total_gas_dollars_failed
        exchangeRates(total_total_failed_gas_dollars, 'dollar', 'total_total_failed_gas_dollars')
        total_total_failed_interactions = data.kusama_transfers_data.total_transfers.total.total_interactions_failed
        document.getElementById('total_total_failed_interactions').innerHTML = total_total_failed_interactions;
        total_total_gas_coin = data.kusama_transfers_data.total_transfers.total.total_gas_coins
        document.getElementById('total_total_gas_coin').innerHTML = total_total_gas_coin;
        total_total_gas_dollars = data.kusama_transfers_data.total_transfers.total.total_gas_dollars
        exchangeRates(total_total_gas_dollars, 'dollar', 'total_total_gas_dollars')
        total_total_interactions = data.kusama_transfers_data.total_transfers.total.total_interactions
        document.getElementById('total_total_interactions').innerHTML = total_total_interactions;
        total_total_volume_coins = data.kusama_transfers_data.total_transfers.total.total_volume_coins
        document.getElementById('total_total_volume_coins').innerHTML = total_total_volume_coins;
        total_total_volume_dollars = data.kusama_transfers_data.total_transfers.total.total_volume_dollars
        exchangeRates(total_total_volume_dollars, 'dollar', 'total_total_volume_dollars')
        total_total_successful_interactions = total_total_interactions - total_total_failed_interactions;
        document.getElementById('total-total-successful-interactions').innerHTML = total_total_successful_interactions;
        total_last_txn_date_date = data.kusama_transfers_data.total_transfers.total.total_last_txn_date.last_txn_full_date
        document.getElementById('total_total_last_txn_date_date').innerHTML = total_last_txn_date_date;
        total_last_txn_date_days = data.kusama_transfers_data.total_transfers.total.total_last_txn_date.days_since
        document.getElementById('total_total_last_txn_date_days').innerHTML = total_last_txn_date_days;
        total_first_txn_date_date = data.kusama_transfers_data.total_transfers.total.total_first_txn_date.first_txn_full_date
        document.getElementById('total_total_first_txn_date_date').innerHTML = total_first_txn_date_date;
        total_first_txn_date_days = data.kusama_transfers_data.total_transfers.total.total_first_txn_date.days_since
        document.getElementById('total_total_first_txn_date_days').innerHTML = total_first_txn_date_days;

        // total withdrawal
        total_withdrawal_failed_gas_coin = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_gas_coins_failed
        document.getElementById('total_withdrawal_failed_gas_coin').innerHTML = total_withdrawal_failed_gas_coin;
        total_withdrawal_failed_gas_dollars = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_gas_dollars_failed;
        exchangeRates(total_withdrawal_failed_gas_dollars, 'dollar', 'total_withdrawal_failed_gas_dollars')
        total_withdrawal_failed_interactions = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_interactions_failed;
        document.getElementById('total_withdrawal_failed_interactions').innerHTML = total_withdrawal_failed_interactions;
        total_withdrawal_first_txn_date_date = data.kusama_transfers_data.total_transfers.total_withdrawals.withdrawal_first_txn_date.first_txn_full_date;
        document.getElementById('total_withdrawal_first_txn_date_date').innerHTML = total_withdrawal_first_txn_date_date;
        total_withdrawal_first_txn_date_days = data.kusama_transfers_data.total_transfers.total_withdrawals.withdrawal_first_txn_date.days_since;
        document.getElementById('total_withdrawal_first_txn_date_days').innerHTML = total_withdrawal_first_txn_date_days;
        total_withdrawal_gas_coin = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_gas_coins;
        document.getElementById('total_withdrawal_gas_coin').innerHTML = total_withdrawal_gas_coin;
        total_withdrawal_gas_dollars = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_gas_dollars;
        exchangeRates(total_withdrawal_gas_dollars, 'dollar', 'total_withdrawal_gas_dollars')
        total_withdrawal_interactions = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_interactions;
        document.getElementById('total_withdrawal_interactions').innerHTML = total_withdrawal_interactions;
        total_withdrawal_last_txn_date_date = data.kusama_transfers_data.total_transfers.total_withdrawals.withdrawal_last_txn_date.last_txn_full_date;
        document.getElementById('total_withdrawal_last_txn_date_date').innerHTML = total_withdrawal_last_txn_date_date;
        total_withdrawal_last_txn_date_days = data.kusama_transfers_data.total_transfers.total_withdrawals.withdrawal_last_txn_date.days_since;
        document.getElementById('total_withdrawal_last_txn_date_days').innerHTML = total_withdrawal_last_txn_date_days;
        total_withdrawal_volume_coin = data.kusama_transfers_data.total_transfers.total_withdrawals.withdrawal_volume_coins;
        document.getElementById('total_withdrawal_volume_coin').innerHTML = total_withdrawal_volume_coin;
        total_withdrawal_volume_dollars = data.kusama_transfers_data.total_transfers.total_withdrawals.total_withdrawal_volume_dollars;
        exchangeRates(total_withdrawal_volume_dollars, 'dollar', 'total_withdrawal_volume_dollars')
        total_withdrawal_successful_interactions = total_withdrawal_interactions - total_withdrawal_failed_interactions;
        document.getElementById('total-withdrawal-successful-interactions').innerHTML = total_withdrawal_successful_interactions;

        // looping txns
        function rawTransfersSetCurrency(id, value) {
            const para = document.createElement("p");
            var text1 = value[0]
            var dollars2 = value[1] * 1
            var dollars2 = dollars2.toLocaleString("en-US");
            var dollars2 = '$' + dollars2
            var text3 = value[2]
            var dollars4 = value[3] * 1
            var dollars4 = '$' + dollars4
            var text5 = value[4]
            var singleRaw = text1 + dollars2 + text3 + dollars4 + text5
            const node = document.createTextNode(singleRaw);
            para.appendChild(node);
            const element = document.getElementById(id);
            element.appendChild(para);}

            function txnLoopSetCurrency(list, ID) {
            list.forEach(function(value) {
                if (value != '-'){
                    rawTransfersSetCurrency(ID, value)
                } else {document.getElementById(ID).innerHTML = value}
            })}

            // raw txns 
            withdraw_transfers = data.kusama_raw_transfers.raw_transfers.withdraw_transfers
            deposit_transfers = data.kusama_raw_transfers.raw_transfers.deposit_transfers
            document.getElementById('raw-withdrawals').innerHTML = ''
            document.getElementById('raw-deposits').innerHTML = ''
            txnLoopSetCurrency(withdraw_transfers, 'raw-withdrawals')
            txnLoopSetCurrency(deposit_transfers, 'raw-deposits')

            // unique wallets
            // total unique 
            const total_data_key = data.kusama_top_deposit_withdraws.all_top_accounts
            total_unique = total_data_key.all_total
            withdrawals_unique = total_data_key.all_withdrawals
            deposits_unique = total_data_key.all_deposits
            document.getElementById('total-unique-wallets-total').innerHTML = ''
            document.getElementById('total-unique-wallets-withdrawals').innerHTML = ''
            document.getElementById('total-unique-wallets-deposits').innerHTML = ''
            txnLoopSetCurrency(total_unique, 'total-unique-wallets-total')
            txnLoopSetCurrency(withdrawals_unique, 'total-unique-wallets-withdrawals')
            txnLoopSetCurrency(deposits_unique, 'total-unique-wallets-deposits')

            // monthly unique 
            const monthly_data_key =  data.kusama_top_deposit_withdraws.monthly_top_accounts
            monthly_total_unique = monthly_data_key.monthly_total
            monthly_withdrawals_unique = monthly_data_key.monthly_withdrawals
            monthly_deposits_unique = monthly_data_key.monthly_deposits
            document.getElementById('monthly-unique-wallets-total').innerHTML = ''
            document.getElementById('monthly-unique-wallets-withdrawals').innerHTML = ''
            document.getElementById('monthly-unique-wallets-deposits').innerHTML = ''
            txnLoopSetCurrency(monthly_total_unique, 'monthly-unique-wallets-total')
            txnLoopSetCurrency(monthly_withdrawals_unique, 'monthly-unique-wallets-withdrawals')
            txnLoopSetCurrency(monthly_deposits_unique, 'monthly-unique-wallets-deposits')

        data_loaded = true
        document.getElementById('loading-gif').innerHTML = "";
    }
    if (data.wallety_org_kusama_server_status == 200){displayData()}
    else {
        document.getElementById('loading-gif').innerHTML = ''
        alert('Hmm something went wrong, please try again later')
        window.location = window.location.href.split("?")[0];
    }
}
// loading params
var url_string = window.location.href
var url = new URL(url_string);
var wallet_address_TF = url.searchParams.get('wallet_address');
if (wallet_address_TF != null ){
    kusama();
}



// wallet key polkadot
function copy_key_polkadot() {
    navigator.clipboard.writeText(polkadot_address);
    document.getElementById('polkadot_wallet_address').innerHTML = 'Copied!';
    }
function copy_key_reset_polkadot() {
    document.getElementById('polkadot_wallet_address').innerHTML = polkadot_address + ' Click to copy';
}
// wallet key kusama
function copy_key_kusama() {
    navigator.clipboard.writeText(kusama_address);
    document.getElementById('kusama_wallet_address').innerHTML = 'Copied!';
    }
function copy_key_reset_kusama() {
    document.getElementById('kusama_wallet_address').innerHTML = kusama_address + ' Click to copy';
}


// wallety links
// kusama wallety link
function kusama_wallety_link() {
    window.open('https://wallety.org/kusama?wallet_address=' + kusama_address)
}
// polkadot wallety link
function polkadot_wallety_link() {
    window.open('https://wallety.org/polkadot?wallet_address=' + polkadot_address)
}




// join wallety pop up
function joinWpopupOpen() {
    closeOpenTabs();
    document.getElementById("joinWallety").style.display = "block";
    document.getElementById('join-w-submit').innerHTML = 'Submit'
}
function joinWpopupClose() {
    document.getElementById("joinWallety").style.display = "none";
}
// join wallety form
async function sendJoinForm() {
    if (servers_alive == true) {
        var form_name = document.getElementById('form_name').value
        var form_role = document.getElementById('form_role').value
        var form_email = document.getElementById('form_email').value
        var form_project = document.getElementById('form_project').value
        var form_website = document.getElementById('form_website').value
        var form_net = document.getElementById('form_net').value
        var form_comments = document.getElementById('form_comments').value

        if(form_name && form_role && form_email && form_project && form_website && form_net){

            var form_url = 'https://api.kusama.wallety.org/joinwalletyform/?form_name=' + form_name + '&form_role=' + form_role + '&form_email=' + form_email + '&form_project=' + form_project + '&form_website=' + form_website + '&form_net=' + form_net + '&form_comments=' + form_comments

            fetch(form_url);
        
            document.getElementById('form_name').value = ''
            document.getElementById('form_role').value = ''
            document.getElementById('form_email').value = ''
            document.getElementById('form_project').value = ''
            document.getElementById('form_website').value = ''
            document.getElementById('form_net').value = ''
            document.getElementById('form_comments').value = ''
        
            document.getElementById('join-w-submit').innerHTML = 'Sent!'
        } else {alert('Some options have been left blank, please complete the form.')}
    } else {alert('Our servers are currently down, please try again later')}
}




// tool bar pop up
function toolBarOpen() {
    closeOpenTabs()
    document.getElementById("tools").style.display = "block";
}
function toolBarClose() {
    document.getElementById("tools").style.display = "none";
}




// suggest pop up
function suggestOpen() {
    closeOpenTabs()
    document.getElementById("suggest").style.display = "block";
    document.getElementById('suggest-submit').innerHTML = 'Submit'
}
function suggestClose() {
    document.getElementById("suggest").style.display = "none";
}
// suggest form
function sendSuggestForm() {
    if (servers_alive == true) {

        var suggestion = document.getElementById('suggestion').value
        var suggestion_network = 'Kusama'
        var suggest_email = document.getElementById('suggest-email').value
        if (suggest_email == '') {suggest_email = false}

        var suggest_bug = document.getElementById('bug-bttn')
        if (suggest_bug.style.backgroundColor == 'black') {
            var suggest_value = 'Bug'
        } else var suggest_value = 'Suggestion'

        if(suggestion){

            var form_url = 'https://api.kusama.wallety.org/suggestion/?suggestion=' + suggestion + '&network=' + suggestion_network + '&suggest_type=' + suggest_value + '&suggest_email=' + suggest_email

            fetch(form_url);
            document.getElementById('suggestion').value = ''
            document.getElementById('suggest-submit').innerHTML = 'Sent!'
            document.getElementById('suggest-email').value = ''
        } else {alert('Suggestion left blank, please complete the form')}
    } else {alert('Our servers are currently down, please try again later')}
}
function report_req_suggest_bttn() {
    document.getElementById('suggest-bttn').style.color = 'black'
    document.getElementById('suggest-bttn').style.backgroundColor = 'white'
    document.getElementById('bug-bttn').style.color = 'white'
    document.getElementById('bug-bttn').style.backgroundColor = 'black'
}
function report_req_bug_bttn() {
    document.getElementById('bug-bttn').style.color = 'black'
    document.getElementById('bug-bttn').style.backgroundColor = 'white'
    document.getElementById('suggest-bttn').style.color = 'white'
    document.getElementById('suggest-bttn').style.backgroundColor = 'black'
}

// API pop up
function APIOpen() {
    closeOpenTabs()
    document.getElementById("API").style.display = "block";
    document.getElementById('API_submit').innerHTML = 'Submit'
}
function APIClose() {
    document.getElementById("API").style.display = "none";
}
// API form
function sendAPIForm() {
    if (servers_alive == true) {

        var API_name = document.getElementById('API_name').value
        var API_email = document.getElementById('API_email').value
        var API_comments = document.getElementById('API_comments').value

        if(API_name && API_email){

            var form_url = 'https://api.kusama.wallety.org/api_apply/?name=' + API_name + '&email=' + API_email + '&comments=' + API_comments

            fetch(form_url);
            document.getElementById('API_name').value = ''
            document.getElementById('API_email').value = ''
            document.getElementById('API_comments').value = ''
            document.getElementById('API_submit').innerHTML = 'Sent!'
        } else {alert('Input left blank, please complete the form')}
    } else {alert('Our servers are currently down, please try again later')}
}
function report_req_suggest_bttn() {
    document.getElementById('suggest-bttn').style.color = 'black'
    document.getElementById('suggest-bttn').style.backgroundColor = 'white'
    document.getElementById('bug-bttn').style.color = 'white'
    document.getElementById('bug-bttn').style.backgroundColor = 'black'
}
function report_req_bug_bttn() {
    document.getElementById('bug-bttn').style.color = 'black'
    document.getElementById('bug-bttn').style.backgroundColor = 'white'
    document.getElementById('suggest-bttn').style.color = 'white'
    document.getElementById('suggest-bttn').style.backgroundColor = 'black'
}





// share data on twitter
function TWITTERdata() {
    if (data_loaded == true) {    
        tweet_text_data = 'Check out my Kusama wallet analytics on @WalletyOrg !\n'
        var wallet_address = document.getElementById('wallet_address').value;
        tweet_url_data = '&url=Wallety.org/Kusama?Wallet_Address=' + wallet_address
        tweet_hashtag_data = '&hashtags=Kusama,Wallety,WalletyOrg'
        const twitter_open = 'https://twitter.com/intent/tweet?text=' + tweet_text_data + tweet_url_data + tweet_hashtag_data
        window.open(twitter_open)
    } else {alert('Please enter a wallet address or wait for the data to load')}
}
// share data on Facebook
function FACEBOOKdata() {
    if (data_loaded == true) { 
        var wallet_address = document.getElementById('wallet_address').value;
        facebook_url_data = 'www.wallety.org/kusama?wallet_address=' + wallet_address
        const facebook_open = 'https://www.facebook.com/sharer/sharer.php?u=' + facebook_url_data
        window.open(facebook_open)
    } else {alert('Please enter a wallet address or wait for the data to load')}
}
// share data on Linkedin
function LINKEDINdata() {
    if (data_loaded == true) {    
        // const wallet_address = document.getElementById('wallet_address').value;
        // const linkedin_url_data = 'url=www.wallety.org/kusama?wallet_address=' + wallet_address
        linkedin_url_data = 'url=www.wallety.org/kusama'
        const linkedin_open = 'https://linkedin.com/shareArticle?' + linkedin_url_data
        window.open(linkedin_open)
    } else {alert('Please enter a wallet address or wait for the data to load')}
}




function customizeOpen() {
    document.getElementById('customtooltipdiv').style.visibility = 'visible';
}

function customizeClose() {
    document.getElementById('customtooltipdiv').style.visibility = 'hidden';
}
// adding max to custom data inputs
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
   dd = '0' + dd;
}
if (mm < 10) {
   mm = '0' + mm;
} 
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("custom-from").setAttribute("max", today);
document.getElementById("custom-to").setAttribute("max", today);

// setting custom vars 
custom_data_title_date = '-'
// custom total
custom_total_failed_gas_coin = '-'
custom_total_failed_gas_dollars = 0
custom_total_failed_interactions = '-'
custom_total_gas_coin = '-'
custom_total_gas_dollars = 0
custom_total_interactions = '-'
custom_total_volume_coins = '-'
custom_total_volume_dollars = 0
custom_total_successful_interactions = '-'
custom_total_last_txn_date_date = '-'
custom_total_last_txn_date_days = '-'
custom_total_first_txn_date_date = '-'
custom_total_first_txn_date_days = '-'
// custom deposit
custom_deposit_interactions = '-'
custom_deposit_volume_coins = '-'
custom_deposit_volume_dollars = 0
custom_deposits_first_txn_date_date = '-'
custom_deposits_first_txn_date_days = '-'
custom_deposits_last_txn_date_date = '-'
custom_deposits_last_txn_date_days = '-'
// custom withdrawal
custom_withdrawal_failed_gas_coin = '-'
custom_withdrawal_failed_gas_dollars = 0
custom_withdrawal_failed_interactions = '-'
custom_withdrawal_first_txn_date_date = '-'
custom_withdrawal_first_txn_date_days = '-'
custom_withdrawal_gas_coin = '-'
custom_withdrawal_gas_dollars = 0
custom_withdrawal_interactions = '-'
custom_withdrawal_last_txn_date_date = '-'
custom_withdrawal_last_txn_date_days = '-'
custom_withdrawal_volume_coin = '-'
custom_withdrawal_volume_dollars = 0
custom_withdrawal_successful_interactions =  '-'
// custom unique CSV
// custom unique total
custom_CSV_u_total_transfers = ['-']
// custom unique withdraws
custom_CSV_u_withdraws_transfers = ['-']
// custom unique deposits
custom_CSV_u_deposits_transfers = ['-']


customDataTF = false

async function customData() {

    data_loaded = false

    var from = document.getElementById('custom-from').value
    var to = document.getElementById('custom-to').value
    var wallet_address = document.getElementById('wallet_address').value;
    var display_check = document.getElementById('display_name').innerHTML;
 
    if (from && to && wallet_address && display_check != '-') {
        // close 
        document.getElementById('customtooltipdiv').style.visibility = 'hidden';
        // take away calender 
        document.getElementById('customLoading').innerHTML = ''
        // loading start 
        var custom_loading_img = document.createElement("img");
        custom_loading_img.src = 'images/loading.gif';
        var custom_loading_span = document.getElementById("customLoading");
        custom_loading_span.appendChild(custom_loading_img);

        const customUrl = 'https://api.kusama.wallety.org/kusama/customdata/?' + '&wallet_address=' + wallet_address  + '&from=' + from + '&to=' + to
    
        customData = await fetch(customUrl)
        customData = await customData.json();

        // displaying custom data
        // custom data title
        document.getElementById('monthly-data-title').innerHTML = 'Custom Transfer Data'
        custom_data_title_date = customData.custom_data_total.custom_dates_title
        document.getElementById('monthly-data-title-date').innerHTML = custom_data_title_date

        // custom total
        document.getElementById('monthly-total-data-title').innerHTML = 'Custom Total'
        custom_total_failed_gas_coin = customData.custom_data_total.custom_total_failed_gas_coin
        document.getElementById('monthly_total_failed_gas_coin').innerHTML = custom_total_failed_gas_coin;
        custom_total_failed_gas_dollars = customData.custom_data_total.custom_total_failed_gas_dollars
        document.getElementById('monthly_total_failed_gas_dollars').innerHTML = custom_total_failed_gas_dollars;
        custom_total_failed_interactions = customData.custom_data_withdrawals.custom_withdrawal_failed_interactions
        document.getElementById('monthly_total_failed_interactions').innerHTML = custom_total_failed_interactions;
        custom_total_gas_coin = customData.custom_data_total.custom_total_gas_coin
        document.getElementById('monthly_total_gas_coin').innerHTML = custom_total_gas_coin;
        custom_total_gas_dollars = customData.custom_data_total.custom_total_gas_dollars
        document.getElementById('monthly_total_gas_dollars').innerHTML = custom_total_gas_dollars;
        custom_total_interactions = customData.custom_data_total.custom_total_interactions
        document.getElementById('monthly_total_interactions').innerHTML = custom_total_interactions;
        custom_total_volume_coins = customData.custom_data_total.custom_total_volume_coins
        document.getElementById('monthly_total_volume_coins').innerHTML = custom_total_volume_coins;
        custom_total_volume_dollars = customData.custom_data_total.custom_total_volume_dollars
        document.getElementById('monthly_total_volume_dollars').innerHTML = custom_total_volume_dollars;
        custom_total_successful_interactions = custom_total_interactions - custom_total_failed_interactions;
        document.getElementById('monthly-total-successful-interactions').innerHTML = custom_total_successful_interactions;
        custom_total_last_txn_date_date = customData.custom_data_total.custom_total_last_txn_date.last_txn_full_date
        document.getElementById('monthly_total_last_txn_date_date').innerHTML = custom_total_last_txn_date_date;
        custom_total_last_txn_date_days = customData.custom_data_total.custom_total_last_txn_date.days_since
        document.getElementById('monthly_total_last_txn_date_days').innerHTML = custom_total_last_txn_date_days;
        custom_total_first_txn_date_date = customData.custom_data_total.custom_total_first_txn_date.first_txn_full_date
        document.getElementById('monthly_total_first_txn_date_date').innerHTML = custom_total_first_txn_date_date;
        custom_total_first_txn_date_days = customData.custom_data_total.custom_total_first_txn_date.days_since
        document.getElementById('monthly_total_first_txn_date_days').innerHTML = custom_total_first_txn_date_days;

        // custom deposit
        document.getElementById('monthly-deposit-data-title').innerHTML = 'Custom Deposits'
        custom_deposit_interactions = customData.custom_data_deposits.custom_deposit_interactions
        document.getElementById('monthly_deposit_interactions').innerHTML = custom_deposit_interactions;
        custom_deposit_volume_coins = customData.custom_data_deposits.custom_deposit_volume_coins
        document.getElementById('monthly_deposit_volume_coins').innerHTML = custom_deposit_volume_coins;
        custom_deposit_volume_dollars = customData.custom_data_deposits.custom_deposit_volume_dollars
        document.getElementById('monthly_deposit_volume_dollars').innerHTML = custom_deposit_volume_dollars;
        custom_deposits_first_txn_date_date = customData.custom_data_deposits.custom_deposits_first_txn_date.first_txn_full_date
        document.getElementById('monthly_deposits_first_txn_date_date').innerHTML = custom_deposits_first_txn_date_date;
        custom_deposits_first_txn_date_days = customData.custom_data_deposits.custom_deposits_first_txn_date.days_since
        document.getElementById('monthly_deposits_first_txn_date_days').innerHTML = custom_deposits_first_txn_date_days;
        custom_deposits_last_txn_date_date = customData.custom_data_deposits.custom_deposits_last_txn_date.last_txn_full_date
        document.getElementById('monthly_deposits_last_txn_date_date').innerHTML = custom_deposits_last_txn_date_date;
        custom_deposits_last_txn_date_days = customData.custom_data_deposits.custom_deposits_last_txn_date.days_since
        document.getElementById('monthly_deposits_last_txn_date_days').innerHTML = custom_deposits_last_txn_date_days;

        // custom withdrawal
        document.getElementById('monthly-withdrawal-data-title').innerHTML = 'Custom Withdrawals'
        custom_withdrawal_failed_gas_coin = customData.custom_data_withdrawals.custom_withdrawal_failed_gas_coin
        document.getElementById('monthly_withdrawal_failed_gas_coin').innerHTML = custom_withdrawal_failed_gas_coin;
        custom_withdrawal_failed_gas_dollars = customData.custom_data_withdrawals.custom_withdrawal_failed_gas_dollars
        document.getElementById('monthly_withdrawal_failed_gas_dollars').innerHTML = custom_withdrawal_failed_gas_dollars;
        custom_withdrawal_failed_interactions = customData.custom_data_withdrawals.custom_withdrawal_failed_interactions
        document.getElementById('monthly_withdrawal_failed_interactions').innerHTML = custom_withdrawal_failed_interactions;
        custom_withdrawal_first_txn_date_date = customData.custom_data_withdrawals.custom_withdrawal_first_txn_date.first_txn_full_date
        document.getElementById('monthly_withdrawal_first_txn_date_date').innerHTML = custom_withdrawal_first_txn_date_date;
        custom_withdrawal_first_txn_date_days = customData.custom_data_withdrawals.custom_withdrawal_first_txn_date.days_since
        document.getElementById('monthly_withdrawal_first_txn_date_days').innerHTML = custom_withdrawal_first_txn_date_days;
        custom_withdrawal_gas_coin = customData.custom_data_withdrawals.custom_withdrawal_gas_coin
        document.getElementById('monthly_withdrawal_gas_coin').innerHTML = custom_withdrawal_gas_coin;
        custom_withdrawal_gas_dollars = customData.custom_data_withdrawals.custom_withdrawal_gas_dollars
        document.getElementById('monthly_withdrawal_gas_dollars').innerHTML = custom_withdrawal_gas_dollars;
        custom_withdrawal_interactions = customData.custom_data_withdrawals.custom_withdrawal_interactions
        document.getElementById('monthly_withdrawal_interactions').innerHTML = custom_withdrawal_interactions;
        custom_withdrawal_last_txn_date_date = customData.custom_data_withdrawals.custom_withdrawal_last_txn_date.last_txn_full_date
        document.getElementById('monthly_withdrawal_last_txn_date_date').innerHTML = custom_withdrawal_last_txn_date_date;
        custom_withdrawal_last_txn_date_days = customData.custom_data_withdrawals.custom_withdrawal_last_txn_date.days_since
        document.getElementById('monthly_withdrawal_last_txn_date_days').innerHTML = custom_withdrawal_last_txn_date_days;
        custom_withdrawal_volume_coin = customData.custom_data_withdrawals.custom_withdrawal_volume_coin
        document.getElementById('monthly_withdrawal_volume_coin').innerHTML = custom_withdrawal_volume_coin;
        custom_withdrawal_volume_dollars = customData.custom_data_withdrawals.custom_withdrawal_volume_dollars
        document.getElementById('monthly_withdrawal_volume_dollars').innerHTML = custom_withdrawal_volume_dollars;
        custom_withdrawal_successful_interactions =  custom_withdrawal_interactions - custom_withdrawal_failed_interactions;
        document.getElementById('monthly-withdrawal-successful-interactions').innerHTML = custom_withdrawal_successful_interactions;

        // looping txns
        function rawTransfersSetCurrency(id, value) {
            const para = document.createElement("p");
            var text1 = value[0]
            var dollars2 = value[1] * 1
            var dollars2 = dollars2.toLocaleString("en-US");
            var dollars2 = '$' + dollars2
            var text3 = value[2]
            var dollars4 = value[3] * 1
            var dollars4 = '$' + dollars4
            var text5 = value[4]
            var singleRaw = text1 + dollars2 + text3 + dollars4 + text5
            const node = document.createTextNode(singleRaw);
            para.appendChild(node);
            const element = document.getElementById(id);
            element.appendChild(para);}
            function txnLoopSetCurrency(list, ID) {
            list.forEach(function(value) {
                if (value != '-'){
                    rawTransfersSetCurrency(ID, value)
                } else {document.getElementById(ID).innerHTML = value}
            })}


        // custom unique 
        custom_data_key = customData.custom_top_accounts.all_top_accounts
        custom_total_unique = custom_data_key.all_total
        custom_deposits_unique = custom_data_key.all_deposits
        custom_withdrawals_unique = custom_data_key.all_withdrawals

        // custom title
        document.getElementById('monthly-unique-title').innerHTML = 'Custom Unique Wallets'
        document.getElementById('monthly-unique-wallets-total-p').innerHTML = 'Custom Total'
        document.getElementById('monthly-unique-wallets-total').innerHTML = ''
        txnLoopSetCurrency(custom_total_unique, 'monthly-unique-wallets-total')
        document.getElementById('monthly-unique-wallets-deposit-p').innerHTML = 'Custom Deposits'
        document.getElementById('monthly-unique-wallets-deposits').innerHTML = ''
        txnLoopSetCurrency(custom_deposits_unique, 'monthly-unique-wallets-deposits')
        document.getElementById('monthly-unique-wallets-withdrawal-p').innerHTML = 'Custom Withdrawals'
        document.getElementById('monthly-unique-wallets-withdrawals').innerHTML = ''
        txnLoopSetCurrency(custom_withdrawals_unique, 'monthly-unique-wallets-withdrawals')

        // custom deposit
        exchangeRates(custom_deposit_volume_dollars, 'dollar', 'monthly_deposit_volume_dollars')
        // custom total
        exchangeRates(custom_total_failed_gas_dollars, 'dollar', 'monthly_total_failed_gas_dollars')
        exchangeRates(custom_total_gas_dollars, 'dollar', 'monthly_total_gas_dollars')
        exchangeRates(custom_total_volume_dollars, 'dollar', 'monthly_total_volume_dollars')
        // custom withdrawal
        exchangeRates(custom_withdrawal_failed_gas_dollars, 'dollar', 'monthly_withdrawal_failed_gas_dollars')
        exchangeRates(custom_withdrawal_gas_dollars, 'dollar', 'monthly_withdrawal_gas_dollars')
        exchangeRates(custom_withdrawal_volume_dollars, 'dollar', 'monthly_withdrawal_volume_dollars')

        // custom tool tips
        document.getElementById('monthly-t-data-tooltip').innerHTML = 'Custom transfer data lets you see your total, deposit and withdrawal custom asset spending and data'
        document.getElementById('monthly-u-data-tooltip').innerHTML = 'Custom unique wallets lets you see your total, withdrawal and deposited interactions with individual addreses you have transacted with'

        // finishing
        customDataTF = true
        // loading over
        document.getElementById("customLoading").innerHTML = '';
        data_loaded = true
        // add back calender icon
        var custom_loading_img = document.createElement("img");
        custom_loading_img.src = 'images/custom-data-icon.svg';
        var custom_loading_span = document.getElementById("customLoading");
        custom_loading_span.appendChild(custom_loading_img);
    } else {alert('Please ensure a custom time frame has been enterd and wallet search has been made')}

}

function closeOpenTabs() {
    customizeClose()
}

// currency change functions
// getting FOREX exchange rates
async function exchangeRateLatest(){
    const exchangeRateReq = await fetch("https://api.exchangerate.host/latest?base=USD")
    const exchangeRateRes = await exchangeRateReq.json()
    exchangeRateValues = exchangeRateRes.rates
}
exchangeRateLatest();

// data currency change
async function exchangeRates(number, exchangeCurrency, ID) {
    if (exchangeCurrency == 'dollar') {
        var ticker = '$'
        value = number * 1
        value = value.toLocaleString("en-US");
        value = ticker + value
        document.getElementById(ID).innerHTML = value;
    }
    if (exchangeCurrency == 'pound') {
        var ticker = '£'
        value = number * exchangeRateValues.GBP
        value = value.toLocaleString("en-US");
        value = ticker + value
        document.getElementById(ID).innerHTML = value;
    }
    if (exchangeCurrency == 'euro') {
        var ticker = '€'
        value = number * exchangeRateValues.EUR
        value = value.toLocaleString("en-US");
        value = ticker + value
        document.getElementById(ID).innerHTML = value;
    }
}

async function changeCurrencyData(newCurrency) {
    // getting rates and ticker
    if (newCurrency == 'pound'){
        currentRate = exchangeRateValues.GBP
        ticker = '£'
    }
    if (newCurrency == 'euro'){
        currentRate = exchangeRateValues.EUR
        ticker = '€'
    }
    if (newCurrency == 'dollar'){
        currentRate = 1
        ticker = '$'
    }
    // looping txns
    function rawTransfersChangeCurrency(id, value) {
        const para = document.createElement("p");
        var text1 = value[0]
        var dollars2 = value[1] * currentRate
        var dollars2 = dollars2.toLocaleString("en-US");
        var dollars2 = ticker + dollars2
        var text3 = value[2]
        var dollars4 = value[3] * currentRate
        var dollars4 = ticker + dollars4
        var text5 = value[4]
        var singleRaw = text1 + dollars2 + text3 + dollars4 + text5
        const node = document.createTextNode(singleRaw);
        para.appendChild(node);
        const element = document.getElementById(id);
        element.appendChild(para);}
        function txnLoopChangeCurrency(list, ID) {
        list.forEach(function(value) {
            if (value != '-'){
                rawTransfersChangeCurrency(ID, value)
            } else {document.getElementById(ID).innerHTML = value}
        })}
        // raw txns 
        const withdraw_transfers = data.kusama_raw_transfers.raw_transfers.withdraw_transfers
        const deposit_transfers = data.kusama_raw_transfers.raw_transfers.deposit_transfers
        document.getElementById('raw-withdrawals').innerHTML = ''
        document.getElementById('raw-deposits').innerHTML = ''
        txnLoopChangeCurrency(withdraw_transfers, 'raw-withdrawals')
        txnLoopChangeCurrency(deposit_transfers, 'raw-deposits')
        // unique wallets
        // total unique 
        const total_data_key = data.kusama_top_deposit_withdraws.all_top_accounts
        const total_unique = total_data_key.all_total
        const withdrawals_unique = total_data_key.all_withdrawals
        const deposits_unique = total_data_key.all_deposits
        document.getElementById('total-unique-wallets-total').innerHTML = ''
        document.getElementById('total-unique-wallets-withdrawals').innerHTML = ''
        document.getElementById('total-unique-wallets-deposits').innerHTML = ''
        txnLoopChangeCurrency(total_unique, 'total-unique-wallets-total')
        txnLoopChangeCurrency(withdrawals_unique, 'total-unique-wallets-withdrawals')
        txnLoopChangeCurrency(deposits_unique, 'total-unique-wallets-deposits')
    // general
    exchangeRates(kusamaPrice, newCurrency, 'kusama_price')
    exchangeRates(market_cap, newCurrency, 'market_cap')
    // dollar gas price
    new_dollar_gas_price = dollar_gas_price * currentRate
    new_dollar_gas_price = ticker + new_dollar_gas_price
    new_dollar_gas_price = new_dollar_gas_price.slice(0, 10);
    document.getElementById('dollar_gas_price').innerHTML = new_dollar_gas_price
    // balances
    exchangeRates(total_balance_dollars, newCurrency, 'total_balance_dollars')
    exchangeRates(transferable_balance_dollars, newCurrency, 'transferable_balance_dollars')
    exchangeRates(locked_balance_dollars, newCurrency, 'locked_balance_dollars')
    exchangeRates(reserved_balance_dollars, newCurrency, 'reserved_balance_dollars')
    // paperhanded diamondhanded
    // paper
    exchangeRates(paper_dollars, newCurrency, 'paper-dollars')
    // diamond
    exchangeRates(diamond_dollars, newCurrency, 'diamond-dollars')
    // monthly / custom
    // monthly
    if (customDataTF == false) {
        // monthly deposit
        exchangeRates(monthly_deposit_volume_dollars, newCurrency, 'monthly_deposit_volume_dollars')
        // monthly total
        exchangeRates(monthly_total_failed_gas_dollars, newCurrency, 'monthly_total_failed_gas_dollars')
        exchangeRates(monthly_total_gas_dollars, newCurrency, 'monthly_total_gas_dollars')
        exchangeRates(monthly_total_volume_dollars, newCurrency, 'monthly_total_volume_dollars')
        // monthly withdrawal
        exchangeRates(monthly_withdrawal_failed_gas_dollars, newCurrency, 'monthly_withdrawal_failed_gas_dollars')
        exchangeRates(monthly_withdrawal_gas_dollars, newCurrency, 'monthly_withdrawal_gas_dollars')
        exchangeRates(monthly_withdrawal_volume_dollars, newCurrency, 'monthly_withdrawal_volume_dollars')
        // monthly unique 
        const monthly_data_key =  data.kusama_top_deposit_withdraws.monthly_top_accounts
        const monthly_total_unique = monthly_data_key.monthly_total
        const monthly_withdrawals_unique = monthly_data_key.monthly_withdrawals
        const monthly_deposits_unique = monthly_data_key.monthly_deposits
        document.getElementById('monthly-unique-wallets-total').innerHTML = ''
        document.getElementById('monthly-unique-wallets-withdrawals').innerHTML = ''
        document.getElementById('monthly-unique-wallets-deposits').innerHTML = ''
        txnLoopChangeCurrency(monthly_total_unique, 'monthly-unique-wallets-total')
        txnLoopChangeCurrency(monthly_withdrawals_unique, 'monthly-unique-wallets-withdrawals')
        txnLoopChangeCurrency(monthly_deposits_unique, 'monthly-unique-wallets-deposits')
    }
    // custom
    if (customDataTF == true) {
        // custom deposit
        exchangeRates(custom_deposit_volume_dollars, newCurrency, 'monthly_deposit_volume_dollars')
        // custom total
        exchangeRates(custom_total_failed_gas_dollars, newCurrency, 'monthly_total_failed_gas_dollars')
        exchangeRates(custom_total_gas_dollars, newCurrency, 'monthly_total_gas_dollars')
        exchangeRates(custom_total_volume_dollars, newCurrency, 'monthly_total_volume_dollars')
        // custom withdrawal
        exchangeRates(custom_withdrawal_failed_gas_dollars, newCurrency, 'monthly_withdrawal_failed_gas_dollars')
        exchangeRates(custom_withdrawal_gas_dollars, newCurrency, 'monthly_withdrawal_gas_dollars')
        exchangeRates(custom_withdrawal_volume_dollars, newCurrency, 'monthly_withdrawal_volume_dollars')
        // custom unique 
        custom_data_key = customData.custom_top_accounts.all_top_accounts
        custom_total_unique = custom_data_key.all_total
        custom_deposits_unique = custom_data_key.all_deposits
        custom_withdrawals_unique = custom_data_key.all_withdrawals
        document.getElementById('monthly-unique-wallets-total').innerHTML = ''
        document.getElementById('monthly-unique-wallets-withdrawals').innerHTML = ''
        document.getElementById('monthly-unique-wallets-deposits').innerHTML = ''
        txnLoopChangeCurrency(custom_total_unique, 'monthly-unique-wallets-total')
        txnLoopChangeCurrency(custom_deposits_unique, 'monthly-unique-wallets-deposits')
        txnLoopChangeCurrency(custom_withdrawals_unique, 'monthly-unique-wallets-withdrawals')
    }
    // total
    // total deposit
    exchangeRates(total_deposit_volume_dollars, newCurrency, 'total_deposit_volume_dollars')
    // total total
    exchangeRates(total_total_failed_gas_dollars, newCurrency, 'total_total_failed_gas_dollars')
    exchangeRates(total_total_gas_dollars, newCurrency, 'total_total_gas_dollars')
    exchangeRates(total_total_volume_dollars, newCurrency, 'total_total_volume_dollars')
    // total withdrawal
    exchangeRates(total_withdrawal_failed_gas_dollars, newCurrency, 'total_withdrawal_failed_gas_dollars')
    exchangeRates(total_withdrawal_gas_dollars, newCurrency, 'total_withdrawal_gas_dollars')
    exchangeRates(total_withdrawal_volume_dollars, newCurrency, 'total_withdrawal_volume_dollars')
}


// defualt to dollar
ticker = "$"
currentRate = 1
var customCurrencyLoading = false
function changeCurrencyDollar() {
    if (customCurrencyLoading != true && data_loaded == true && general_data_loaded == true && wallet_address.value != '' && customCurrencyLoading != true) {
        customCurrencyLoading = true
        document.getElementById('currencyDollar').style.backgroundColor = 'black'
        document.getElementById('currencyDollar').style.color = 'white'
        document.getElementById('currencyPound').style.backgroundColor = 'white'
        document.getElementById('currencyPound').style.color = 'black'
        document.getElementById('currencyEuro').style.backgroundColor = 'white'
        document.getElementById('currencyEuro').style.color = 'black'
        changeCurrencyData('dollar');
        customCurrencyLoading = false
    } else {alert('Please wait for the data to load or enter a wallet address')}
}

function changeCurrencyPound() {
    if (customCurrencyLoading != true && data_loaded == true && general_data_loaded == true && wallet_address.value != '' && customCurrencyLoading != true) {
        customCurrencyLoading = true
        document.getElementById('currencyDollar').style.backgroundColor = 'white'
        document.getElementById('currencyDollar').style.color = 'black'
        document.getElementById('currencyPound').style.backgroundColor = 'black'
        document.getElementById('currencyPound').style.color = 'white'
        document.getElementById('currencyEuro').style.backgroundColor = 'white'
        document.getElementById('currencyEuro').style.color = 'black'
        changeCurrencyData('pound');
        customCurrencyLoading = false
    } else {alert('Please wait for the data to load or enter a wallet address')}
}

function changeCurrencyEuro() {
    if (customCurrencyLoading != true && data_loaded == true && general_data_loaded == true && wallet_address.value != '' && customCurrencyLoading != true) {
        customCurrencyLoading = true
        document.getElementById('currencyDollar').style.backgroundColor = 'white'
        document.getElementById('currencyDollar').style.color = 'black'
        document.getElementById('currencyPound').style.backgroundColor = 'white'
        document.getElementById('currencyPound').style.color = 'black'
        document.getElementById('currencyEuro').style.backgroundColor = 'black'
        document.getElementById('currencyEuro').style.color = 'white'
        changeCurrencyData('euro');
        customCurrencyLoading = false
    } else {alert('Please wait for the data to load or enter a wallet address')}
}

    // looping CSV txns
    function CSVLoopSetCurrency(data, dict) {
        data.forEach(function(value) {
        if (value != '-'){
            var text1 = value[0]
            var dollars2 = value[1] * currentRate
            var dollars2 = dollars2.toLocaleString("en-US");
            var dollars2 = ticker + dollars2
            var text3 = value[2]
            var dollars4 = value[3] * currentRate
            var dollars4 = ticker + dollars4
            var text5 = value[4]
            var CSVRaw = text1 + dollars2 + text3 + dollars4 + text5
            dict.push([CSVRaw])
        } else {dict.push(['-'])}
    })}


// export data as csv
function CSVdata() {
    if (data_loaded == true){
        // raw transfers CSV
        // raw withdraws
        CSV_withdraw_transfers = []
        CSVLoopSetCurrency(withdraw_transfers, CSV_withdraw_transfers)
        // raw deposits
        CSV_deposits_transfers = []
        CSVLoopSetCurrency(deposit_transfers, CSV_deposits_transfers)
        // monthly unique CSV
        // monthly unique total
        CSV_u_m_total_transfers = []
        CSVLoopSetCurrency(monthly_total_unique, CSV_u_m_total_transfers)
        // monthly unique withdraws
        CSV_u_m_withdraws_transfers = []
        CSVLoopSetCurrency(monthly_withdrawals_unique, CSV_u_m_withdraws_transfers)
        // monthly unique deposits
        CSV_u_m_deposits_transfers = []
        CSVLoopSetCurrency(monthly_deposits_unique, CSV_u_m_deposits_transfers)
        // total unique CSV
        // total unique total
        CSV_u_total_transfers = []
        CSVLoopSetCurrency(total_unique, CSV_u_total_transfers)
        // total unique withdraws
        CSV_u_withdraws_transfers = []
        CSVLoopSetCurrency(withdrawals_unique, CSV_u_withdraws_transfers)
        // total unique deposits
        CSV_u_deposits_transfers = []
        CSVLoopSetCurrency(deposits_unique, CSV_u_deposits_transfers)
        if (customDataTF == true) {
            // custom unique CSV
            // custom unique total
            custom_CSV_u_total_transfers = []
            CSVLoopSetCurrency(custom_total_unique, custom_CSV_u_total_transfers)
            // custom unique withdraws
            custom_CSV_u_withdraws_transfers = []
            CSVLoopSetCurrency(custom_withdrawals_unique, custom_CSV_u_withdraws_transfers)
            // custom unique deposits
            custom_CSV_u_deposits_transfers = []
            CSVLoopSetCurrency(custom_deposits_unique, custom_CSV_u_deposits_transfers)
        }
        function CSVSmalldataPoint(data_point) {
            var CSVpoint = data_point * currentRate
            var CSVpoint = ticker + CSVpoint
            return CSVpoint
        }
        function CSVdataPoint(data_point) {
            var CSVpoint = data_point * currentRate
            var CSVpoint = CSVpoint.toLocaleString("en-US");
            var CSVpoint = ticker + CSVpoint
            return CSVpoint
        }
        var csv_data = [
            ['Wallety.org Kusama Data Export', current_dates, 'Wallet Address', key, 'Kusama Price', CSVdataPoint(kusamaPrice), '24hr PnL', kusama_p_increase, 'Market Cap', CSVdataPoint(market_cap), 'Last Gas', coin_gas_price, CSVSmalldataPoint(dollar_gas_price), 'Transfer Count', transfer_count],
            [""],
            [""],
            ["Profile"],
            ['Display Name', display_name, 'Legal Name', legal_name, 'Twitter', twitter, 'Index', index, 'Role', role, 'Website', website, 'Email', email, 'Element', element],
            [""],
            [""],
            ["Balances"],
            ["Total Balance", total_balance, CSVdataPoint(total_balance_dollars), 'Transferable Balance', transferable_balance, CSVdataPoint(transferable_balance_dollars),  'Locked Balance', locked_balance, CSVdataPoint(locked_balance_dollars), 'Reserved Balance', reserved_balance, CSVdataPoint(reserved_balance_dollars)],
            [""],
            [""],
            ["Paper Handed", paper_coins, CSVdataPoint(paper_dollars)],
            ["Diamond Coins", diamond_coins, CSVdataPoint(diamond_dollars)],
            [""],
            [""],
            ["Raw Transactions"],
            ["Deposits"],
            CSV_deposits_transfers, 
            ["Withdrawals"],
            CSV_withdraw_transfers,
            [""],
            [""],
            ["Monthly Data", monthly_data_title_date], 
            [""],
            ["Monthly Deposit"],
            ["Monthly Deposit Interactions", monthly_deposit_interactions, 'Monthly Deposit Volume', monthly_deposit_volume_coins, CSVdataPoint(monthly_deposit_volume_dollars), 'Monthly Deposit First Transaction Date', monthly_deposits_first_txn_date_date, monthly_deposits_first_txn_date_days, 'Monthly Deposit Last Transaction Date', monthly_deposits_last_txn_date_date, monthly_deposits_last_txn_date_days],
            ["Monthly Total"],
            ["monthly Total Failed Gas", monthly_total_failed_gas_coin, CSVSmalldataPoint(monthly_total_failed_gas_dollars), 'Monthly Total Failed Interactions', monthly_total_failed_interactions, 'Monthly Total Gas', monthly_total_gas_coin, CSVSmalldataPoint(monthly_total_gas_dollars), 'Monthly Total Interactions', monthly_total_interactions, 'Monthly Total Volume', monthly_total_volume_coins, CSVdataPoint(monthly_total_volume_dollars), 'Monthly Total Successful Interactions', monthly_total_successful_interactions, 'Monthly Total Last Transaction Date', monthly_total_last_txn_date_date, monthly_total_last_txn_date_days, 'Monthly Total First Transaction Date', monthly_total_first_txn_date_date, monthly_total_first_txn_date_days],
            ["Monthly Withdrawal"],
            ["Monthly Withdrawal Failed Gas", monthly_withdrawal_failed_gas_coin, CSVSmalldataPoint(monthly_withdrawal_failed_gas_dollars), 'Monthly Withdrawal Failed Interactions', monthly_withdrawal_failed_interactions, 'Monthly Withdrawal First Transaction Date', monthly_withdrawal_first_txn_date_date, monthly_withdrawal_first_txn_date_days, 'Monthly Withdrawal Gas', monthly_withdrawal_gas_coin, CSVSmalldataPoint(monthly_withdrawal_gas_dollars), 'Monthly Withdrawal Interactions', monthly_withdrawal_interactions, 'Monthly Withdrawal Last Transaction Date', monthly_withdrawal_last_txn_date_date, monthly_withdrawal_last_txn_date_days, 'Monthly Withdrawal Volume Coin', monthly_withdrawal_volume_coin, CSVdataPoint(monthly_withdrawal_volume_dollars), 'Monthly Withdrawal Successful Interactions', monthly_withdrawal_successful_interactions], 
            [""],
            ["Monthly Unique Transactions"],
            ["Monthly Total Unique"],
            CSV_u_m_total_transfers,
            ["Monthly Withdrawals Unique"],
            CSV_u_m_withdraws_transfers,
            ["Monthly Deposits Unique"],
            CSV_u_m_deposits_transfers,
            [""],
            [""],
            ["Total Data", total_data_title_date],
            [""],
            ["Total Deposit"],
            ["Total Deposit Interactions", total_deposit_interactions, 'Total Deposit Volume', total_deposit_volume_coins, CSVdataPoint(total_deposit_volume_dollars), 'Total Deposits First Transaction Date', total_deposits_first_txn_date_date, total_deposits_first_txn_date_days, 'Total Deposits Last Transaction Date', total_deposits_last_txn_date_date, total_deposits_last_txn_date_days],
            ["Total Total"],
            ["Total Total Failed Gas", total_total_failed_gas_coin, CSVSmalldataPoint(total_total_failed_gas_dollars), 'Total Total Failed Interactions', total_total_failed_interactions, 'Total Total Gas', total_total_gas_coin, CSVSmalldataPoint(total_total_gas_dollars), 'Total Total Interactions', total_total_interactions, 'Total Total Volume', total_total_volume_coins, CSVdataPoint(total_total_volume_dollars), 'Total Total Successful Interactions', total_total_successful_interactions, 'Total Last Transaction Date', total_last_txn_date_date, total_last_txn_date_days, 'Total First Transaction Date', total_first_txn_date_date, total_first_txn_date_days],
            ["Total Withdrawal"],
            ['Total Withdrawal Failed Gas', total_withdrawal_failed_gas_coin, CSVSmalldataPoint(total_withdrawal_failed_gas_dollars), 'Total Withdrawal Failed Interactions', total_withdrawal_failed_interactions, 'Total Withdrawal First Transaction Date', total_withdrawal_first_txn_date_date, total_withdrawal_first_txn_date_days, 'Total Withdrawal Gas', total_withdrawal_gas_coin, CSVSmalldataPoint(total_withdrawal_gas_dollars), 'Total Withdrawal Interactions', total_withdrawal_interactions, 'Total Withdrawal Last Transaction Date', total_withdrawal_last_txn_date_date, total_withdrawal_last_txn_date_days, 'Total Withdrawal Volume', total_withdrawal_volume_coin, CSVdataPoint(total_withdrawal_volume_dollars), 'Total Withdrawal Successful Interactions', total_withdrawal_successful_interactions], 
            [""],
            ["Total Unique Transactions"],
            ["Total Unique"],
            CSV_u_total_transfers,
            ["Withdrawals Unique"],
            CSV_u_withdraws_transfers,
            ["Deposits Unique"],
            CSV_u_deposits_transfers,
            [""],
            [""],
            ["Custom Data", custom_data_title_date],
            [""],
            ["Custom Deposit"],
            ["Custom Deposit Interactions", custom_deposit_interactions, 'Custom Deposit Volume', custom_deposit_volume_coins, CSVdataPoint(custom_deposit_volume_dollars), 'Custom Deposit First Transaction Date', custom_deposits_first_txn_date_date, custom_deposits_first_txn_date_days, 'Custom Deposit Last Transaction Date', custom_deposits_last_txn_date_date, custom_deposits_last_txn_date_days],
            ["Custom Total"],
            ["Custom Total Failed Gas", custom_total_failed_gas_coin, CSVSmalldataPoint(custom_total_failed_gas_dollars), 'Custom Total Failed Interactions', custom_total_failed_interactions, 'Custom Total Gas', custom_total_gas_coin, CSVSmalldataPoint(custom_total_gas_dollars), 'Custom Total Interactions', custom_total_interactions, 'Custom Total Volume', custom_total_volume_coins, CSVdataPoint(custom_total_volume_dollars), 'Custom Total Successful Interactions', custom_total_successful_interactions, 'Custom Total Last Transaction Date', custom_total_last_txn_date_date, custom_total_last_txn_date_days, 'Custom Total First Transaction Date', custom_total_first_txn_date_date, custom_total_first_txn_date_days],
            ["Custom Withdrawal"],
            ["Custom Withdrawal Failed Gas", custom_withdrawal_failed_gas_coin, CSVSmalldataPoint(custom_withdrawal_failed_gas_dollars), 'Custom Withdrawal Failed Interactions', custom_withdrawal_failed_interactions, 'Custom Withdrawal First Transaction Date', custom_withdrawal_first_txn_date_date, custom_withdrawal_first_txn_date_days, 'Custom Withdrawal Gas', custom_withdrawal_gas_coin, CSVSmalldataPoint(custom_withdrawal_gas_dollars), 'Custom Withdrawal Interactions', custom_withdrawal_interactions, 'Custom Withdrawal Last Transaction Date', custom_withdrawal_last_txn_date_date, custom_withdrawal_last_txn_date_days, 'Custom Withdrawal Volume Coin', custom_withdrawal_volume_coin, CSVdataPoint(custom_withdrawal_volume_dollars), 'Custom Withdrawal Successful Interactions', custom_withdrawal_successful_interactions], 
            [""],
            ["Custom Unique Transactions"],
            ["Custom Total Unique"],
            custom_CSV_u_total_transfers, 
            ["Custom Withdrawals Unique"], 
            custom_CSV_u_withdraws_transfers, 
            ["Custom Deposits Unique"], 
            custom_CSV_u_deposits_transfers
         ];

         function download_csv() {
            var csv = '';
            csv_data.forEach(function(row) {
                row_csv = ''
                row.forEach(function(point) {
                    data_point = "\"" + point + "\""
                    row_csv += data_point + ','
                })     
                csv += row_csv + ','
                csv += '\n'
            });
            current_dates_short = data.current_dates.short_date
            csvName = "Wallety.org-KSM-Data-" + display_name + '-' + current_dates_short + ".csv";
            var a = document.createElement('a');
            a.href = 'data:attachment/csv,' +  encodeURIComponent(csv);
            a.target = '_blank';
            a.download = csvName;
            document.body.appendChild(a);
            a.click();
        }
        download_csv();
    } else {alert('We couldn\'t find any data, please enter a wallet address or wait for it to load')}
}

