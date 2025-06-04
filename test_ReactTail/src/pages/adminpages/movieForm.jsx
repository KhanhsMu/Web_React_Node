import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { createMovie, updateMovie } from "../../services/moviesServices";
import { getAllCategories } from "../../services/categoryServices";

const MovieForm = ({ initialData, onSuccess }) => {
  const { register, handleSubmit, setValue, control, reset } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      setCategories(res.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        releaseDate: initialData.releaseDate?.slice(0, 10) || "",
        imageUrl: initialData.imageUrl || "",
      });
      setValue("category", initialData.category?.[0]?._id || "");
    }
  }, [initialData, reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        category: [data.category],
      };
      if (initialData?._id) {
        await updateMovie(initialData._id, payload);
      } else {
        await createMovie(payload);
      }
      onSuccess();
      reset();
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded shadow mb-4"
    >
      <input
        {...register("title", { required: true })}
        placeholder="Tiêu đề"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("description")}
        placeholder="Mô tả"
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        {...register("releaseDate", { required: true })}
        className="w-full border p-2 rounded"
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={categories.map((cat) => ({
              value: cat._id,
              label: cat.name,
            }))}
            value={categories
              .map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))
              .find((opt) => opt.value === field.value) || null}
            onChange={(option) => field.onChange(option.value)}
            placeholder="Chọn thể loại..."
            className="text-sm"
          />
        )}
      />

      <input
        {...register("imageUrl", { required: true })}
        placeholder="URL hình ảnh"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {initialData?._id ? "Cập nhật" : "Thêm"}
      </button>
    </form>
  );
};

export default MovieForm;
