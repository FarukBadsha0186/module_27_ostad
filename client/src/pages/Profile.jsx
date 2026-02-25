import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";




function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");


  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  API.get("/auth/profile")
    .then(res => {
      setName(res.data.name);
      setEmail(res.data.email);
    });
}, []);

  if (!user) return <p className="p-6">Loading...</p>;

  

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-10 rounded">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
    </div>
  );
}

export default Profile;