import { Layout } from '../../../components/Layout';
import { verify } from "jsonwebtoken";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';



function AnunciosUsuario({usuario, anuncios}) {
  
  return (
    <Layout usuario={usuario}> 
      
      <div className='pb-10'>
        <h5 className='font-bold pb-5 text-2xl'>Mis Anuncios</h5>
        <Link href="/new">
          <a className="hover:border-sky-500 hover:border-solid hover:bg-white hover:text-sky-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
            <svg className="group-hover:text-sky-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            Crear Anuncio
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {anuncios.map(anuncio => (
        <Link href={`/users/anuncios/${anuncio.id_anuncio}`} key={anuncio.id_anuncio}>
            
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

    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  
  const { req } = ctx; 
  const secret = process.env.JWT_SECRET;

  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  const usuario = verify(jwt, secret);

  const {data: anuncios} = await axios.post("http://localhost:3000/api/usuarios/anuncios", usuario);

 
  
  return {
    props:{
      usuario,
      anuncios,
    },
  };
};


export default AnunciosUsuario;


