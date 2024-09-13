import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.prevenDefault();
  }

  return (
    <div>
        <h1>Criar post</h1>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form>
          <label>
            <span>Título:</span>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="Pense num bom título..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          
          <label>
            <span>URL da imagem:</span>
            <input 
              type="text" 
              name="image" 
              required 
              placeholder="Insira uma image que representa o seu post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>

          <label>
            <span>Conteúdo:</span>
            <textarea name="" required placeholder=""></textarea>
          </label>
        </form>
    </div>
  )
}

export default CreatePost