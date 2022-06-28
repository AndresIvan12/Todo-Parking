import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Buscador from './Buscador';
import Mapa from './Mapa';
import Script from 'next/script';
import { CurrencyDollarIcon } from '@heroicons/react/solid'





export function AnuncioForm() {



  //UseRouter lo usamos para diferenciar si el formulario se necesita para crear un nuevo anuncio o para actualizar uno existente
  const router = useRouter();

  //Si el formulario se necesita para un update se consultan los datos del anuncio para actualizarlo
  useEffect(() => {
    const getAnuncio = async () => {
      
      const resAnuncio = await axios.get('/api/anuncios/' + router.query.id);
      setAnuncio(resAnuncio.data);

      const resEstacionamiento = await axios.get('/api/anuncios/estacionamientos/' + resAnuncio.data.id_estacionamiento);
      setEstacionamiento(resEstacionamiento.data);

      

      setCoordenadas({ lat: Number(resEstacionamiento.data.latitud), lng: Number(resEstacionamiento.data.longitud) });
      


      const resImagen = await axios.get('/api/anuncios/imagenes/' + router.query.id);
      
      setImageSrc(resImagen.data.url);
    }

    if(router.query.id) {
      getAnuncio(router.query.id);
    }
  }, [])

  //UseState establece valores por defecto y crea la funcion para cambiar los valores de acuerdo a los inputs del formulario

  const [imageSrc, setImageSrc] = useState();

  const [uploadData, setUploadData] = useState();

  const[anuncio, setAnuncio] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    estado: "",
    id_estacionamiento: "",
  })

  const[estacionamiento, setEstacionamiento] = useState({
    superficie_total: "",
    tipo: "",
    acceso: "",
    cobertura: "",
    gastos_comunes: "",
    direccion: "",
    latitud: "",
    longitud: "",
  })

  const [coordenadas, setCoordenadas] = useState();



  //Controlador de cambios en los inputs del anuncio
  const handleChangeAnuncio = ({target: {name, value}}) => {
    setAnuncio({...anuncio, [name]: value})

  }

  //Controlador de cambios en los inputs del estacionamiento
  const handleChangeEstacionamiento = ({target: {name, value}}) => {
    setEstacionamiento({...estacionamiento, [name]: value})

  }

  //Controlador de cambios en el input file
  const handleChangeImg = (changeEvent) => {
    const reader = new FileReader();

    //en el input file hay un onchange que ejecuta la funcion handlechange y con el paramatro podemos rescatar la informacion del archivo pero no el contenido 
    console.log(changeEvent);
    reader.readAsDataURL(changeEvent.target.files[0])
    
    
    //El archivo tarda un tiempo en leerlo y para saber cuando a terminado de leer todo el archivo usamos el evento onload este ejecuta una funcion que nos devuelve un objeto con la imagen que se encuentra en target.result
    reader.onload = function(onLoadEvent){
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }
    
  }

  //funcion para subir la imagen a cloudinary
  const guardarImagen = async function (fileInput, formData) {
    for (const file of fileInput.files) {
      formData.append('file', file);
      formData.append('upload_preset', 'My Uploads');

      // const data = await cloudinary.uploader.upload(file).then(r => r.json());
      
    }


    
    const data = await fetch('https://api.cloudinary.com/v1_1/todo-parking/image/upload', {
       method: 'POST',
       body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);

    return data;
  }
  

  //funcion para verificar si la ruta de la imagen es relativa, esta es relativa si se ingresa una imagen en el input file, si no se ingresa nada es absoluta y no se hace ningun cambio en la bbdd
  const actualizarRelativePath = async (fileInput, formData, idAnuncio) => {
    if (fileInput.files.length > 0) {
      const datosImagen = await guardarImagen(fileInput, formData);

      const respuesta = await axios.put('/api/anuncios/imagenes/' + idAnuncio, {
        nombre: datosImagen.original_filename,
        id_anuncio: idAnuncio,
        url: datosImagen.secure_url,
        bytes: datosImagen.bytes,
        formato: datosImagen.format,
      });
    }

    
  }

  
  //Funcion para hacer un post o un update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    const formData = new FormData();

    if(router.query.id){
      // console.log('update');

      const resEstacionamiento = await axios.put('/api/anuncios/estacionamientos/' + anuncio.id_estacionamiento, estacionamiento);
      const resAnuncio = await axios.put('/api/anuncios/' + router.query.id, anuncio);
      actualizarRelativePath(fileInput, formData,router.query.id);

    }else{
      // console.log('post');

      //Se gurda la imagen en cloudinary
      const datosImagen = await guardarImagen(fileInput, formData);

      //Se guarda el estacionamiento en la BBDD
      const resEstacionamiento = await axios.post('/api/anuncios/estacionamientos', estacionamiento);

      //Se consulta el id del estacionamiento que se guardo para asociarlo al anuncio
      const {data} = await axios.get('/api/anuncios/estacionamientos')
      const idEstacionamiento = await data[data.length - 1].id_estacionamiento
  
      setAnuncio({...anuncio, ["id_estacionamiento"]: idEstacionamiento})

      const anuncioConIdEstacionamiento = {
        titulo: anuncio.titulo,
        precio: anuncio.precio,
        descripcion: anuncio.descripcion,
        estado: anuncio.estado,
        id_estacionamiento: idEstacionamiento,
      }
      
      //Se guarda el anuncio con el id del estacionamiento en la BBDD
      const resAnuncio = await axios.post('/api/anuncios', anuncioConIdEstacionamiento);
      
      //Se consulta el id del anuncio que se guardo para asociarlo a la imagen y guardar la imagen con el id del anuncio en la BBDD
      {
      const {data} = await axios.get('/api/anuncios')
      const idAnuncio = await data[data.length - 1].id_anuncio
        
      const resImagen = await axios.post('/api/anuncios/imagenes', {
        nombre: datosImagen.original_filename,
        id_anuncio: idAnuncio,
        url: datosImagen.secure_url,
        bytes: datosImagen.bytes,
        formato: datosImagen.format,
      });
      }


    }
    
    router.push('/users/anuncios')
    
    
  }

  
  

  
  
  return (
      // Formulario para crear un anuncio
      <form onSubmit={handleSubmit} className=''>

        {/* image input */}
        <div className='text-center h-full'> 
          <label htmlFor='imagenes' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Imagenes: </label>
          <input type="file" name="file" onChange={handleChangeImg} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700"/>
          <img src={imageSrc} width={300} height={300}/>
        </div>

        

        {/* anuncio inputs */}
        <div className='h h-full'>
          <div className='text-center'>
            <label htmlFor='titulo' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Titulo: </label>
            <input type="text" name='titulo' onChange={handleChangeAnuncio} value={anuncio.titulo} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"/>
          </div>

          <div className='text-center'>
            <label htmlFor='precio' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Precio: </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm"> $ </span>
              </div>
              <input type="text" name="precio" onChange={handleChangeAnuncio} value={anuncio.precio} autoComplete="off" className="p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2 block pl-7 pr-12 sm:text-sm" placeholder="0"/>
              
            </div>
          </div>

          <div className='text-center'>
            <label htmlFor='descripcion' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Descripción: </label>
            <textarea name = "descripcion" rows ="2" onChange={handleChangeAnuncio} value={anuncio.descripcion} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"></textarea>
          </div>

          {/* <div className='text-center'>
            <label htmlFor='estado' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Estado: </label>
            <input type="text" name="estado" onChange={handleChangeAnuncio} value={anuncio.estado} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"/>
          </div> */}

          {/* estacionamiento inputs */}
          <div className='text-center'>
            <label htmlFor='superficie_total' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Superficie: </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm"> m²</span>
              </div>
              <input type="text" name="superficie_total" onChange={handleChangeEstacionamiento} value={estacionamiento.superficie_total} autoComplete="off" className="p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2 block pl-8 pr-12 sm:text-sm" placeholder="0"/>
              
            </div>
          </div>

          <div className='text-center'>
            <label htmlFor='tipo' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Tipo: </label>
            {/* <input type="text" name="tipo" onChange={handleChangeEstacionamiento} value={estacionamiento.tipo} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"/> */}
            <select name="tipo" onChange={handleChangeEstacionamiento} value={estacionamiento.tipo} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2">
              <option value=""></option>
              <option value="De un nivel">De un nivel</option>
              <option value="De varios niveles">De varios niveles</option>
              <option value="Subterraneo">Subterraneo</option>
              <option value="Automatizado">Automatizado</option>
            </select>
          </div>

          <div className='text-center'>
            <label htmlFor='acceso' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Acceso: </label>
            {/* <input type="text" name="acceso" onChange={handleChangeEstacionamiento} value={estacionamiento.acceso} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"/> */}
            <select name="acceso" onChange={handleChangeEstacionamiento} value={estacionamiento.acceso} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2">
              <option value=""></option>
              <option value="Llave">Llave</option>
              <option value="Control remoto">Control remoto</option>
              <option value="Tarjeta o etiqueta de llave">Tarjeta o etiqueta de llave</option>
              <option value="Parquero">Parquero</option>
              <option value="Teclado">Teclado</option>
              <option value="Reconocimiento de matrículas (LPR)">Reconocimiento de matrículas (LPR)</option>
            </select>
          </div>

          <div className='text-center'>
            <label htmlFor='cobertura' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Cobertura: </label>
            {/* <input type="text" name="cobertura" onChange={handleChangeEstacionamiento} value={estacionamiento.cobertura} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2"/> */}
            <select name="cobertura" onChange={handleChangeEstacionamiento} value={estacionamiento.cobertura} autoComplete="off" className = "p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2">
              <option value=""></option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className='text-center'>
            <label htmlFor='gastos_comunes' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Gastos Comunes: </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm"> $ </span>
              </div>
              <input type="text" name="gastos_comunes" onChange={handleChangeEstacionamiento} value={estacionamiento.gastos_comunes} autoComplete="off" className="p-1 px-3 appearance-none outline-none w-full text-gray-800 shadow border rounded py-2 block pl-7 pr-12 sm:text-sm" placeholder="0"/>
              
            </div>
          </div>


          <div className='text-center'>
              <label htmlFor='direccion' className=' text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3 font-medium'>Dirección: </label>
              <Buscador setCoordenadas={setCoordenadas} setEstacionamiento = {setEstacionamiento} estacionamiento = {estacionamiento} handleChangeEstacionamiento = {handleChangeEstacionamiento} />
          </div>
          
          <div className='text-center'>
              <Mapa coordenadas = {coordenadas} estacionamiento = {estacionamiento}/>
          </div>

        </div>
        
        <div className='text-center'>
          <button className='w-full block bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 text-white font-semibold rounded-lg px-4 py-3 my-5 border border-sky-600'>Guardar Anuncio</button>
        </div>

        
      </form>    
    
  )
}

