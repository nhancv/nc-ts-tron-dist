"use strict";
/*
 * Developed by Nhan Cao on 11/23/19, 1:45 AM.
 * Last modified 11/23/19, 1:45 AM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RilModule_1 = __importDefault(require("../../Base/RilModule"));
var tronweb_1 = __importDefault(require("tronweb"));
var Log_1 = __importDefault(require("../../Base/Log"));
var TRC20TokenClientLite = /** @class */ (function (_super) {
    __extends(TRC20TokenClientLite, _super);
    function TRC20TokenClientLite(tokenAddress) {
        if (tokenAddress === void 0) { tokenAddress = (process.env.USDT_TRC20_TOKEN || ''); }
        var _this = _super.call(this) || this;
        _this.isTestnet = process.env.NODE_ENV === 'dev';
        _this.walletPrivateKey = process.env.TRON_OWNER_PRIVATE || '';
        _this.tokenAddress = tokenAddress;
        _this.providerHost = _this.isTestnet ?
            'https://api.shasta.trongrid.io'
            : 'https://api.trongrid.io';
        return _this;
    }
    TRC20TokenClientLite.prototype.initTron = function () {
        var HttpProvider = tronweb_1.default.providers.HttpProvider;
        var fullNode = new HttpProvider("" + this.providerHost);
        var solidityNode = new HttpProvider("" + this.providerHost);
        var eventServer = "" + this.providerHost;
        this.tronWeb = new tronweb_1.default(fullNode, solidityNode, eventServer, this.walletPrivateKey);
        this.ownerAddress = this.tronWeb.address.fromPrivateKey(this.walletPrivateKey);
    };
    TRC20TokenClientLite.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initTron();
                        if (!this.tronWeb) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.viewBalance()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TRC20TokenClientLite.prototype.viewBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tronWeb || !this.ownerAddress)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.tronWeb.trx.getBalance(this.ownerAddress)];
                    case 1:
                        balance = _a.sent();
                        Log_1.default.info('Owner balance: ' + (balance / Math.pow(10, 6) + " TRX"));
                        return [2 /*return*/];
                }
            });
        });
    };
    // https://developers.tron.network/reference#sendrawtransaction
    TRC20TokenClientLite.prototype.signAndSubmitTx = function (tronWeb, rawTxObject, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var sign, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tronWeb.trx.sign(rawTxObject, privateKey)];
                    case 1:
                        sign = _a.sent();
                        return [4 /*yield*/, tronWeb.trx.sendRawTransaction(sign)];
                    case 2:
                        receipt = _a.sent();
                        // console.log(receipt);
                        return [2 /*return*/, receipt];
                }
            });
        });
    };
    // https://developers.tron.network/docs/trc20-introduction
    // https://developers.tron.network/docs/tronweb-transaction-builder
    // https://developers.tron.network/reference#sendtoken
    TRC20TokenClientLite.prototype.sendTRONToken = function (recipientAddress, tokenAmount, tokenID) {
        if (tokenAmount === void 0) { tokenAmount = 1; }
        if (tokenID === void 0) { tokenID = 'TRX'; }
        return __awaiter(this, void 0, void 0, function () {
            var res, trxDecimals, amount, rawTxObj, rawTxObj, txId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!this.tronWeb || !this.ownerAddress || !this.walletPrivateKey)
                            return [2 /*return*/, {
                                    error: true,
                                    msg: 'Tron client has not initialized yet.'
                                }];
                        if (tokenAmount <= 0) {
                            Log_1.default.info('Invalid amount');
                            return [2 /*return*/, {
                                    error: true,
                                    msg: 'Invalid amount'
                                }];
                        }
                        Log_1.default.info("CREATING " + tokenID + " TX FOR RECIPIENT ADDRESS: " + recipientAddress + " WITH amount " + tokenAmount + " " + tokenID);
                        Log_1.default.info("SENDING ADDRESS: " + this.ownerAddress);
                        res = void 0;
                        if (!(tokenID == 'TRX')) return [3 /*break*/, 3];
                        trxDecimals = 6;
                        amount = tokenAmount * Math.pow(10, trxDecimals);
                        return [4 /*yield*/, this.tronWeb.transactionBuilder.sendTrx(recipientAddress, amount)];
                    case 1:
                        rawTxObj = _a.sent();
                        return [4 /*yield*/, this.signAndSubmitTx(this.tronWeb, rawTxObj, this.walletPrivateKey)];
                    case 2:
                        // console.log({rawTxObj});
                        res = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.tronWeb.transactionBuilder.sendToken(recipientAddress, tokenAmount, tokenID)];
                    case 4:
                        rawTxObj = _a.sent();
                        return [4 /*yield*/, this.signAndSubmitTx(this.tronWeb, rawTxObj, this.walletPrivateKey)];
                    case 5:
                        // console.log({rawTxObj});
                        res = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (res && res.result) {
                            txId = res.transaction.txID;
                            return [2 /*return*/, {
                                    error: false,
                                    tx: {
                                        txRawId: txId,
                                        txRawHex: res.transaction.raw_data_hex,
                                        explorer: this.isTestnet ?
                                            "https://shasta.tronscan.org/#/transaction/" + txId
                                            : "https://tronscan.org/#/transaction/" + txId
                                    }
                                }];
                        }
                        return [2 /*return*/, {
                                error: true,
                                msg: 'Invalid transaction'
                            }];
                    case 7:
                        e_1 = _a.sent();
                        Log_1.default.error(JSON.stringify(e_1));
                        return [2 /*return*/, {
                                error: true,
                                msg: e_1
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // https://developers.tron.network/reference#createaccount
    TRC20TokenClientLite.prototype.createAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tronWeb.createAccount()];
            });
        });
    };
    return TRC20TokenClientLite;
}(RilModule_1.default));
exports.default = TRC20TokenClientLite;
//# sourceMappingURL=TRC20TokenClientLite.js.map