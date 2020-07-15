import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function AgregarLugar(){

    const [grupo, setGrupo] = useState('')
    const [nombre, setNombre] = useState('')
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)


const agregarLugar = e =>{

    e.preventDefault()
    console.log(grupo)
    console.log(nombre)
    console.log(latitud)
    axios({
        "method" : "POST",
        "url": "http://localhost:5000//agregarLugarGrupoInteres",
        "params": {
            "grupo": grupo,
            "latitud": latitud,
            "longitud": longitud,            
            "nombre": nombre,            
        }
        
    }).then((response)=> {
        console.log(response);
        Swal.fire({
            title: 'Lugar agregado!',
            text: 'El lugar se agrego correctamente',
            
          }).then((result) =>{
            if (result.value){
              let link = '/'
              window.location.href = link
            }
          })
    })
     .catch((error)=> {
        console.log(error);
        Swal.fire({
            title: "Ha ocurrido un error!",
            text: "Verifique que los datos ingresados sean correctos",
            icon: "error",
          });
     });
}




        return(
            <Fragment>
            <div align="center">
                        <div class="jumbotron">
                        <h1 class="display-4">Agregar lugares de interes</h1>
                        <p class="lead">Esto es un menu para agregar otros puntos de interes y asi expander nuestra bdd  .</p>
                        <hr class="my-4"/>
                        <p>(Aplicacion hecha por Juan Ignacio Curtoni).</p>
                        <Link to="/">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Volver al Home</a>
                        </Link>
                    </div>
          </div>
            
            <div align="center">
                <form className="col-sm-4" onSubmit={agregarLugar}>
                <div class="form-group">
                        <label for="exampleFormControlSelect1">Seleccionar grupo</label>
                        <select class="form-control" id="exampleFormControlSelect1" onChange={e => setGrupo(e.target.value)} >
                        <option selected value="Cervecerias">Cervecerias</option>
                        <option value="Farmacias">Farmacias</option>
                        <option value="CentrosEmergencias">Centros de Urgencia</option>
                        <option value="facultades">Facultades</option>
                        <option value="Supermercados">Supermercados</option>
                        </select>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Nombre del Lugar</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={e => setNombre(e.target.value)}/>
                    
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Latitud</label>
                    <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={e => setLatitud(e.target.value)}/>
                    
                </div>
               

                    <div class="form-group">
                    <label for="exampleInputPassword1">Longitud</label>
                    <input  class="form-control" id="exampleInputPassword1"
                    onChange={e => setLongitud(e.target.value)}/>
                </div>
                
                <button type="submit" class="btn btn-primary">Agregar</button>
                </form>
             </div>
        </Fragment>
        )



}