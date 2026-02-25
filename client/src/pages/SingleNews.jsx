import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function SingleNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/news/${id}`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!news) return <p className="p-6">News not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

      <img
        src={news.image}
        alt=""
        className="w-full rounded mb-4"
      />

      <p className="text-gray-700 leading-relaxed">
        {news.description}
      </p>
    </div>
  );
}

export default SingleNews;