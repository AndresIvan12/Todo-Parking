import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";



export default function middleware(req) {

  const secret = process.env.JWT_SECRET;

  const urlAbsoluta = req.nextUrl.clone()
  const { cookies } = req;

  const jwt = cookies.OursiteJWT

  const url = req.url;



  if(url.includes('/users/anuncios')){
    if(jwt === undefined){
      urlAbsoluta.pathname = '/users/login'
      return NextResponse.redirect(urlAbsoluta);
    }

    try{
      verify(jwt, secret);
      return NextResponse.next();

    } catch(e){
      urlAbsoluta.pathname = '/users/login'
      
      return NextResponse.redirect(urlAbsoluta);
    }
  }

  if(url.includes('/users/perfil')){
    if(jwt === undefined){
      urlAbsoluta.pathname = '/users/login'
      return NextResponse.redirect(urlAbsoluta);
    }

    try{
      verify(jwt, secret);
      return NextResponse.next();

    } catch(e){
      urlAbsoluta.pathname = '/users/login'
      
      return NextResponse.redirect(urlAbsoluta);
    }
  }


  return NextResponse.next();  
}

