import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import validator from 'validator';





export function RegistroForm() {


 
  //UseRouter lo usamos para diferenciar si el formulario se necesita para crear un nuevo anuncio o para actualizar uno existente
  const router = useRouter();
 
  //UseState establece valores por defecto y crea la funcion para cambiar los valores de acuerdo a los inputs del formulario

  const[usuario, setUsuario] = useState({
    idUsuario: "",
    nombre: "",
    apellido: "",
    tipoUsuario: "",
    nroAnuncios: "",
    fechaNacimiento: "",
    direccion: "",
    correo: "",
    telefono: "",
    password: "",
  })


  //Controlador de cambios en los inputs del anuncio
  const handleChangeUsuario = ({target: {name, value}}) => {
    if(name === "nombre"){
      validateNombre(value)
    }

    if(name === "apellido"){
      validateApellido(value)
    }

    if(name === "direccion"){
      validateDireccion(value)
    }


    if(name === "correo"){
      validateEmail(value)
    }

    if(name === "telefono"){
      validateTelefono(value)
    }

    if(name === "password"){
      validatePassword(value)
    }

    setUsuario({...usuario, [name]: value})

  }

 
  
  //Funcion para hacer un post o un update
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if(router.query.id){
      console.log('update');

      

    }else{
      console.log('post');

      //console.log(usuario);

      const {data} = await axios.get('/api/usuarios/registro/' + usuario.correo);

      
      if(data){
        swal({
          title: "Este correo ya tiene una cuenta asociada",
          icon: "warning",
          button: "Ok",
        });
        

      }else{ 
        try{
          const resRegistroUsuario = await axios.post('/api/usuarios', usuario);
          const resVerificacion = await axios.post('/api/auth/login', usuario);


          console.log("usuario creado");
          router.push('/anuncios')
        }catch{
          swal({
            title: "No se ha podido crear la cuenta",
            icon: "error",
            button: "Ok",
          });
        }
      }

      

    }
    
  }


  const [nombreError, setNombreError] = useState('')
  const [apellidoError, setApellidoError] = useState('')
  const [direccionError, setDireccionError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [telefonoError, setTelefonoError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')



  const validateNombre = (value) => {
    var nombre = value
    
    if (validator.isLength(nombre, {min:2, max: 70})) {
      setNombreError('border-green-500')
      setError(false)
    } else {
      setNombreError('border-red-500')
      setMensajeError('Debe ingresar un nombre')
      setError(true)
    }
  }

  const validateApellido = (value) => {
    var apellido = value
    
    if (validator.isLength(apellido, {min:2, max: 70})) {
      setApellidoError('border-green-500')
      setError(false)
    } else {
      setApellidoError('border-red-500')
      setMensajeError('Debe ingresar un apellido')
      setError(true)
    }
  }

  const validateDireccion = (value) => {
    var direccion = value
    
    if (validator.isLength(direccion, {min:4, max: 70})) {
      setDireccionError('border-green-500')
      setError(false)
    } else {
      setDireccionError('border-red-500')
      setMensajeError('Debe ingresar una dirección')
      setError(true)
    }
  }
  
  
  const validateEmail = (value) => {
    var email = value
  
    if (validator.isEmail(email)) {
      setEmailError('border-green-500')
      setError(false)
    } else {
      setEmailError('border-red-500')
      setMensajeError('Debe ingresar un correo válido')
      setError(true)
    }
  }
  
  const validateTelefono = (value) => {
    var telefono = value
  
    if (validator.isMobilePhone(telefono, ['es-CL'])) {
      setTelefonoError('border-green-500')
      setError(false)
    } else {
      setTelefonoError('border-red-500')
      setMensajeError('Telefono incorrecto, debe usar un numero celular chileno')
      setError(true)
    }
  }
  
  const validatePassword = (value) => {
    var password = value
    
    if (validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 1, minNumbers: 0, minSymbols: 0, returnScore: false})) {
      setPasswordError('border-green-500')
      setError(false)
    } else {
      setPasswordError('border-red-500')
      setMensajeError('Contraseña débil, debe contener al menos 8 caracteres y 1 mayúscula')
      setError(true)
    }
  }
  
  
  return (
      // Formulario para crear un anuncio

      <div>
        {error === true ?
        <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{mensajeError}</span>
        </div>
      </div>
      :
      <div></div>
      }

     
      <form onSubmit={handleSubmit} className=''>

        <div className="min-h-screen  flex justify-center items-center">

          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 border">
            <div>
              <h3 className="text-3xl font-bold text-center mb-4 cursor-pointer">Crear cuenta</h3>
              
            </div>

            <div className="space-y-4">

              <h1 className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Datos personales</h1>

              <input type="text" name='nombre' onChange={handleChangeUsuario} value={usuario.nombre} autoComplete="off" placeholder="Nombre" className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${nombreError}`} />

              <input type="text" name='apellido' onChange={handleChangeUsuario} value={usuario.apellido} autoComplete="off" placeholder="Apellido" className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${apellidoError}`} />

              <input type="text" name='direccion' onChange={handleChangeUsuario} value={usuario.direccion} autoComplete="off" placeholder="Dirección" className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${direccionError}`} />

              

              <input type="text" name='telefono' onChange={handleChangeUsuario} value={usuario.telefono} autoComplete="off" placeholder="Telefono" className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${telefonoError}`}/>

              <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Datos de ingreso a tu cuenta</p>

              <input type="text" name='correo' onChange={handleChangeUsuario} value={usuario.correo} autoComplete="off" placeholder="Correo electrónico" className= {`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${emailError}`}/>

              <input type="password" name='password' onChange={handleChangeUsuario} value={usuario.password} autoComplete="off" placeholder="Contraseña" className={`block text-sm py-3 px-4 rounded-lg w-full border outline-none ${passwordError}`} />

            </div>
            <div className="text-center mt-6">
              <button className="py-3 w-64 text-xl text-white bg-sky-600 rounded-2xl">Crear cuenta</button>
              
              
            </div>
          </div>
        </div>
      
      </form> 
      </div>   
    
  )
}