import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import API from "../services/api";

function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    API.get("/news")
      .then((res) => {
        setNewsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        All News
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </div>
  );
}

export default News;