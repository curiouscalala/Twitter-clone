import { Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";

export default function ProfilePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    // Check if current user is logged in
    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    );
}