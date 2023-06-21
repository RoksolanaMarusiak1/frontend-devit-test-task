import { useState } from "react";
import styles from "./Post.module.css";
import {
  getImgSrcFromContent,
  getLinkFromContent,
} from "../helpers/postHelper";
import $api from "../http";
import { CgProfile, CgTime } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import EditModal from "./Modal";

function Post({ post, setPostChanged }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  };

  function deletePost(postId) {
    $api.delete(`/posts/${postId}`).then((response) => {
      setPostChanged("Post deleted successfully");
    });
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={(event) => {
        event.preventDefault();
        setShowMenu(true);
      }}
      onMouseLeave={(event) => {
        event.preventDefault();
        setShowMenu(false);
      }}
    >
      {isOpen && (
        <EditModal
          setIsOpen={setIsOpen}
          setPostChanged={setPostChanged}
          post={post}
          title={"Edit post"}
          buttonTitle={"Edit"}
        />
      )}
      <div className={styles.postContainer}>
        <img
          height={300}
          width={700}
          alt="post"
          src={
            getImgSrcFromContent(post.content) ||
            "https://cdn.nerdschalk.com/wp-content/uploads/2020/07/instagram-no-posts-yet.png"
          }
        />
        <div className={styles.postBody}>
          <h2>{post.title} </h2>
          <p>{post.content_snippet.replace("Read more...", "")}</p>
          <div className={styles.categories}>
            {post?.categories?.split(",").map((el) => (
              <div className={styles.categoryItem}>{el}</div>
            ))}
          </div>
          <hr
            style={{
              borderBlockColor: "#f5f5f5",
              color: "#f5f5f5",
              width: "100%",
            }}
          />
          <div className={styles.postData}>
            <div className={styles.profile}>
              <CgProfile className={styles.profileIcon} />
              <p>{post.creator}</p>
            </div>
            <div className={styles.time}>
              <CgTime className={styles.timeIcon} />
              <p>
                {new Intl.DateTimeFormat("en-US", dateOptions).format(
                  new Date(post.pub_date)
                )}
              </p>
            </div>
            <div>
              <a href={getLinkFromContent(post.content)} target="_blank">
                <button className={styles.readMoreButton}>Read more</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <div className={styles.edit}>
            <BiEdit
              onClick={(event) => {
                event.preventDefault();
                setIsOpen(true);
              }}
              className={styles.editIcon}
            />
          </div>
          <div className={styles.delete}>
            <MdDeleteOutline
              onClick={(event) => {
                event.preventDefault();
                deletePost(post.id);
              }}
              className={styles.deleteIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
