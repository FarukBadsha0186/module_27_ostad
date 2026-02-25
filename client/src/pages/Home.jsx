import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import API from "../services/api";

function Home() {
  const [topNews, setTopNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  

  useEffect(() => {
    fetchTopNews();
    fetchAllNews();
  }, []);

  const fetchTopNews = async () => {
    try {
      const res = await API.get("/news/top");
      setTopNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllNews = async () => {
    try {
      const res = await API.get("/news");
      setAllNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="bg-gray-100">

      {/* 1️⃣ Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to News Portal</h1>
        <p className="mt-4">Stay updated with the latest news</p>
      </section>

      {/* 2️⃣ Top 6 News Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8">Top 6 Latest News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {topNews.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      </section>

      {/* 3️⃣ All News Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8">All News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {allNews.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      </section>

     

      

    </div>
  );
}

export default Home;