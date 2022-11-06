import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Post } from "../components";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Dashboard = () => {
  const { getAllPosts, allPosts, noMorePosts } = useAppContext();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getAllPosts(skip);
  }, [skip]);
  function fetchMorePosts() {
    setSkip(allPosts.length);
  }
  if (allPosts.length === 0) {
    return (
      <Wrapper>
        <p>loading...</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <InfiniteScroll
          dataLength={allPosts.length}
          next={() => {
            fetchMorePosts();
          }}
          hasMore={true}
          loader={<h4 className="loading">{noMorePosts ? "" : "..."}</h4>}
          endMessage={<p>Yay! You have seen it all</p>}
        >
          {allPosts.map((post) => {
            return (
              <Post
                key={post._id}
                title={post.title}
                content={post.content}
                creator={post.posterName}
                mood={post.mood}
                id={post._id}
                creatorId={post.createdBy}
                imageUrl={post.imageUrl}
                likes={post.likes}
                alreadyLiked={post.alreadyLiked}
                comments={post.comments}
              />
            );
          })}
        </InfiniteScroll>
      </div>
      <h2>
        {noMorePosts ? (
          <div className="done">
            <IoIosCheckmarkCircleOutline /> up to date
          </div>
        ) : (
          ""
        )}{" "}
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-x: hidden;
  @media screen and (min-width: 495px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .loading {
    text-align: center;
    font-size: 1.5rem;
  }
  p {
    text-align: center;
  }
  h2 {
    text-align: center;
    color: #7f2122;
    font-size: 1rem;
    font-style: italic;
  }
  .done {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
  }
`;
export default Dashboard;
