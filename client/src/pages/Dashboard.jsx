import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const [myNews, setMyNews] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
    loadMyNews();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
      setName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMyNews = async () => {
    try {
      const res = await API.get("/news/my-news");
      setMyNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNews = async () => {
    try {
      await API.post("/news", { title, description, image, category });
      resetForm();
      loadMyNews();
    } catch (error) {
      alert("Create Failed");
    }
  };

  const handleEdit = (news) => {
    setEditId(news._id);
    setTitle(news.title);
    setDescription(news.description);
    setImage(news.image);
    setCategory(news.category);
    setIsEditing(true);
  };

  const handleUpdateNews = async () => {
    try {
      await API.put(`/news/${editId}`, {
        title,
        description,
        image,
        category,
      });
      resetForm();
      loadMyNews();
    } catch (error) {
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/news/${id}`);
      loadMyNews();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setIsEditing(false);
    setTitle("");
    setDescription("");
    setImage("");
    setCategory("");
  };

  if (!user) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 text-sm">
              Manage your news articles
            </p>
          </div>
          {/* <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button> */}
        </div>

        {/* Create / Update News */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {isEditing ? "Update News" : "Create News"}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Title"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* <input
              placeholder="Category"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}

            <input
              placeholder="Image URL"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}

              



            />

            {image && (
  <div className="mt-4 flex justify-center">
    <img
      src={image}
      alt="Preview"
      className="h-40 w-full object-cover rounded-xl shadow-md"
      onError={(e) => (e.target.style.display = "none")}
    />
  </div>
)}

            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            onClick={isEditing ? handleUpdateNews : handleCreateNews}
            className={`mt-6 px-6 py-2 rounded-lg text-white transition ${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Update News" : "Create News"}
          </button>
        </div>

        {/* My News List */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          My News
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
         {myNews.map((news) => (
  <div
    key={news._id}
    className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white"
  >
    {/* News Image */}
    {news.image && (
      <img
        src={news.image}
        alt={news.title}
        className="h-40 w-full object-cover"
        onError={(e) => (e.target.style.display = "none")}
      />
    )}

    <div className="p-5">
      <h4 className="text-lg font-bold text-gray-800 mb-2">
        {news.title}
      </h4>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {news.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleEdit(news)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(news._id)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;