import axios from "axios";
import { Layout } from "../components/Layout";
import Link from "next/link";
import Image from 'next/image';
import { verify } from "jsonwebtoken";
import { Carousel } from "flowbite-react";


function HomePage({usuario}) {
  return (
    <Layout usuario={usuario}>
      
      <div>
        {/* <!-- Section 2 --> */}
        <section>
          <div className="relative bg-white overflow-hidden">
            <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static ">
                <div className="sm:max-w-lg">
                  <h1 className="text-4xl font font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Encuentra y busca estacionamientos en arriendo</h1>
                  <p className="mt-4 text-xl text-gray-500">Estacionamientos disponibles en todo Santiago, sin inconvenientes ni complicaciones.</p>
                </div>
                <div>
                  <div className="mt-10">
                    {/* <!-- Decorative image grid --> */}
                    <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                              <Image src="https://cdn.pixabay.com/photo/2016/03/22/00/45/multi-storey-car-park-1271919__340.jpg" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://cdn.pixabay.com/photo/2016/11/18/13/13/architecture-1834403_960_720.jpg" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                          </div>
                          <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://images.pexels.com/photos/2469616/pexels-photo-2469616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://images.pexels.com/photos/4969983/pexels-photo-4969983.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://images.pexels.com/photos/9799756/pexels-photo-9799756.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                          </div>
                          <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://images.pexels.com/photos/6650986/pexels-photo-6650986.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                              <Image src="https://images.pexels.com/photos/2226607/pexels-photo-2226607.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-center object-cover" width={700} height={900}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                     {usuario ? 
                    
                    <Link href={"/users/anuncios"}>
                      <a className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                        Crea tu primer anuncio
                      </a>
                    </Link>
                    :
                    <Link href={"/users/registro"}>
                      <a className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">
                        Crea tu primer anuncio
                      </a>
                    </Link>
                  
                  
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Section 3 --> */}
        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
            <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

                {/* <!-- Image --> */}
                <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">

                    <Image
                      className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20"
                      src='https://media.istockphoto.com/vectors/map-city-vector-illustration-vector-id1306807452?b=1&k=20&m=1306807452&s=612x612&w=0&h=3h1xXhg9mQOWodRHAiYkl61fO3P9yktmcClwSvp1YX0='
                      width={700}
                      height={600}
                    />
                    {/* <img src="https://cdn.devdojo.com/images/december2020/productivity.png" class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "> */}
                </div>

                {/* <!-- Content --> */}
                <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                      Hazte Visible
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                      Si buscas que tu publicidad tenga visibilidad en internet y que las personas puedan contactarte, da el primer paso, crea una cuenta con nostros y te ayudaremos a diseñar y gestionar todos tus anuncios.
                    </p>
                    <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400 rounded-full"><span className="text-sm font-bold">✓</span></span> Crea tus propios anuncios de forma fácil y sencilla.
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400  rounded-full"><span className="text-sm font-bold">✓</span></span> Invierte menos tiempo
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400   rounded-full"><span className="text-sm font-bold">✓</span></span> Gana Visibilidad
                        </li>
                    </ul>
                </div>
                {/* <!-- End  Content --> */}
            </div>
            <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

                {/* <!-- Content --> */}
                <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                    <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Busca y encuentra
                    </h2>
                    <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                        Los mejores estacionamientos de todo Santiago encuentralos aquí, diferentes precios, ubicaciones y características.
                    </p>
                    <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400   rounded-full"><span className="text-sm font-bold">✓</span></span> Busca por ubicación
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400   rounded-full"><span className="text-sm font-bold">✓</span></span> Conoce los detalles
                        </li>
                        <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-green-400  rounded-full"><span className="text-sm font-bold">✓</span></span> Obtén el contacto de los anunciantes
                        </li>
                    </ul>
                </div>
                {/* <!-- End  Content --> */}

                {/* <!-- Image --> */}
                <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                    <Image
                      className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"
                      src='https://img.freepik.com/vector-gratis/ilustracion-estacionamiento-coche_7095-314.jpg'
                      width={700}
                      height={600}
                    />
                    {/* <img src="https://cdn.devdojo.com/images/december2020/settings.png" class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"> */}
                </div>
            </div>
        </section>
      </div>

    </Layout>
  )
  
}

export const getServerSideProps = async (ctx) => {
  
  const { req } = ctx; 
  const secret = process.env.JWT_SECRET;

  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  if(jwt){
    const usuario = verify(jwt, secret);
    return {
      props: {
        usuario,
      }
    }
  }


  return {
    props:{
      
      
    },
  };
};


export default HomePage;

