
servers_alive = false
// main server alive check
fetch('https://kusama.web.api.wallety.org/').then(() => {
    servers_alive = true
  }).catch(() => {
    servers_alive = false
});


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
                        var api_url = 'https://kusama.web.api.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=kusama'
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
                        var api_url = 'https://polkadot.web.api.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=polkadot'
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
                        var api_url = 'https://polkadot.web.api.wallety.org/walletcheck/?wallet_address=' + wallet_address + '&specified_network=all'
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


function closeBanner() {
    document.getElementById('banner').style.display = 'none'
}