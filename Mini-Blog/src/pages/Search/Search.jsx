//import styles from 'Search.module.css';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

//components
import PostDetail from '../../components/PostDetail';


import { Link } from 'react-router-dom';


const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts")

  return (
    <div>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <>
                    <p>Não foram encontrados posts da sua busca...</p>
                    <Link to="/" className='btn btn-dark'>
                        Voltar
                    </Link>
                </>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post} />
            ))}
        </div>
    </div>
  );
};

export default Search;