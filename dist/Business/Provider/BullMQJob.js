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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * For BullMQ
 * Docs: https://docs.bullmq.io
 * Required: Redis installed first
 */
var bullmq_1 = require("bullmq");
var Log_1 = __importDefault(require("../../Base/Log"));
var BullMQJob = /** @class */ (function () {
    function BullMQJob() {
    }
    BullMQJob.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            function addJobs() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, myQueue.add('myJobName1', { foo: 'bar' })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, myQueue.add('myJobName2', { qux: 'baz' })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var cronQueue, myQueue, worker, queueEvents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Example cron job
                        new bullmq_1.QueueScheduler('cronJob');
                        cronQueue = new bullmq_1.Queue('cronJob');
                        new bullmq_1.Worker('cronJob', function (job) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                Log_1.default.info("CronQueue: " + job.name + ": " + JSON.stringify(job.data));
                                return [2 /*return*/];
                            });
                        }); }).on('completed', function (job) {
                            Log_1.default.info("CronQueue job:" + job.id + " has completed!");
                        });
                        // Repeat job every minute.
                        return [4 /*yield*/, cronQueue.add('every_min', { color: 'yellow' }, {
                                repeat: {
                                    cron: '* * * * *'
                                }
                            })];
                    case 1:
                        // Repeat job every minute.
                        _a.sent();
                        myQueue = new bullmq_1.Queue('fistQueue');
                        worker = new bullmq_1.Worker('fistQueue', function (job) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // Will print { foo: 'bar'} for the first job
                                // and { qux: 'baz' } for the second.
                                Log_1.default.info(job.name + ": " + JSON.stringify(job.data));
                                return [2 /*return*/];
                            });
                        }); });
                        worker.on('completed', function (job) {
                            Log_1.default.info("Worker job:" + job.id + " has completed!");
                        });
                        worker.on('failed', function (job, err) {
                            Log_1.default.info("Worker job:" + job.id + " has failed with " + err.message);
                        });
                        queueEvents = new bullmq_1.QueueEvents('fistQueue');
                        queueEvents.on('completed', function (event) {
                            Log_1.default.info("Event job:" + event.jobId + " has completed!");
                        });
                        queueEvents.on('failed', function (event, err) {
                            Log_1.default.info("Event job:" + event.jobId + " has failed with " + err.message);
                        });
                        // Test
                        return [4 /*yield*/, addJobs()];
                    case 2:
                        // Test
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BullMQJob;
}());
exports.default = BullMQJob;
//# sourceMappingURL=BullMQJob.js.map