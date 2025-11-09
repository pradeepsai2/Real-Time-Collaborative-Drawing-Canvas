"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDrawEvent = addDrawEvent;
exports.getHistory = getHistory;
const history = [];
function addDrawEvent(event) {
    history.push(event);
}
function getHistory() {
    return history;
}
