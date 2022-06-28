import axios from 'axios';
import {Layout} from '../../components/Layout';
import Mapa from '../../components/Mapa';
import {useRouter} from 'next/router';
import Image from 'next/image';
import { verify } from 'jsonwebtoken';
import { PhoneIcon, MailIcon } from '@heroicons/react/solid';


function DetalleAnuncio({anuncio, estacionamiento, coordenadas, usuarioToken, usuarioAnuncio}) {
  
const handleDelete = async (anuncio) => {
  
  const resImg = await axios.delete('/api/anuncios/imagenes/' + anuncio.id_anuncio);
  const resAnuncio = await axios.delete('/api/anuncios/' + anuncio.id_anuncio);
  const resEstacionamiento = await axios.delete('/api/anuncios/estacionamientos/' + anuncio.id_estacionamiento);

  router.push('/anuncios');
}

const router = useRouter();

  return (
          <Layout usuario={usuarioToken}>
            {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
            <div className="bg-white">
              <div className="max-w-2xl mx-auto grid items-center grid-cols-1 gap-y-8 gap-x-8 sm:px-4 sm:py-14 lg:max-w-7xl lg:px-8 lg:grid-cols-2">

                <div className="">
                  {/* Imagen */}
                  <Image src={anuncio.url} alt="Picture of the author" className="w-full h-60 object-cover sm:rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" width={1000} height={1000}/>
                </div>


                {/* Datos */}
                <div className='px-8 sm:px-0'>
                  
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{anuncio.titulo}</h2>
                  <p className="mt-4 text-gray-500">{anuncio.descripcion}</p>

                  <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-8 lg:gap-x-8">
                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Precio</dt>
                      <dd className="mt-2 text-sm text-gray-500">${anuncio.precio}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Superficie Total</dt>
                      <dd className="mt-2 text-sm text-gray-500">{estacionamiento.superficie_total} m²</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Tipo</dt>
                      <dd className="mt-2 text-sm text-gray-500">{estacionamiento.tipo}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Acceso</dt>
                      <dd className="mt-2 text-sm text-gray-500">{estacionamiento.acceso}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Cobertura</dt>
                      <dd className="mt-2 text-sm text-gray-500">{estacionamiento.cobertura}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Gastos Comunes</dt>
                      <dd className="mt-2 text-sm text-gray-500">${estacionamiento.gastos_comunes}</dd>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <dt className="font-medium text-gray-900">Dirección</dt>
                      <dd className="mt-2 text-sm text-gray-500">{estacionamiento.direccion}</dd>
                    </div>

                    <div className='items-center mt-2'>
                      {/* <!-- The button to open modal --> */}
                      <label htmlFor="my-modal-3" className="btn modal-button border-2 border-sky-600 text-white hover:text-sky-600 hover:border-sky-600 bg-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Contacto</label>

                      {/* <!-- Put this part before </body> tag --> */}
                      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box relative">
                          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2 hover:text-red-600 hover:border-red-600 bg-sky-600 border-sky-600 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">✕</label>
                          

                          <div className='flex flex-row'>
                            <div className="avatar placeholder py-4 px-2 pr-6 ">
                              <div className="text-neutral-content rounded-full w-24 bg-sky-600">
                                <span className="text-3xl">{(usuarioAnuncio.nombre).charAt(0).toUpperCase()}</span>
                                
                              </div>
                              
                            </div> 

                            <div className='py-4'>
                              <h3 className="text-lg font-bold">{usuarioAnuncio.nombre}</h3>
                              <div className='flex flex-row pt-2 '>
                                <PhoneIcon className="h-5 w-5 pt-2"/>
                                <p className="pl-2">+56 {usuarioAnuncio.telefono}</p>
                              </div>
                              <div className='flex flex-row '>
                                <MailIcon className="h-5 w-5 pt-2"/>
                                <p className="pl-2">{usuarioAnuncio.correo}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dl>
                </div>
                

                <div>
           
                </div>

              {/* Mapa */}
              </div>
                <div className='rounded-2xl px-8 2xl:px-28 pb-16 '>
                  <Mapa coordenadas={coordenadas}/>
                </div>
            </div>
          

  </Layout>
)}

export const getServerSideProps = async (ctx) => {
  

  const {data: anuncio} = await axios.get('http://localhost:3000/api/anuncios/imagenes/' + ctx.query.id);

  const {data: estacionamiento} = await axios.get('http://localhost:3000/api/anuncios/estacionamientos/' + anuncio.id_estacionamiento);

  const coordenadas = { lat: Number(estacionamiento.latitud) , lng: Number(estacionamiento.longitud) };

  const { req } = ctx; 
  const secret = process.env.JWT_SECRET;

  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  const {data: usuarioAnuncio} = await axios.get('http://localhost:3000/api/usuarios/' + anuncio.id_usuario);

  if(jwt){
    const usuarioToken = verify(jwt, secret);
    
    
    return {
      props: {
        anuncio,
        estacionamiento,
        coordenadas,
        usuarioAnuncio,
        usuarioToken
      }
    }
  }

  return {
    props: {
      anuncio,
      estacionamiento,
      coordenadas,
      usuarioAnuncio
      
    }
  }

  
}

export default DetalleAnuncio;
