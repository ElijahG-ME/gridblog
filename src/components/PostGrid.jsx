import PostCard from "./PostCard.jsx";

export default function PostGrid({posts, onLike, onDislike }) {
  return (
    <div className="grid" id="posts">
      {posts.map((post) => (
        <PostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onDislike={onDislike}
        /> 
        
      ))}
    </div>
  );
}
