import { useEffect, useState } from "react";
import $api from "../http";
import Post from "../components/Post";
import styles from "./Posts.module.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import CreatePostModal from "../components/Modal";

const defaultQueryParams = {
  currentPage: 1,
  itemsPerPage: 10,
  selectedSortField: "default",
  selectedOrder: "asc",
  searchBy: "default",
  searchInput: "",
};
function Posts() {
  const [posts, setPosts] = useState(null);
  const [queryParams, setQueryParams] = useState(defaultQueryParams);
  const [postChanged, setPostChanged] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    $api
      .get(
        `/posts?page=${queryParams.currentPage}&limit=${
          queryParams.itemsPerPage
        }${
          queryParams.selectedSortField !== "default" &&
          queryParams.selectedOrder
            ? `&sortBy=${queryParams.selectedSortField}&sortOrder=${queryParams.selectedOrder}`
            : ""
        }${
          queryParams.searchBy !== "default" && queryParams.searchInput
            ? `&searchField=${queryParams.searchBy}&search=${queryParams.searchInput}`
            : ""
        }`
      )
      .then((response) => {
        setPosts(response?.data);
        setPostChanged("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [queryParams, postChanged]);

  return (
    <div className={styles.postsContainer}>
      {isOpen && (
        <CreatePostModal
          setIsOpen={setIsOpen}
          setPostChanged={setPostChanged}
          title={"Create post"}
          buttonTitle={"Create"}
        />
      )}
      <div className={styles.filters}>
        <button
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
          className={styles.createPostButton}
        >
          Create new post
        </button>
        <div className={styles.filter}>
          <p>Sort posts by:</p>
          <select
            value={queryParams.selectedSortField}
            onChange={(e) =>
              setQueryParams({
                ...queryParams,
                selectedSortField: e.target.value,
              })
            }
          >
            <option value="default">Default...</option>
            <option value="title">Title</option>
            <option value="creator">Author</option>
            <option value="pub_date">Date</option>
          </select>
        </div>
        <div className={styles.filter}>
          <p>Sort order: </p>

          <select
            disabled={queryParams.selectedSortField === "default"}
            value={queryParams.selectedOrder}
            onChange={(e) =>
              setQueryParams({ ...queryParams, selectedOrder: e.target.value })
            }
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
        <div className={styles.filter}>
          <p>Search by:</p>
          <select
            value={queryParams.searchBy}
            onChange={(e) =>
              setQueryParams({ ...queryParams, searchBy: e.target.value })
            }
          >
            <option value="default">...</option>
            <option value="title">Title</option>
            <option value="creator">Author</option>
            <option value="pub_date">Date</option>
            <option value="content">Content</option>
          </select>
        </div>
        <div className={styles.filter}>
          <p> Search input: </p>

          <input
            value={queryParams.searchInput}
            disabled={queryParams.searchBy === "default"}
            onChange={(e) =>
              setQueryParams({ ...queryParams, searchInput: e.target.value })
            }
          />
        </div>
        <div className={styles.filter}>
          <p>Items per page:</p>
          <select
            value={queryParams.itemsPerPage}
            onChange={(e) =>
              setQueryParams({ ...queryParams, itemsPerPage: e.target.value })
            }
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={(event) => {
            event.preventDefault();
            setQueryParams({...queryParams, currentPage:queryParams.currentPage - 1});
          }}
          disabled={queryParams.currentPage === 1}
          className={styles.paginationButton}
        >
          <BsFillArrowLeftCircleFill className={styles.paginationIcon} />
        </button>
        {queryParams.currentPage}
        <button
          onClick={(event) => {
            event.preventDefault();
            setQueryParams({...queryParams, currentPage: queryParams.currentPage + 1});
          }}
          disabled={posts?.length < queryParams.itemsPerPage}
          className={styles.paginationButton}
        >
          <BsFillArrowRightCircleFill className={styles.paginationIcon} />
        </button>
      </div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} setPostChanged={setPostChanged} />
      ))}
    </div>
  );
}

export default Posts;
