"use strict";
/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var MongoProvider_1 = require("../MongoProvider");
var logger = console;
var BaseRepo = /** @class */ (function () {
    function BaseRepo(collectionName) {
        this.collection = MongoProvider_1.MongoProvider.instance.store.collection(collectionName);
    }
    BaseRepo.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.insertOne(item)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_1 = _a.sent();
                        logger.error(e_1.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.insertMany = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.insertMany(item)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_2 = _a.sent();
                        logger.error(e_2.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.update = function (query, item, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.updateOne(query, { $set: item }, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_3 = _a.sent();
                        logger.error(e_3.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.replace = function (query, doc) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.replaceOne(query, doc)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_4 = _a.sent();
                        logger.error(e_4.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.delete = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.deleteOne(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_5 = _a.sent();
                        logger.error(e_5.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.deleteMany = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.deleteMany(query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !!result.result.ok && !!result.result.n];
                    case 2:
                        e_6 = _a.sent();
                        logger.error(e_6.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.find = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.find(item).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_7 = _a.sent();
                        logger.error(e_7.message);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.findOne(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_8 = _a.sent();
                        logger.error(e_8.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.find({}).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_9 = _a.sent();
                        logger.error(e_9.message);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepo.prototype.findByManyId = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.find({ _id: { $in: ids } }).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_10 = _a.sent();
                        logger.error(e_10.message);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BaseRepo;
}());
exports.BaseRepo = BaseRepo;
//# sourceMappingURL=BaseRepo.js.map