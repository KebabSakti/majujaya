"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whatsapp = void 0;
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const fs_1 = __importDefault(require("fs"));
const node_cache_1 = __importDefault(require("node-cache"));
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({ timestamp: () => `,"time":"${new Date().toJSON()}"` });
logger.level = "silent";
const msgRetryCounterCache = new node_cache_1.default();
const authDir = "wauth";
const idSuffix = "@s.whatsapp.net";
class Whatsapp {
    static socket;
    static async init(app) {
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(authDir);
        const { version } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const sock = (0, baileys_1.default)({
            version,
            logger,
            printQRInTerminal: false,
            auth: {
                creds: state.creds,
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            msgRetryCounterCache,
            generateHighQualityLinkPreview: true,
        });
        sock.ev.process(async (events) => {
            if (events["connection.update"]) {
                const update = events["connection.update"];
                const { connection, lastDisconnect, qr } = update;
                if (connection === "open") {
                    app.locals.qr = { status: "complete", qr: null };
                }
                if (connection === "close") {
                    if (lastDisconnect?.error?.output?.statusCode ==
                        baileys_1.DisconnectReason.loggedOut) {
                        fs_1.default.rmSync(authDir, {
                            recursive: true,
                            force: true,
                        });
                    }
                    this.init(app);
                }
                if (qr) {
                    app.locals.qr = { status: "pending", qr: qr };
                }
            }
            if (events["creds.update"]) {
                await saveCreds();
            }
        });
        this.socket = sock;
    }
    static async send(phone, message) {
        if (this.socket) {
            const id = phone + idSuffix;
            if (message.length > 0) {
                await this.socket.sendMessage(id, {
                    text: message,
                });
            }
        }
    }
}
exports.Whatsapp = Whatsapp;
