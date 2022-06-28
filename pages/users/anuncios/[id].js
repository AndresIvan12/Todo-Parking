import axios from 'axios';
import {Layout} from '../../../components/Layout';
import Mapa from '../../../components/Mapa';
import {useRouter} from 'next/router';
import Image from 'next/image';
import { Table, Carousel } from "flowbite-react";
import { verify } from 'jsonwebtoken';


function DetalleAnuncio({anuncio, estacionamiento, coordenadas, usuario}) {
  
const handleDelete = async (anuncio) => {
  
  const resImg = await axios.delete('/api/anuncios/imagenes/' + anuncio.id_anuncio);
  const resAnuncio = await axios.delete('/api/anuncios/' + anuncio.id_anuncio);
  const resEstacionamiento = await axios.delete('/api/anuncios/estacionamientos/' + anuncio.id_estacionamiento);

  router.push('/anuncios');
}

const router = useRouter();

  return ( 
        <Layout usuario={usuario}>
          
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
                      <button className='bg-red-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg' onClick = {()=> handleDelete (anuncio)}>
                        Borrar
                      </button>

                      <button className='bg-green-500 text-white text-sm leading-6 font-medium py-2 px-4 ml-2 rounded-lg' onClick={() => router.push("/anuncios/edit/" + anuncio.id_anuncio)}>
                        Editar
                      </button>
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

  if(jwt){
    const usuario = verify(jwt, secret);
    return {
      props: {
        anuncio,
        estacionamiento,
        coordenadas,
        usuario
      }
    }
  }

  return {
    props: {
      anuncio,
      estacionamiento,
      coordenadas
      
    }
  }
}

export default DetalleAnuncio;
