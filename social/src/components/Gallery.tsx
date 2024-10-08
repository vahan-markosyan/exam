import { IPost } from "../helpers/types";
import { BASE } from "../helpers/default";
import { handlePostReaction } from "../helpers/api";
import { Preview } from "./Preview";
import { useState } from "react";

interface Props {
  posts: IPost[];
  onUpdate?: (id: number) => void;
}

export function Gallery({ posts, onUpdate }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);

  const handleReaction = (id: number) => {
    handlePostReaction(id).then(() => {
      if (onUpdate) {
        onUpdate(id);
      }
    });
  };

  return (
    <div className="list">
      {posts.map((post) => (
        <div key={post.id}>
          <div className="post">
            <img src={BASE + post.picture} alt={post.title} />
            <div className="cover-post"></div>
            <img
              onClick={() => handleReaction(post.id)}
              src={
                !post.isLiked
                  ? "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png"
                  : "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
              }
              alt="Like button"
              className="like-button"
            />
          </div>
          <p>
            {post.title}{" "}
            <small
              onClick={() => {
                setOpen(true);
                setCurrentPost(post);
              }}
              title={post.likes.map((e) => e.name).join(", ")}
            >
              ({post.likes.length} likes)
            </small>
          </p>
        </div>
      ))}
      {currentPost && (
        <Preview
          post={currentPost}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    
    </div>
    
  );
}
