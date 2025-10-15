import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");
        if (!token) {
            setMessage("Not authorized. Please log in.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("bio", bio);
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }

            await axios.put(
                "postgresql://neondb_owner:npg_M5DmGXSCqI4s@ep-tiny-frost-a15o6geb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMessage("Profile updated successfully");
            navigate('/profile');
        } catch (error) {
            console.error(error);
            setMessage("Error updating prodile");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Bio</label>
                    <textarea
                        className="form-control"
                        value={bio}
                        onChange={(e) => setBio(e.target.valeu)}
                    />
                </div>

                <div className="mb-3">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Save Changes
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    )
}