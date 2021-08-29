import useSWR from "swr";
import ArticleCard from "./Cards/Card";

const API = 'http://localhost:3000/api/ideas/getIdeas';
export default function CardContainer() {
    const { ideas, error } = useSWR(API)
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {ideas.data.map(({ title, id, body, comments, likes }) => (
          <ArticleCard
          key={id}
            title={title}
            body={body}
            comments={comments}
            likes={likes}
          />
      ))}
    </ul>
  );
}
