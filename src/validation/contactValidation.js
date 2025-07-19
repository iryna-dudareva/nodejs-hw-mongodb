import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    contactType: Joi.string().valid('personal', 'work', 'other').required(),
    isFavourite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().min(3).max(20).optional(),
    contactType: Joi.string().valid('personal', 'work', 'other').optional(),
    isFavourite: Joi.boolean().optional(),
}).min(1);