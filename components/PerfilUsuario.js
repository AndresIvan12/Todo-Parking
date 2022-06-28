import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import swal from 'sweetalert';




export function PerfilUsuario({usuarioToken}) {

  //Si el formulario se necesita para un update se consultan los datos del anuncio para actualizarlo
  useEffect(() => {
      const getUsuario = async () => {
        
      const resUsuario = await axios.get(`/api/usuarios/` + usuarioToken.id);
      setUsuario(resUsuario.data);
      
    }

    if(usuarioToken) {
      getUsuario(usuarioToken);
    }
       


      
  }, [])

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resUsuario = await axios.put('/api/usuarios/' + usuario.id_usuario, usuario);
    console.log(resUsuario.data);
   
    if(resUsuario.data.error){
      swal("Error", resUsuario.data.error, "error");
    }else{
      swal("Exito", "Información personal actualizada", "success");
    }
    
    
    
  }

  const[usuario, setUsuario] = useState({
    id_usuario: "",
    nombre: "",
    apellido: "",
    direccion: "",
    correo: "",
    telefono: "",
  })
  
  
  const handleLogout = async (e) => {

    const resLogout = await axios.post('/api/auth/logout');

    if(resLogout.status === 200){
      window.location.href = '/';
    } else {
      console.log('Error al cerrar sesion');
    }
    
  }
  
  


  //Controlador de cambios en los inputs del estacionamiento
  const handleChangeUsuario = ({target: {name, value}}) => {
    setUsuario({...usuario, [name]: value})

  }

  const handleEliminarCuenta = async (e) => {
    e.preventDefault();
    swal({
      title: "¿Estas seguro que quieres eliminar tu cuenta?",
      text: "Una vez eliminada no la podrás recuperar y los anuncios que hayas publicado, serán eliminados",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
        try{
          const resUsuarioDelete = await axios.delete('/api/usuarios/' + usuario.id_usuario);
          console.log(resUsuarioDelete)
          swal("Tu cuenta ha sido eliminada", {
            icon: "success",
          })
          handleLogout();

        }catch{
          swal("Tu cuenta no ha podido ser eliminada", {icon: "error"});
        }
       
      } else {
        
      }
    });
    
    // const resUsuario = await axios.put('/api/usuarios/' + usuario.id_usuario, usuario);
    // console.log(resUsuario.data);
   
    // if(resUsuario.data.error){
    //   swal("Error", resUsuario.data.error, "error");
    // }else{
    //   swal("Exito", "Información personal actualizada", "success");
    // }
    
    
    
  }

  return (
  
      <div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">

            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="font-bold pb-5 text-2xl">Mi perfil</h3>
                <p className="mt-1 text-sm text-gray-600">Los datos personales siempre son tuyos, pero es necesario que nos los proporciones, para poder idetentificarte y para que las demás personas te puedan contactar</p>
              </div>
              <div className="py-3 text-Left px-4 sm:px-0">
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={handleEliminarCuenta}>Eliminar Cuenta</button>
              </div>
            </div>

            {/* Form */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit} className=''>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-gray-100 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
                        <input type="text" name="correo" onChange={handleChangeUsuario} value={usuario.correo} autoComplete="off" className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" disabled/>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="nombre" onChange={handleChangeUsuario} value={usuario.nombre} autoComplete="off" className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input type="text" name="apellido" onChange={handleChangeUsuario} value={usuario.apellido} autoComplete="off" className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                    

                      <div className="col-span-6">
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input type="text" name="direccion" onChange={handleChangeUsuario} value={usuario.direccion} autoComplete="off" className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Telefono</label>
                        <input type="text" name="telefono" onChange={handleChangeUsuario} value={usuario.telefono} autoComplete="off" className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Guardar</button>
                  </div>
                  
                </div>
              </form>
              
            </div>
          </div>
        </div>
        

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
   
  )
}

