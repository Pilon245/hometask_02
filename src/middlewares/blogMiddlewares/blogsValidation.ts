// import {body, validationResult} from "express-validator";
// import {NextFunction, Request, Response} from "express";
// import {authMiddleware} from "../authMiddleware";
// // import {inputValidation} from "../inputValidation";
//
// export const blogValidation = [
//     body( "name")
//         .isString().withMessage("Field 'name' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'name' cannot be empty.")
//         .isLength({min: 1, max: 15}).withMessage("Min length of field 'name' 1 max 15."),
//     body( "youtubeUrl")
//         .isString().withMessage("Field 'youtubeUrl' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'youtubeUrl' cannot be empty.")
//         .isLength({min: 1, max: 100}).withMessage("Min length of field 'youtubeUrl' 1 max 100.")
//         .isURL().withMessage("Field 'youtubeUrl' is invalid."),
//     // inputValidation
// ]