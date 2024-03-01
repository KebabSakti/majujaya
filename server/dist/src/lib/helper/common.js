"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = exports.toModel = exports.delay = void 0;
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
