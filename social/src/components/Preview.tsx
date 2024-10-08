import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IComment, IPost } from "../helpers/types";
import { BASE } from "../helpers/default";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleAddComment } from "../helpers/api";
import { Gallery } from "./Gallery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  post: IPost;
  onClose: () => void;
}

export function Preview({ open, onClose, post }: IProps) {

  const [comment, setComment] = useState<IComment | null>(null)
  const [text, setText] = useState<string>("")

  const addComment = (id: number, text: string) => {
    if (id && text && text.trim()) {
      handleAddComment(id, { text })
        .then(response => {
          console.log(response)
          post.comments.push(response.payload as IComment)
          setText("")
        })
        .catch(error => {
          console.error("Error adding comment:", error)
        })
    }
  }



  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post.title}
        </Typography>
        <div className="contentStyle">
          <img
            src={BASE + post.picture}
            alt={post.title}
            style={{width:300, height:400, objectFit:'cover'}}
          />
          <div style={{ width:400}}>
            <Typography variant="subtitle1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong style={{ marginRight: "8px" }}>
                  {post.likes.length} likes
                </strong>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ marginRight: "8px" }}>likes:</p>
              </div>
            </Typography>
            {post.likes.length > 0 ? (
              <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
                {post.likes.map((user, index) => (
                  <li key={index} className="likeItemStyle">
                    <img
                      src={BASE + user.picture}
                      alt={`${user.name} ${user.surname}`}
                      className="profilePicStyle"
                    />
                    <Link to={`/profile/${user.id}`}>
                      {user.name} {user.surname}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No likes yet</Typography>
            )}
            <div className="commentsStyle">
              <Typography variant="subtitle1">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginRight: "8px" }}>comments:</p>
                </div>
              </Typography>
            </div>
            
             
              <input

                placeholder="What you think?"
                style={{ padding: "8px", width: "100%" }}
                value={text}
                onChange={e => setText(e.target.value)}
              />

              <button onClick={() =>addComment(post.id, text)}>Add</button>

              {post.comments && post.comments.length > 0 ? (
              <ul style={{ padding: 0, margin: 0}}>
                {post.comments.map((com) => (
                  <li key={com.id}>
                    <p>{com.content}</p>
                  </li>
                ))}
              </ul>
               ) : (
              <p>No comments yet</p>
              )}
              
            
          </div>
        </div>
      </Box>
    </Modal>
  );
}
