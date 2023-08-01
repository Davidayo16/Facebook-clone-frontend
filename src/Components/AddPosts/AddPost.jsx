import React from "react";
import "./Addpost.css";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading/Error/Loading";
import moment from "moment";
import {
  FaCog,
  FaFacebookMessenger,
  FaHackerrank,
  FaLightbulb,
  FaMoon,
  FaResearchgate,
  FaScrewdriver,
  FaSun,
  FaTimes,
} from "react-icons/fa";
import { NOT_ACTIVE } from "../../Redux/Constants/CommentConstant";
import {
  createPostReview,
  getOnePost,
  getPosts,
  getUserPost,
  likeAndUnlikePost,
} from "../../Redux/Action/PostAction";
import { POST_CREATE_REVIEW_RESET } from "../../Redux/Constants/PostConstants";
import { POST_NOT_ACTIVE } from "../../Redux/Constants/AddPostConstant";
import axios from "axios";
const AddPost = ({ post }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const closePost = () => {
    dispatch({ type: POST_NOT_ACTIVE });
  };
  const setPost = useSelector((state) => state.setPost);
  const { isPostActive } = setPost;
  const [file, setFile] = React.useState(null);
  const [text, setText] = React.useState("");
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [previewURL, setPreviewURL] = React.useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    }
  };
  const closeImg = () => {
    setPreviewURL("");
    setFile(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setUploadStatus(true);

      let imageURL = ""; // Initialize the imageURL variable

      if (file) {
        // Only upload the image if 'file' is not null
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "uvttt2is"); // Set this to your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dycwd2827/upload",
          formData
        );

        imageURL = response.data.secure_url;
      }

      const newPost = {
        userId: userInfo?._id,
        desc: text,
        imageURL: imageURL ? imageURL : "",
      };

      createNewPost(newPost);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploadStatus("Upload Failed");
    }
  };

  const createNewPost = (newPost) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .post("/api/post", newPost, config)
      .then((response) => {
        console.log("Post created successfully:", response.data);
        setUploadStatus(false);
        dispatch(getPosts());
        dispatch(getUserPost(userInfo?._id));
        setText("");
        setPreviewURL("");
        setFile(null);
        dispatch({ type: POST_NOT_ACTIVE });
      })
      .catch((error) => {
        console.error("Error creating post: ", error);
        setUploadStatus(false);
      });
  };

  return (
    <>
      <div
        className={isPostActive ? `add-post-wrapper showw` : `add-post-wrapper`}
      >
        <div className="add-post-main">
          <div className="add-post-header ">
            <div className="d-flex justify-content-center align-items-center p-3 add-post-header-1">
              <h4>Create post</h4>
              <button className="btn mb-0" onClick={closePost}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
            <div className="p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-3">
                  <img
                    src={
                      userInfo?.profilePicture
                        ? userInfo?.profilePicture
                        : "/images/ava.png"
                    }
                    className="img-fluid comment-img"
                  />
                  <div>
                    <h4>{userInfo?.name}</h4>
                    {/* <span>{moment(post?.createdAt).fromNow()} .</span> */}
                    <button disabled className="post-dis">
                      Public
                    </button>
                    {}
                  </div>
                </div>
                <MoreVertRoundedIcon
                  style={{
                    fontSize: "2rem",
                    color: "var(--color-dark-text)",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  className="dot-icon"
                />
              </div>
            </div>
          </div>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="p-3">
              <div className="input-cont">
                <textarea
                  type="text"
                  className="w-100 p-3 add-post-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Whats on your mind, ${userInfo?.name}?`}
                />
              </div>
              {previewURL && (
                <div className="w-100 d-flex justify-content-center align-items-center add-post-img-cont p-2">
                  <div className="add-post-img-cont-2">
                    <img src={previewURL} alt="Preview" className="img-fluid" />
                    <button
                      className="btn cancel-add-img mb-0"
                      onClick={closeImg}
                    >
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="add-post-footer">
              <div className="d-flex justify-content-between align-items-center p-3  add-post-sect mb-2">
                <h6 className="mb-0">Add to your Post</h6>
                <label htmlFor="file">
                  <CollectionsIcon
                    style={{
                      fontSize: "2rem",
                      color: "green",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    className="dot-icon"
                  />
                </label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
              </div>
              <button
                className="w-100 add-post-btn d-flex justify-content-center align-items-center"
                type="submit"
                disabled={(text == "" && file === null) || uploadStatus}
              >
                {uploadStatus ? "Uploading" : "Post"}
                {uploadStatus && <Loading />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
