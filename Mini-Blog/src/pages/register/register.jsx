import styles from './register.module.css';

import { useState, useEffect } from 'react';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [passsword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      passsword,
    }

    if(passsword !== confirmPassword){
      setError("As senhas precisam ser iguais!")
    }

    console.log(user)
  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          {/* nome do usuário */} 
          <input 
            type="text" 
            name='displayName' 
            required 
            placeholder='Nome do usuário'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        {/* email do usuário */}
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            name='email' 
            required 
            placeholder='Email do usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* senha do usuário */}
        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name='passsword' 
            required 
            placeholder='Insira sua senha'
            value={passsword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* confirmação da senha */}
        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password" 
            name='confirmPassword' 
            required 
            placeholder='Confirme a sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className='btn'>Cadastrar</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register