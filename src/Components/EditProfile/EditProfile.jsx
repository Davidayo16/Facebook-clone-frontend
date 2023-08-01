import React from "react";
import { useState } from "react";
import "./editprofile.css";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import {
  getOnePost,
  getPosts,
  getUserPost,
} from "../../Redux/Action/PostAction";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DetailsIcon from "@mui/icons-material/Details";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  getUserDetails,
  login,
  updateUser,
} from "../../Redux/Action/UserAction";
import Loading from "../Loading/Error/Loading";

const EditProfile = ({ isProfileActive, setProfileActive, id, user }) => {
  const dispatch = useDispatch();

  const [country, setCountry] = React.useState(user?.user?.from);
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState(user?.user?.city);
  const [namee, setName] = React.useState(user?.user?.name);
  const [password, setPassword] = React.useState();
  const [description, setDescription] = React.useState(user?.user?.desc);
  const [relationship, setRelationship] = React.useState(
    user?.user?.relationship
  );

  const [fileAvatar, setFileAvatar] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [previewURLAvatar, setPreviewURLAvatar] = React.useState("");
  const [previewURLCover, setPreviewURLCover] = React.useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const modalRef = React.useRef(null);

  // Scroll to the top of the modal when it opens
  React.useEffect(() => {
    if (isProfileActive) {
      // Scroll to the top of the modal
      modalRef.current.scrollTo(0, 0);
    }
  }, [isProfileActive]);

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileAvatar(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURLAvatar(previewURL);
    }
  };

  const handleCoverChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileCover(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURLCover(previewURL);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setUploadStatus(true);
      let coverURL = "";
      let imageURL = ""; // Initialize the imageURL variable

      if (fileAvatar) {
        // Only upload the image if 'file' is not null
        const formData = new FormData();
        formData.append("file", fileAvatar);
        formData.append("upload_preset", "uvttt2is"); // Set this to your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dycwd2827/upload",
          formData
        );

        imageURL = response.data.secure_url;
      }

      if (fileCover) {
        // Only upload the image if 'file' is not null
        const formData = new FormData();
        formData.append("file", fileCover);
        formData.append("upload_preset", "uvttt2is"); // Set this to your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dycwd2827/upload",
          formData
        );

        coverURL = response.data.secure_url;
      }

      const newPost = {
        name: namee,
        password,
        desc: description,
        city: city,
        from: country,
        relationship,
        imageURL: imageURL ? imageURL : "",
        coverURL: coverURL ? coverURL : "",
      };

      createNewPost(newPost);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploadStatus("Upload Failed");
    }
  };

  const createNewPost = (newPost) => {
    dispatch(updateUser(newPost));
    setUploadStatus(false);
    dispatch(getPosts());
    dispatch(getUserPost(id));
    dispatch(getUserDetails(id));
    dispatch(getOnePost(id));
    setPreviewURLAvatar("");
    setPreviewURLCover("");
    setFileAvatar(null);
    setFileCover(null);
    setProfileActive(false);
    setCity("");
    setCountry("");
    setDescription("");
    setPassword("");
    setName("");
  };

  return (
    <div
      className={
        isProfileActive ? "show edit-profile-wrapper" : "edit-profile-wrapper"
      }
    >
      <div className="edit-profile-main" ref={modalRef}>
        <div className="edit-profile-header d-flex justify-content-center align-items-center p-3">
          <h4>Edit profile</h4>
          <button className="btn mb-0" onClick={() => setProfileActive(false)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <h4 className="hd1">Profile picture</h4>
              <input
                type="file"
                style={{ display: "none" }}
                id="image"
                accept=".png, .jpg, .jpeg"
                onChange={handleAvatarChange}
              />
              <label htmlFor="image" className="hd2 hd23">
                <AddAPhotoIcon />
              </label>
            </div>
            <div className="edit-image-cont d-flex justify-content-center align-items-center p-3">
              <img
                src={
                  previewURLAvatar
                    ? previewURLAvatar
                    : userInfo?.profilePicture
                    ? userInfo?.profilePicture
                    : "/images/ava.png"
                }
                className="img-fluid edit-imgg"
              />
            </div>
          </div>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <h4 className="hd1">Cover Photo</h4>
              <input
                type="file"
                style={{ display: "none" }}
                id="cover"
                accept=".png, .jpg, .jpeg"
                onChange={handleCoverChange}
              />
              <label htmlFor="cover" className="hd2 hd22">
                <AddAPhotoIcon />
              </label>
            </div>
            <div className="edit-image-cont d-flex justify-content-center align-items-center p-3">
              <img
                src={
                  previewURLCover
                    ? previewURLCover
                    : userInfo?.coverPicture
                    ? userInfo?.coverPicture
                    : "/images/cd.jpg"
                }
                className=" edit-cover-imgg"
              />
            </div>
          </div>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <h4 className="hd1">Personal details</h4>
              <h4 className="hd2 hd23">
                <AccountBoxIcon />
              </h4>
            </div>
            <div className="d-flex justify-content-center">
              <div className="w-75">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="name">
                    <b>Name</b>
                  </label>
                  <div className="mb-3 ed-in mt-3 w-100">
                    <input
                      id="name"
                      type="text"
                      class="form-input  w-100"
                      onChange={(e) => setName(e.target.value)}
                      required
                      value={namee}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="password">
                    <b>Password</b>
                  </label>
                  <div className="mb-3 ed-in mt-3 w-100">
                    <input
                      id="password"
                      type="password"
                      class="form-input  w-100"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      value={password}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="desc">
                    <b>Description</b>
                  </label>
                  <div className="mb-3 ed-in mt-3 w-100">
                    <input
                      id="desc"
                      type="text"
                      class="form-input w-100"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      value={description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="d-flex justify-content-between">
              <h4 className="hd1">Bio</h4>
              <h4 className="hd2 hd22">
                <DetailsIcon />
              </h4>
            </div>
            <div className="d-flex justify-content-center">
              <div className="w-75">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="country">
                    <b>Country</b>
                  </label>
                  <div class="mb-3 mt-3 w-100">
                    <select
                      id="country"
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      value={country}
                    >
                      <option selected>Select Country</option>
                      {Country.getAllCountries().map((country) => {
                        return (
                          <option value={country.isoCode}>
                            {country.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="state">
                    <b>State</b>
                  </label>
                  <div class="mb-3  w-100 mt-3">
                    <select
                      id="state"
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setState(e.target.value)}
                      required
                      value={state}
                    >
                      <option selected>Select State</option>
                      {State.getStatesOfCountry(country).map((state) => {
                        return (
                          <option value={state.isoCode}>{state.name}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="city">
                    <b>City</b>
                  </label>
                  <div class="mb-3  w-100 mt-3">
                    <select
                      id="city"
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    >
                      <option selected>Select City</option>
                      {City.getCitiesOfState(country, state).map((city) => {
                        return (
                          <option value={city.isoCode} required>
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label htmlFor="relationship">
                    <b>Relationship</b>
                  </label>
                  <div className="mb-3  w-100 mt-3">
                    <select
                      id="relationship"
                      class="form-select d-block w-100"
                      aria-label="Default select example"
                      onChange={(e) => setRelationship(e.target.value)}
                      value={relationship}
                    >
                      <option selected>Choose Relationship</option>

                      <option required>single</option>
                      <option required>Dating</option>
                      <option required>Married</option>
                    </select>
                  </div>
                </div>
                <button className="w-100 p-3 mb-3 mt-4 save-changes-btn d-flex justify-content-center align-items-center">
                  {uploadStatus ? "Saving changes" : "Save changes"}
                  {uploadStatus && <Loading />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
