/*
TODO (Header.jsx):
Create the entire Header component.

Requirements:
- Show the site title and a one-sentence description.
- Show summary numbers: totalPosts, totalLikes, totalDislikes.
*/

export default function Header({ totalPosts, totalLikes, totalDislikes }) {
  // TODO: Replace return null with your JSX
  return (
  <div>
    <h1>GridBlog</h1>
    <p>Total Posts: {totalPosts}</p>
    <p>Total Likes: {totalLikes}</p>
    <p>Total Dislikes: {totalDislikes}</p>
  </div>
  );
}
