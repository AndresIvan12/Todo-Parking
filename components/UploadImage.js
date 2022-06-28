import { useState } from 'react';
import Head from 'next/head'


export function UploadImage() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    //en el input file hay un onchange que ejecuta la funcion handlechange y con el paramatro podemos rescatar la informacion del archivo pero no el contenido 
    reader.readAsDataURL(changeEvent.target.files[0]);

    
    //El archivo tarda un tiempo en leerlo y para saber cuando a terminado de leer todo el archivo usamos el evento onload este ejecuta una funcion que nos devuelve un objeto con la imagen que se encuentra en target.result
    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
      
    }


  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    const formData = new FormData();
    

    for ( const file of fileInput.files ) {
      console.log(file);
      formData.append('file', file);
      formData.append('upload_preset', 'My Uploads');
    }
    
    const data = await fetch('https://api.cloudinary.com/v1_1/todo-parking/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div >
      
      <main >

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={imageSrc} />
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {/* {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )} */}
        </form>
      </main>
    </div>
  )
}