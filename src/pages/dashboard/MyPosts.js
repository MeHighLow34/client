import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Post } from "../../components";
import styled from "styled-components";

const MyPosts = () => {
  const { getMyPosts, posts, totalPosts, isLoading } = useAppContext();
  useEffect(() => {
    getMyPosts();
  }, []);

  if (isLoading) {
    return <p> loading motherfucker</p>;
  }
  if (posts.length === 0 && isLoading == false) {
    return (
      <Wrapper>
        <h2>You haven't posted anything</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            mood={post.mood}
            creator={post.posterName}
            imageUrl={post.imageUrl}
            isMine={true}
            comments={post.comments}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default MyPosts;
