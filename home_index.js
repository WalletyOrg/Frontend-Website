


window.onload = async function checkServers() {
// kusama server alive check
await fetch('https://api.kusama.wallety.org/').then(() => {
    // active or not
    document.getElementById('kusama-status').innerHTML = 'Active';
    document.getElementById('kusama-status').style.color = 'green';
    // pulse colour
    document.getElementById('kusama-blob').style.backgroundColor = 'green';
    document.getElementById('kusama-blob').style.boxShadow = 'green';
  }).catch(() => {
    // active or not
    document.getElementById('kusama-status').innerHTML = 'Inactive';
    document.getElementById('kusama-status').style.color = 'red';
    // // pulse colour
    document.getElementById('kusama-blob').style.backgroundColor = 'red';
    document.getElementById('kusama-blob').style.boxShadow = 'red';
});
// polkadot server alive check
await fetch('https://api.polkadot.wallety.org/').then(() => {
    // active or not
    document.getElementById('polkadot-status').innerHTML = 'Active';
    document.getElementById('polkadot-status').style.color = 'green';
    // pulse colour
    document.getElementById('polkadot-blob').style.backgroundColor = 'green';
    document.getElementById('polkadot-blob').style.boxShadow = 'green';
  }).catch(() => {
    // active or not
    document.getElementById('polkadot-status').innerHTML = 'Inactive';
    document.getElementById('polkadot-status').style.color = 'red';
    // // pulse colour
    document.getElementById('polkadot-blob').style.backgroundColor = 'red';
    document.getElementById('polkadot-blob').style.boxShadow = 'red';
});

servers_alive = false
// main server alive check
await fetch('https://api.polkadot.wallety.org/').then(() => {
    servers_alive = true
    document.getElementById('serversDown').style.visibility = 'hidden'
    document.getElementById('loading-screen').style.visibility = 'hidden'
    document.getElementById('loading-screen').style.display = 'none'
    document.getElementById('main').style.visibility = 'visible'
    document.getElementById('main-bottom').style.display = 'flex'
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
    document.getElementById('loading-screen').style.display = 'none'
    document.getElementById('main').style.visibility = 'hidden'
    document.getElementById('serversDown').style.visibility = 'visible'
    document.getElementById('serversDown').style.display = 'flex'
});
}



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
                        var api_url = 'https://api.kusama.wallety.org/walletcheck/?wallet_address=' + wallet_address
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network == 'kusama') {
                            var api_url = 'https://wallety.org/kusama.html?wallet_address=' + wallet_address
                            location.href = api_url;}    
                        else {
                            if (checkNetworkReqResponce.wallet_network != false) {
                                var alert_text = 'Kusama wallet address not found, this is a ' + checkNetworkReqResponce.wallet_network + ' wallet address'
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
                        var api_url = 'https://api.polkadot.wallety.org/walletcheck/?wallet_address=' + wallet_address
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network == 'polkadot') {
                            var api_url = 'https://wallety.org/polkadot.html?wallet_address=' + wallet_address
                            location.href = api_url;}
                        else {
                            if (checkNetworkReqResponce.wallet_network != false) {
                                var alert_text = 'Polkadot wallet address not found, this is a ' + checkNetworkReqResponce.wallet_network + ' wallet address'
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
                        var api_url = 'https://api.kusama.wallety.org/walletcheck/?wallet_address=' + wallet_address
                        checkNetworkReq = await fetch(api_url)
                        checkNetworkReqResponce = await checkNetworkReq.json()
                        if (checkNetworkReqResponce.wallet_network == 'polkadot') {
                            var api_url = 'https://wallety.org/polkadot.html?wallet_address=' + wallet_address
                            location.href = api_url;}
                        else if (checkNetworkReqResponce.wallet_network == 'kusama') {
                            var api_url = 'https://wallety.org/kusama.html?wallet_address=' + wallet_address
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



// join wallety pop up
function joinWpopupOpen() {
    if (servers_alive == true) {
        document.getElementById("joinWallety").style.display = "block";
        document.getElementById('join-w-submit').innerHTML = 'Submit'
    } else {alert('Our servers are currently down, please try again later')}
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





// suggest pop up
function suggestOpen() {
    if (servers_alive == true) {
        document.getElementById("suggest").style.display = "block";
        document.getElementById('suggest-submit').innerHTML = 'Submit'
    } else {alert('Our servers are currently down, please try again later')}
}
function suggestClose() {
    document.getElementById("suggest").style.display = "none";
}


// suggest form
function sendSuggestForm() {
    if (servers_alive == true) {

        var suggestion = document.getElementById('suggestion').value
        var suggestion_network = 'Home'
        var suggest_email = document.getElementById('suggest-email').value
        if (suggest_email == '') {suggest_email = false}

        var suggest_bug = document.getElementById('bug-bttn')
        if (suggest_bug.style.backgroundColor == 'black') {
            var suggest_value = 'Bug'
        } else var suggest_value = 'Suggestion'

        if(suggestion){

            var form_url = 'https://api.polkadot.wallety.org/suggestion/?suggestion=' + suggestion + '&network=' + suggestion_network + '&suggest_type=' + suggest_value + '&suggest_email=' + suggest_email


            fetch(form_url);
            document.getElementById('suggestion').value = ''
            document.getElementById('suggest-submit').innerHTML = 'Sent!'
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