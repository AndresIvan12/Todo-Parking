import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Link from 'next/link';






export function LoginForm() {


 
  //UseRouter lo usamos para diferenciar si el formulario se necesita para crear un nuevo anuncio o para actualizar uno existente
  const router = useRouter();


  const[error, setError] = useState(false)

 
  //UseState establece valores por defecto y crea la funcion para cambiar los valores de acuerdo a los inputs del formulario

  const[usuario, setUsuario] = useState({
    correo: "",
    password: "",
  })

  const[correo, setCorreo] = useState('');
  const[password, setPassword] = useState('');

  //Controlador de cambios en los inputs del anuncio
  const handleChangeUsuario = ({target: {name, value}}) => {
    setUsuario({...usuario, [name]: value})

  }

 
  
  //Funcion para hacer un post o un update
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
    
      const resVerificacion = await axios.post('/api/auth/login', usuario);

      

      if(resVerificacion.status === 200){
        router.push('/users/anuncios');
      }
    }catch{
      setError(true);
      setUsuario({
        correo: "",
        password: "",
      })
    }
  }

  const handleGetUser = async (e) => {

    const resVerificacionToken = await axios.post('/api/usuarios/tokenSession');

    
  }

  
  
  

  
  
  return (
      // Formulario para crear un anuncio
      <div>

      {error === true ?
        <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Usuario o contraseña incorrectos.</span>
        </div>
      </div>
      :
      <div></div>
      }

      <form onSubmit={handleSubmit} className=''>
        <div className="min-h-screen  flex justify-center items-center">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 border">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Iniciar sesión</h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Correo electrónico y contraseña</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input type="text" name='correo' onChange={ handleChangeUsuario } value={usuario.correo} autoComplete="off" placeholder="Correo electronico" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            <input type="password" name='password' onChange={ handleChangeUsuario } value={usuario.password} autoComplete="off" placeholder="Contraseña" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-sky-600 rounded-2xl">Iniciar Sesión</button>
            <p className="mt-4 text-sm">¿No te has registrado? 
              <Link href="/users/registro">
                <span className="pl-3 underline  cursor-pointer">Registrarse</span>
              </Link>
            
            </p>
          </div>
        </div>
      </div>

        
      
      </form>  
      </div>

      
      
  )
}