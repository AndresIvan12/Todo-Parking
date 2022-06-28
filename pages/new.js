import {AnuncioForm} from '../components/AnuncioForm';
import { Layout } from '../components/Layout';
import { verify } from 'jsonwebtoken';


function NewPage({usuario}) {
  return <Layout usuario={usuario}>
    <AnuncioForm/>
    
    
  </Layout>
}

export const getServerSideProps = async (ctx) => {
  
  const { req } = ctx; 
  const secret = process.env.JWT_SECRET;

  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  if(jwt){
    const usuario = verify(jwt, secret);

  
    return {
      props:{
        usuario,
        
      },
    };
  }

  return {
    props:{

    }
  }
};

export default NewPage;