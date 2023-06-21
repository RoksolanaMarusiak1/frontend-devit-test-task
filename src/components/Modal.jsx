import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { formatDate, generateRandomId } from "../helpers/postHelper";
import $api from "../http";

function Modal({ setIsOpen, post, setPostChanged, title, buttonTitle }) {
  const [editedPost, setEditedPost] = useState(post || {});

  function editPost(updPost) {
    if (
      updPost.creator &&
      updPost.title &&
      updPost.content &&
      updPost.categories
    ) {
      $api.put(`/posts/${post.id}`, { post: updPost }).then((response) => {
        setPostChanged("Post edited successfully");
        setIsOpen(false);
      });
    }
  }

  function createPost(newPost) {
    if (
      newPost.creator &&
      newPost.title &&
      newPost.content &&
      newPost.categories
    ) {
      newPost.pub_date = formatDate(new Date());
      newPost.content_snippet = newPost.content;
      newPost.link =
        "https://lifehacker.com/5-clever-ways-to-use-a-bar-of-soap-in-your-garden-1850546173";
      newPost.id = parseInt(generateRandomId());
      $api.post(`/posts`, { post: newPost }).then((response) => {
        setPostChanged("Post created successfully");
        setIsOpen(false);
      });
    }
  }
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <div className={styles.modalField}>
              <p>Author*: </p>
              <input
                onChange={(event) => {
                  event.preventDefault();
                  setEditedPost({ ...editedPost, creator: event.target.value });
                }}
                value={editedPost.creator || ""}
              />
            </div>
            <div className={styles.modalField}>
              <p>Title*: </p>
              <input
                onChange={(event) => {
                  event.preventDefault();
                  setEditedPost({ ...editedPost, title: event.target.value });
                }}
                value={editedPost.title || ""}
              />
            </div>
            <div className={styles.modalField}>
              <p>Content*: </p>
              <textarea
                onChange={(event) => {
                  event.preventDefault();
                  setEditedPost({ ...editedPost, content: event.target.value });
                }}
                value={editedPost.content || ""}
              />
            </div>
            <div className={styles.modalField}>
              <p>Categories*: </p>
              <textarea
                onChange={(event) => {
                  event.preventDefault();
                  setEditedPost({
                    ...editedPost,
                    categories: event.target.value,
                  });
                }}
                value={editedPost.categories || ""}
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={(event) => {
                  event.preventDefault();
                  post ? editPost(editedPost) : createPost(editedPost);
                }}
              >
                {buttonTitle}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
