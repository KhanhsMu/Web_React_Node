import Joi from "joi";

export const singUpValidation = Joi.object({
    userName: Joi.string().required().min(6).max(255).messages({
        "string.empty": "userName khong duoc de trong",
        "any.required": "userName la bat buoc",
        "string.min": "userName co it nhat {#limit} ký tự",
        "string.max": "userName co it hon {#limit +1 } ký tự",
    }),
    email: Joi.string().required().email({ tlds: { allow: false } }).messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
}),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password khong duoc de trong",
        "any.required": "password la bat buoc",
        "string.min": "password co it nhat {#limit} ký tự",
        "string.max": "password co it hon {#limit +1 } ký tự",
    }),
   confirmPassword: Joi.string().min(6).max(255).valid(Joi.ref('password')).required().messages({
        "string.empty": "Confirm password không được để trống",
        "any.required": "Confirm password là bắt buộc",
        "string.min": "Confirm password có ít nhất {#limit} ký tự",
        "string.max": "Confirm password có ít hơn {#limit + 1} ký tự",
        "any.only": "Confirm password không khớp với password"
}),
    role: Joi.string()
})

export const singInValidation = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }).messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không đúng định dạng",
}),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password khong duoc de trong",
        "any.required": "password la bat buoc",
        "string.min": "password co it nhat {#limit} ký tự",
        "string.max": "password co it hon {#limit +1 } ký tự",
    }),
})


export const updateUserValidation = Joi.object({
    userName: Joi.string().required().min(6).max(255).messages({
        "string.empty": "userName khong duoc de trong",
        "any.required": "userName la bat buoc",
        "string.min": "userName co it nhat {#limit} ký tự",
        "string.max": "userName co it hon {#limit +1 } ký tự",
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.empty": "password khong duoc de trong",
        "any.required": "password la bat buoc",
        "string.min": "password co it nhat {#limit} ký tự",
        "string.max": "password co it hon {#limit +1 } ký tự",
    }),
   confirmPassword: Joi.string().min(6).max(255).valid(Joi.ref('password')).required().messages({
        "string.empty": "Confirm password không được để trống",
        "any.required": "Confirm password là bắt buộc",
        "string.min": "Confirm password có ít nhất {#limit} ký tự",
        "string.max": "Confirm password có ít hơn {#limit + 1} ký tự",
        "any.only": "Confirm password không khớp với password"
}),
})
.options({
    stripUnknown: true,
})
