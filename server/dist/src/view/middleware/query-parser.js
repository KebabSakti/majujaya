"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const failure_1 = require("../../lib/helper/failure");
async function queryParser(req, res, next) {
    try {
        const param = {
            paginate: req.query.skip == undefined || req.query.take == undefined
                ? undefined
                : {
                    skip: parseInt(req.query.skip),
                    take: parseInt(req.query.take),
                },
            sorting: {
                field: req.query.field,
                direction: req.query.direction,
            },
        };
        req.query.parsedQuery = param;
        next();
    }
    catch (error) {
        failure_1.Failure.handle(error, res);
    }
}
exports.default = queryParser;
