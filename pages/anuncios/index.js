import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import Image from 'next/image';
import { verify } from "jsonwebtoken";
import {useEffect, useState} from 'react';



function Anuncios({anuncios, usuario}) {

  const [anuncio, setAnuncio]= useState(anuncios);
  const [busqueda, setBusqueda]= useState("");

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda= anuncios.filter((elemento)=>{
      if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.direccion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setAnuncio(resultadosBusqueda);
    console.log(resultadosBusqueda);
  }
  

  return (
    <Layout usuario={usuario}>
      
      {/* <Link href="/new">
        <a className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
          <svg className="group-hover:text-blue-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          Crear Anuncio
        </a>
      </Link> */}

      <div>
        <div className="justify-center flex flex-row">
          <div className="mb-3 xl:w-96">
            <div className="input-group relative   items-stretch w-full mb-4">
              
              <input type="search" onChange={handleChange} value={busqueda} className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" placeholder="Buscar" aria-label="Search" aria-describedby="button-addon3"/>
              <button className="btn inline-block px-6 py-2 border-2 border-sky-600 text-white font-medium text-xs leading-tight uppercase rounded hover:text-sky-600 hover:border-sky-600 bg-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Buscar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {anuncio.map(anuncio => (
          // <Link href={`/anuncios/${anuncio.id_anuncio}`} key={anuncio.id_anuncio}>
          //   <a>
            
          //   <div className = " hover:shadow-xl rounded-md bg-white ring-1 ring-slate-200  text-slate-900 shadow-md p-6 m-3">
            
          //     <div className = "inline-grid grid-cols-3 gap-4">
          //       <div className = "">
          //         <Image src={anuncio.url} alt="Picture of the author" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" width={200} height={200}/>
          //       </div>

          //       <div className = "">
          //         <h4 className="font-bold">{anuncio.titulo}</h4>
          //         <p className="font-semibold">$ {anuncio.precio}</p>
          //         <p className="font-extralight">{anuncio.descripcion}</p>
                  
          //       </div>

          //     </div>

          //   </div>
          //   </a>
          // </Link>

          
          
          <Link href={`/anuncios/${anuncio.id_anuncio}`} key={anuncio.id_anuncio}>
            <div className="mt-6 ">
                  <div className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <Image src={anuncio.url} alt="Picture of the author" className="w-full h-full object-center object-cover lg:w-full lg:h-full" width={700} height={900}/>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {anuncio.titulo}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{anuncio.direccion}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${anuncio.precio}</p>
                    </div>
                  </div>

                  
            </div>
          </Link>

         
        ))}

      </div>

      <div>
        <div className="btn-group justify-center mt-16">
          <button className="btn border-sky-600 text-white font-medium text-xs leading-tight uppercase rounded hover:text-sky-600 hover:border-sky-600 bg-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">«</button>
          <button className="btn border-sky-600 text-white font-medium text-xs leading-tight uppercase rounded hover:text-sky-600 hover:border-sky-600 bg-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Page 1</button>
          <button className="btn border-sky-600 text-white font-medium text-xs leading-tight uppercase rounded hover:text-sky-600 hover:border-sky-600 bg-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">»</button>
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req } = ctx; 
  const secret = process.env.JWT_SECRET;

  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  const {data: anuncios} = await axios.get("http://localhost:3000/api/anuncios/imagenes");
 
  if(jwt){
    const usuario = verify(jwt, secret);
    return {
      props: {
        anuncios,
        usuario,
      }
    }
  }


  return {
    props:{
      anuncios,
      
      
    },
  };
};


export default Anuncios;