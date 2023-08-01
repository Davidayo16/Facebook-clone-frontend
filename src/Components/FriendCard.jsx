import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followUsers } from "../Redux/Action/UserAction";
import Skeleton from "react-loading-skeleton";

const FriendCard = ({ user }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = React.useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  React.useEffect(() => {
    setIsFollowing(user?.followers.includes(userInfo._id));
  }, [user?.followers, user?.following, user]);

  const handleFollow = (id) => {
    setIsFollowing((isFollowing) => !isFollowing);
    dispatch(followUsers(id));
  };

  const userFollow = useSelector((state) => state.userFollow);
  const { userr, loading } = userFollow;

  return (
    <div className="col-lg-3 col-md-4 col-sm-4 mt-2 mb-2">
      <div className="friend-card">
        <div className="friend-card-img-cont">
          {loading ? (
            <Skeleton className="img-fluid card-img" />
          ) : (
            <img
              src={
                user?.profilePicture ? user?.profilePicture : "/images/ava.png"
              }
              className="img-fluid card-img"
            />
          )}
        </div>
        <div className="friend-card-bottom">
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <h6 style={{ color: "var(--color-dark-text)" }}>{user?.name}</h6>
          )}
          {loading ? (
            <Skeleton width={300} height={30} />
          ) : (
            <button
              className={
                isFollowing
                  ? "add-friend-btn following"
                  : "add-friend-btn unfollowing"
              }
              onClick={() => handleFollow(user?._id)}
            >
              {`${isFollowing ? "Unfollow" : "Follow"}`}
            </button>
          )}
          {loading ? (
            <Skeleton width={300} height={30} />
          ) : (
            <Link to={`/friend/${user?._id}`}>
              <button className="view-profile">View Profile</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
