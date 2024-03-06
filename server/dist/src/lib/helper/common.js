"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.convertToValidPhoneNumber = exports.invoice = exports.toModel = exports.delay = void 0;
const multer_1 = __importDefault(require("multer"));
const failure_1 = require("./failure");
async function delay(value) {
    return new Promise((resolve) => setTimeout(resolve, value));
}
exports.delay = delay;
function toModel(object) {
    let model = {};
    for (const [key, value] of Object.entries(object)) {
        model = { ...model, [key]: value };
    }
    return model;
}
exports.toModel = toModel;
function invoice() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const prefix = "INV";
    const dateString = day + month + year + hours + minutes + seconds;
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    return prefix + dateString + randomDigits;
}
exports.invoice = invoice;
function convertToValidPhoneNumber(phoneNumber) {
    // Check if the phone number already starts with '+62' or '62'
    if (phoneNumber.startsWith("+62") || phoneNumber.startsWith("62")) {
        // Phone number is already valid
        return phoneNumber;
    }
    // Check if the phone number starts with '0'
    if (phoneNumber.startsWith("0")) {
        // Remove the leading '0' and prepend '62'
        return "62" + phoneNumber.substring(1);
    }
    // Add '62' prefix to the phone number
    return "62" + phoneNumber;
}
exports.convertToValidPhoneNumber = convertToValidPhoneNumber;
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "upload/image/");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + ".jpg");
        },
    }),
    fileFilter: (_, file, cb) => {
        const images = ["image/jpeg", "image/jpg", "image/png"];
        if (images.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new failure_1.BadRequest("Hanya gambar yang boleh di upload"));
        }
    },
}).array("picture");
