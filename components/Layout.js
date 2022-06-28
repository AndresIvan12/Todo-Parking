import Link from 'next/link'
import { useEffect } from 'react';
import { MapIcon } from '@heroicons/react/solid'
import { Footer } from "flowbite-react";
import { verify } from "jsonwebtoken";
import axios from 'axios';




export function Layout({children, usuario}) {

  const handleLogout = async (e) => {

    const resLogout = await axios.post('/api/auth/logout');

    if(resLogout.status === 200){
      window.location.href = '/';
    } else {
      console.log('Error al cerrar sesion');
    }
    
  }

  

  return (
    <>

   
    {/* <!-- navbar goes here --> */}
    <nav className="bg-white border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">

          <div className="flex space-x-4">
            {/* <!-- logo --> */}
            <div>
              <Link href="/">
                <a className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                  {/* <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg> */}
                  <div className='pr-2'>
                    <MapIcon className="h-5 w-5 text-sky-600"/>
                  </div>
                  <span className="font-bold">Todo Parking</span>
                </a>
              </Link>
            </div>

            {/* <!-- primary nav --> */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/anuncios">
                  <a className="py-5 px-3 text-gray-500 hover:text-gray-900">Anuncios</a>
              </Link>
              <Link href="/users/anuncios">
                  <a className="py-5 px-3 text-gray-500 hover:text-gray-900">Mis anuncios</a>
              </Link>
              <Link href="/users/perfil">
                  <a className="py-5 px-3 text-gray-500 hover:text-gray-900">Mi perfil</a>
              </Link>
              
            </div>
          </div>

          {/* <!-- secondary nav Boton registro/login/logout --> */}
          {usuario ? 
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <a href="" className="py-2 px-3 bg-sky-600 hover:bg-red-700 text-white border-red-600 rounded transition duration-300" onClick={() => handleLogout()}>Cerrar Sesión</a>
              </Link>
              
              
            </div>
          :
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/users/login">
                <a className="py-5 px-3 text-gray-500 hover:text-gray-900">Iniciar Sesión</a>
              </Link>
              <Link href="/users/registro">
                  <a href="" className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white border-sky-600 rounded transition duration-300">Registrarse</a>
              </Link>

            </div>
          }

          {/* <!-- mobile button goes here --> */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* <!-- mobile menu --> */}
      <div className="mobile-menu hidden md:hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
      </div>
    </nav>

    <div className="bg-white h-full p-10">
      <div className="container mx-auto h-full">
        {children}
      </div>
    </div>
    

    {/* <!-- footer goes here --> */}
    <Footer className="flex flex-col">
      <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        
        <Link href="/">
          <a className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
            {/* <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg> */}
            <div className='pr-2'>
               <MapIcon className="h-5 w-5 text-sky-600"/>
            </div>
            <span className="font-bold">Todo Parking</span>
          </a>
        </Link>
        
        <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
          <Footer.Link href="/">
            About
          </Footer.Link>
          <Footer.Link href="#">
            Privacy Policy
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
      <hr className="my-6 w-full border-gray-200 p-1 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <Footer.Copyright
        href="/"
        by="TodoParking™"
        year={2022}
      />
    </Footer>
    </>
  )

  
}



