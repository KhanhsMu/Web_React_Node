import CategoryModel from "../models/CategoryModel.js";
import Category from "../models/CategoryModel.js";
import MovieModels from "../models/MovieModels.js";

// Lấy danh sách tất cả category
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      message: "Danh sách category",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

// Lấy chi tiết 1 category theo id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    return res.status(200).json({ message: "Chi tiết category", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

// Tạo category mới
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Tên category là bắt buộc" });

    const newCategory = new Category({ name, description });
    await newCategory.save();

    return res.status(201).json({ message: "Tạo category thành công", data: newCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

// Cập nhật category
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category không tồn tại" });

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    return res.status(200).json({ message: "Cập nhật category thành công", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

// Xóa category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category không tồn tại" });

    return res.status(200).json({ message: "Xóa category thành công" });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

// tìm kiếm phim theo thể loại
export const getMoviesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;  // Lấy categoryId từ tham số URL

    // Tìm thể loại theo categoryId
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category không tồn tại' });
    }

    // Tìm tất cả các phim thuộc thể loại đó
    const movies = await MovieModels.find({ category: categoryId }).populate('category', 'name');

    res.status(200).json({
      message: `Danh sách phim trong thể loại ${category.name}`,
      data: movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || error });
  }
};
