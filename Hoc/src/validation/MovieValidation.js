import Joi from 'joi';

export const movieValidation = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    "string.base": "Tiêu đề phải là văn bản",
    "string.empty": "Tiêu đề không được để trống",
    "string.min": "Tiêu đề phải có ít nhất 3 ký tự",
    "string.max": "Tiêu đề không được dài quá 100 ký tự",
    "any.required": "Tiêu đề không được bỏ trống"
  }),
  description: Joi.string().max(500).optional().messages({
    "string.base": "Mô tả phải là văn bản",
    "string.max": "Mô tả không được dài quá 500 ký tự"
  }),
  releaseDate: Joi.date().iso().required().messages({
    "date.base": "Ngày phát hành phải là một ngày hợp lệ",
    "any.required": "Ngày phát hành không được bỏ trống"
  }),
 category: Joi.array().items(Joi.string().length(24)).messages({
    "array.base": "Thể loại phải là mảng",
    "string.length": "Mỗi thể loại phải là một ObjectId hợp lệ"
  }),
  imageUrl: Joi.string().uri().required().messages({
    "string.base": "URL hình ảnh phải là một văn bản",
    "string.uri": "URL hình ảnh phải là một địa chỉ URL hợp lệ",
    "any.required": "URL hình ảnh không được bỏ trống"
  })
});
