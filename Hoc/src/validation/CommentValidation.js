import Joi from 'joi';

export const commentValidation = Joi.object({
  userId: Joi.string().required().messages({
    'string.empty': 'User ID là bắt buộc',
    'any.required': 'User ID không được để trống',
  }),
  movieId: Joi.string().required().messages({
    'string.empty': 'Movie ID là bắt buộc',
    'any.required': 'Movie ID không được để trống',
  }),
  commentText: Joi.string().min(1).max(200).required().messages({
    'string.empty': 'Nội dung bình luận không được để trống',
    'string.min': 'Nội dung bình luận phải có ít nhất 1 ký tự',
    'string.max': 'Nội dung bình luận không được quá 200 ký tự',
    'any.required': 'Nội dung bình luận là bắt buộc',
  }),
});

