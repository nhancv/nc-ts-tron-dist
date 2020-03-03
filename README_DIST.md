# TS TRON DISTRIBUTION

This project provide an api collection to create TRON wallet, sending TRX asset

## Usage
* Note: All apis required add `token` to header request. The `token` value define in `.env` file.

1. Create new TRON wallet api
```
Method: GET
Endpoint: /api/newwallet

Example:
curl -X GET -H 'token: 1234' -i 'http://localhost:7777/api/newwallet'

Response:
{
    "code": 200,
    "body": {
        "privateKey": "D6D56719D7B0FC38558C81A4201984A8A8E23605AC2E1E4F3BE90BFD55BC6476",
        "publicKey": "04F8AF076832E0A3AF2A1410C9BCA409338A99F038999269F417E23C5FA1661023B9B65622C7ADA77DCC2C1AB4AD9BC46D2C3CEBCDFDEB646D6733120C5F058159",
        "address": {
            "base58": "TF7cUfaQnK5Z5HK8kuhkW99uMSjD1gZaKs",
            "hex": "41386F8DAA05CFBE17046980E11588513C8288B733"
        }
    }
}
```

2. Sending TRX asset
```
Method: POST
Endpoint: /api/sendreward/:receiverAddress
Body: Content-Type: application/json
{
	"amount": 0.1
}

Example:
curl -X POST -H 'Content-Type: application/json' -H 'token: 1234' -i 'http://localhost:7777/api/sendreward/TF7cUfaQnK5Z5HK8kuhkW99uMSjD1gZaKs' --data '{"amount":0.1}'

Response:
{
    "code": 200,
    "body": {
        "txRawId": "8a29b9e1a717854a24ef130ee324ea3969de32406007230ae430abee55893ce9",
        "txRawHex": "0a0232b422086a2ac0f101c39f1840d8e4e4da892e5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a1541cba6374124b2320e7ff309033ecba4be5f81b2ea121541386f8daa05cfbe17046980e11588513c8288b73318a08d0670ad93e1da892e",
        "explorer": "https://shasta.tronscan.org/#/transaction/8a29b9e1a717854a24ef130ee324ea3969de32406007230ae430abee55893ce9"
    }
}
```

## Installation

- Install git
```
# Ubuntu
sudo apt install -y git

# Centos
sudo yum install -y git
```
- Install node
```
# Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install -y nodejs

# Centos
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
```

- Install node process management
```
sudo npm install pm2 -g

# Install pm2 rotate logging
pm2 install pm2-logrotate
```

- Clone project, cd to source, install libs
```
npm i
```

- Config project: update value on `.env` (refer to `.env_sample`). If the `.env` file is not exist, just create one.

Example configuration for testing only
```
PORT=7777
# Change from dev to production when you config for live
NODE_ENV=dev
# Change to another complex has when you config for live
GATEWAY_AUTHENTICATION_TOKEN_IN=1234
# TRON Wallet
# Testing wallet: TF7cUfaQnK5Z5HK8kuhkW99uMSjD1gZaKs
TRON_OWNER_PRIVATE=D6D56719D7B0FC38558C81A4201984A8A8E23605AC2E1E4F3BE90BFD55BC6476
```

- Update `~/.bash_aliases`

* For Centos: Please note that `~/.bash_aliases` file only works if the following line presents in the `~/.bashrc` file. Just append at the end of the `~/.bashrc`
```
if [ -f ~/.bash_aliases ]; then
. ~/.bash_aliases
fi
```

* `~/.bash_aliases` content
```
alias pm2logs.home='cd ~/.pm2/logs/'

alias tronreward.home='cd ~/workspace/tronreward'
alias tronreward.pull='tronreward.home && git pull'
alias tronreward.start='pm2 start npm --name tronreward -- run production'
alias tronreward.stop='pm2 stop tronreward'
alias tronreward.restart='pm2 restart tronreward'
alias tronreward.reload='pm2 reload tronreward'
alias tronreward.logs='pm2 logs tronreward'

alias bash.up="source ~/.bash_aliases"
alias file.bash="nano ~/.bash_aliases"
```


## Maintenance

```
# Reload application with zero downtime after change source or configuration
$ tronreward.reload

# Start application in the first time (dont have any starting instance yet)
$ tronreward.start

# View app log
$ tronreward.logs

# Full restart application
$ tronreward.restart
```
