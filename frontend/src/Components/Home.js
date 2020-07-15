import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import beer from '../Public/beer.png'
import alerta from '../Public/alerta.png'
import cart from '../Public/cart.png'
import graduate from '../Public/graduate.png'
import hospital from '../Public/hospital.png'
import gps from '../Public/GPS.png'

import '../Public/EstiloMenu.css'


function Home(){


    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      });

    const style={
        marginTop : '130px'
    }

return(

    <div class="jumbotron">
        <h1 class="display-3 animated fadeInDown" align="center">GEOLOCALIZACIÓN</h1>
        <h3 align="center " className="animated fadeInLeft"> (Flask, Redis, Reactjs, Leaflet)</h3>

            

            
            <ul class="test-menu " >
                
            <li class="test-menu__item">
                <Link to="/agregar">
                <a class="test-menu__link text-light" title="example">
                 Agregar Lugares de interes <div align="center"></div>
                 </a>
                </Link>
            </li>
                        <li class="test-menu__item">
                        <Link to="/cervecerias">
                        <a class="test-menu__link text-light" title="example">
                            Cervecerias <div align="center"> <img src={beer}></img></div>
                        </a>
                        </Link>
                        </li>
                        
                        <li class="test-menu__item">
                        <Link to="/facultades">
                        <a class="test-menu__link text-light"  title="example">
                            Universidades  <div align="center"><img  src={graduate}></img></div>
                        </a>
                        </Link>
                        </li>

                        <li class="test-menu__item">
                        <Link to="/farmacias">
                        <a class="test-menu__link text-light"  title="example">
                            Farmacias  <div align="center"><img src={hospital}></img></div>
                        </a>
                        </Link>
                        </li>


                        <li class="test-menu__item">
                        <Link to="/emergencias">
                        <a class="test-menu__link text-light" title="example">
                            Centros emergencias <div align="center"> <img src={alerta} ></img></div>
                        </a>
                        </Link>
                        </li>

                        <li class="test-menu__item">
                        <Link to="/supermercados">
                        <a class="test-menu__link text-light"title="example">
                            Supermercados <div align="center"><img src={cart}></img></div>
                        </a>
                        </Link>
                        </li>
                    </ul>

                <img class="animated fadeInLeft"src={gps} style={style} width='300' height='300' align="right"></img>
    
    </div>
 
)
}

export default Home;