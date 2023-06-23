import { useParams } from "react-router-dom";

const BlogEntry = () => {
  const { id } = useParams();

  return <div>Blog Entry {id}</div>;
};

export default BlogEntry;
