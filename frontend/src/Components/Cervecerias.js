import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import L from 'leaflet'
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import uuid from 'react-uuid'

export default function Cervecerias(){


    // var listado = []
    // var posicion =[]
    


    const [ubicaciones, setUbicaciones] = useState ([])
    const [radio,setRadio] = useState([])


    const actualizarListado = () => {
        axios.get('http://localhost:5000/listaGrupo?grupo=Cervecerias').then((res) => {
        console.log(res.data)  
        setUbicaciones(res.data)
      })
      .catch((error) =>{
          console.log(error);
      })  
  }

  const radioActual = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  
    axios.get(`http://localhost:5000/lugaresRadio?grupo=Cervecerias&longitud=${position.coords.longitude}&latitud=${position.coords.latitude}`).then((res) => {
    // console.log(res.data)         
    setRadio(res.data)
    console.log(radio)
    
      })
      .catch((error) =>{
          console.log(error);
      })        
    });    
  
}


    const myIcon= L.icon({
        iconUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
        iconSize:[25,41],
        iconAnchor:[12.5, 41],
        popupAnchor:[0,-41]

    })

    const iconoPosActual = {
        iconUrl : 'my-icon.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    }


    const style ={
        height: '650px',
        width: '650px',
        
        
    }

    const listadito={
        display :'flex',
        justifyContent: 'space-around'
    }
  
 

    useEffect(() => {
      
        actualizarListado();
       radioActual()
        ;
        
        
    }, [])


    return(
    <Fragment>

    <div style={listadito}> 

       <Map center={[-32.484402, -58.232802]} zoom={14} style={style} className="mt-4" >
           <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />

            {ubicaciones.map(ubi => (
                
                <Marker 
                key = {uuid()}
                position = {[ubi.latitud, ubi.longitud]} icon ={myIcon}> 
                <Popup>
                    {ubi.nombre}
                </Popup>

                </Marker>
            ) )}          
        
       </Map>
       

       <div class="mt-5" align="center" >


                    <div >
                            <h2>Cervecerias cercanas </h2>
                            <p>El mapa de la izquierda, muestra todos los puntos del grupo de interes cargados.</p>
                            <p>En la tabla de abajo, visualizara los lugares cercanos (En un radio de 5km) y distancia a los mismos.
                           
                            </p>
                              
                            <table class="table col-xl-6" >
                                <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Distancia desde posicion actual</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {radio.map(ra =>(
                                    <tr>
                                    <td>{ra[0]}</td>  
                                    <td align="center">{ra[1]} kms</td>                                 
                                    </tr>   
                                    ))}
                                </tbody>
                            </table>
                            <Link to="/">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Volver al Home</a>
                        </Link>
                        </div>
                </div>
        </div>  

       </Fragment>
        )   
}