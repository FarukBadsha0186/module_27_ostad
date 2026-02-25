import { Link } from "react-router-dom";

function NewsCard({ news }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{news.title}</h2>
        <p className="text-gray-600 text-sm mb-3">
          {news.description.slice(0, 80)}...
        </p>

        <Link
          to={`/news/${news._id}`}
          className="text-blue-600 font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;