import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import ProfileEdit from "../pages/ProfileEdit";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function ProfileMidBody() {
    const url = "https://pbs.twimg.com/profile_banners/527038577/1410835911/1500x500";
    const pic = "https://pbs.twimg.com/profile_images/1524773861606432768/Hd8Gm6rq_400x400.jpg";

    const dispatch = useDispatch()
    const posts = useSelector(store => store.posts.posts);
    const loading = useSelector(store => store.posts.loading);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        dispatch(fetchPostsByUser(currentUser.uid));
    }, [dispatch, currentUser]);

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary" onClick={ProfileEdit}>
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Sarah
            </p>

            <p style={{ marginBottom: "2px" }}>@sarah.dahner</p>

            <p>I am going crazy trying to learn this thing.</p>

            <p>Unemployed student</p>

            <p>
                <strong> 10 </strong> Following <strong> 259M </strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (
                <Spinner
                    animation="border"
                    className="ms-3"
                    variant="primary"
                />
            )}
            {posts.length > 0 && posts.map((post) => (
                <ProfilePostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </Col>
    );
}