import {body, param, validationResult} from 'express-validator';

export const validatePostCreation = [
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a String'),
    body('content')
        .isString()
        .notEmpty()
        .withMessage('Content is required'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validatePostUpdate = [

];

export const validatePostDeletion = [
    param('id')
    .exists().withMessage('Post ID is required')
    .isInt({min: 1}).withMessage('Post ID must be a positive integer'),
    (request, response, next) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        next();
    }

]