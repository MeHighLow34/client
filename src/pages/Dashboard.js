import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Post } from "../components";
import styled from "styled-components";

const Dashboard = () => {
  const { getAllPosts, allPosts } = useAppContext();
  useEffect(() => {
    getAllPosts();
  }, []);

  if (allPosts.length === 0) {
    return <Wrapper>No Posts Have Ever Been Posted...</Wrapper>;
  }
  return (
    <Wrapper>
      {allPosts.map((post) => {
        return (
          <Post
            key={post._id}
            title={post.title}
            content={post.content}
            creator={post.posterName}
            mood={post.mood}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-x: hidden;
`;
export default Dashboard;
