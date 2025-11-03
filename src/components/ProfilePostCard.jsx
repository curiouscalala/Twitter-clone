import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import axios from "axios";

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await axios.get(
                    `https://e0dc5cb0-de85-4b0b-a831-1d38b0384bcf-00-1vz07zgn5c1sd.pike.replit.dev/likes/post/${postId}`
                );
                setLikes(res.data.length);

                if (token) {
                    const decoded = JSON.parse(atob(token.split(".")[1]));
                    const userId = decoded.id;
                    const hasLiked = res.data.some((like) => like.user_id === userId);
                    setLiked(hasLiked);
                }
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };
        fetchLikes();
    }, [postId, token]);

    const handleLike = async () => {
        setLiked(true);
        setLikes(likes + 1);

        try {
            await axios.post(
                'https://e0dc5cb0-de85-4b0b-a831-1d38b0384bcf-00-1vz07zgn5c1sd.pike.replit.dev/likes',
                { post_id: postId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (error) {
            console.error('Error liking post: ', error);
            setLiked(false);
            setLikes(likes - 1);
        }
    };

    const handleUnlike = async () => {
        setLiked(false);
        setLikes(likes - 1);

        try {
            await axios.delete(`https://e0dc5cb0-de85-4b0b-a831-1d38b0384bcf-00-1vz07zgn5c1sd.pike.replit.dev/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                });
        } catch (error) {
            console.error('Error unliking post:', error);
            setLiked(true);
            setLikes(likes + 1);
        }
    };

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Sarah</strong>
                <span> @sarah.dahner · Apr 16</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button
                        variant="light"
                        onClick={liked ? handleUnlike : handleLike}
                        style={{ color: liked ? "red" : "black" }}
                    >
                        <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}>
                            {" "}
                            {likes}
                        </i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

