import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonComments = () => {
  return (
    <>
      <div className="home-body mt-4 mb-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <Skeleton
              circle={true}
              height={40}
              width={40}
              className="img-fluid sidebar-left-img"
            />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={80} />
          </div>
          <Skeleton
            circle={true}
            height={30}
            width={30}
            style={{
              fontSize: "2rem",
              color: "black",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            className="dot-icon"
          />
        </div>
        <Skeleton height={20} width={200} className="mb-0 mt-3" />
        <Skeleton height={300} className="img-fluid w-100 mt-3 imm" />
        <div className="d-flex justify-content-between home-post-strip">
          <div className="d-flex gap-2 align-items-center">
            <div>
              <Skeleton
                circle={true}
                height={25}
                width={25}
                style={{
                  fontSize: "1.4rem",
                  color: "white",
                  borderRadius: "50%",
                  background: "blue",
                  padding: "3px",
                }}
              />
              <Skeleton
                circle={true}
                height={25}
                width={25}
                style={{
                  fontSize: "1.4rem",
                  color: "white",
                  borderRadius: "50%",
                  background: "red",
                  padding: "3px",
                }}
              />
            </div>
            <Skeleton height={20} width={100} />
          </div>
          <Skeleton
            height={20}
            width={120}
            onClick={() => {}}
            className="view-comments"
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2 px-5">
          <div className="d-flex align-items-center  home-post-lcs">
            <Skeleton
              circle={true}
              height={30}
              width={30}
              style={{
                fontSize: "2rem",
                color: "black",
                borderRadius: "50%",
                padding: "3px",
              }}
            />
            <Skeleton height={20} width={50} />
          </div>
          <div className="d-flex align-items-center  home-post-lcs">
            <Skeleton
              circle={true}
              height={30}
              width={30}
              style={{
                fontSize: "2rem",
                color: "black",
                borderRadius: "50%",
                padding: "3px",
              }}
            />
            <Skeleton height={20} width={70} />
          </div>
        </div>
        <form
          className="comment-footerr mt-2 mb-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="d-flex gap-3">
            <Skeleton
              circle={true}
              height={30}
              width={30}
              className="img-fluid comment-img"
            />

            <div className="comment-input-cont">
              <Skeleton height={30} width={200} />
              <Skeleton
                height={40}
                width={40}
                style={{ cursor: "pointer" }}
                className="send-comment-btn"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SkeletonComments;
