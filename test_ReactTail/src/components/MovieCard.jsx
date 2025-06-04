import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300">
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-4 space-y-3">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                {movie.englishTitle && (
                    <p className="text-sm italic text-yellow-200">{movie.englishTitle}</p>
                )}

                <div className="flex items-center gap-2 mt-3">
                    <button
                        onClick={() => navigate(`/comment/${movie._id}`)}
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-full text-sm shadow"
                    >
                        Xem ngay
                    </button>
                    <button
                        onClick={() => alert(`Thông tin phim: ${movie.title}`)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white text-sm shadow"
                    >
                        Chi tiết
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    {movie.rating && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-2 py-1 rounded">
                            IMDb {movie.rating}
                        </span>
                    )}
                    {movie.age && (
                        <span className="bg-white text-black font-semibold px-2 py-1 rounded">
                            T{movie.age}
                        </span>
                    )}
                    {movie.year && <span>{movie.year}</span>}
                    {movie.season && <span>Phần {movie.season}</span>}
                    {movie.episode && <span>Tập {movie.episode}</span>}
                </div>

                {movie.category && movie.category.length > 0 && (
                    <div className="text-sm mt-2 text-white/90">
                        {movie.category.map((cat, i) => (
                            <span key={i}>
                                {cat.name}
                                {i < movie.category.length - 1 && " · "}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
