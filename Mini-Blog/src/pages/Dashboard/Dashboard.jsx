import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom";

// hooks
import {useAuthValue} from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const {user} = useAuthValue();
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

  const deleteDocument = (id) => {}

  if (loading){
    return <p>Carregando...</p>;
  }

  return (
    <div>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        ) : (
          <div>
            <span>Título</span>
            <span>Ações</span>
          </div>
        )}

        {posts && posts.map((post) => <div key={post.div}>
          <p>{post.title}</p>
          <div>
            <Link to={`/post/${post.id}`} className="btn btn-outline">
              Ver
            </Link>
            <Link to={`/post/edit/${post.id}`} className="btn btn-ouline">
              Editar
            </Link>
            <button onClick={() => 
            deleteDocument(post.id)} 
            className="btn btn-outline">
              Excluir
            </button>
          </div>
        </div>)}
    
    </div>
  )
}

export default Dashboard