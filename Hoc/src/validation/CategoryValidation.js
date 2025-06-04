import Joi from "joi";

export const categoryValidation = Joi.object({
    name: Joi.string().required().min(3).message({
    "string.empty": "Thể loại không được để trống",
    })
})