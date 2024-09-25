import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const RenderList = () => {
  const [list, setList] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Post[]>(
          'https://jsonplaceholder.typicode.com/posts'
        );
        console.log('Fetched data:', res.data); // Log the fetched data
        setList(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch posts');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>List</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RenderList;
