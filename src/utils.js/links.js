import { BsCardHeading } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImDrawer2 } from "react-icons/im";
import { ImFolderOpen } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "Feed",
    path: "/",
    icon: <BsCardHeading />,
  },
  {
    id: 2,
    text: "Profile",
    path: "/profile",
    icon: <BsFillPersonLinesFill />,
  },
  {
    id: 3,
    text: "Create a Post",
    path: "/createPost",
    icon: <ImDrawer2 />,
  },
  {
    id: 4,
    text: "My Posts",
    path: "/myPosts",
    icon: <ImFolderOpen />,
  },
];

export default links;
