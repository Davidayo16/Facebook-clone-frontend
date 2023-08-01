import Skeleton from "react-loading-skeleton";

import React from "react";

const SkeletonOnlineFriends = () => {
  return (
    <div className="d-flex align-items-center gap-3 mt-4">
      <div className="online-doYt-container">
        <Skeleton
          circle={true}
          height={40}
          width={40}
          className="img-fluid profile-friends-img"
        />
      </div>
      <Skeleton height={20} width={100} />
    </div>
  );
};

export default SkeletonOnlineFriends;
