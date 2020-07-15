from flask import Flask, request,jsonify
import redis
from flask_cors import CORS


app = Flask(__name__)

def connect_db():
    conexion = redis.StrictRedis(host='db_redis_maps_fr', port=6379, db=0, decode_responses = True)
    if (conexion.ping()):
        print ('Conectado al servidor de redis')
    else:
        print ('error...')

    return conexion



db = connect_db()
CORS(app)
db.flushdb()


def inicializar():
    db.geoadd('facultades', -58.233343, -32.478850, 'UaderFCyT', -58.229922, -32.481437, 'UCU')
    db.geoadd('Cervecerias', -58.233529, -32.480367, 'Drakkar', -58.234838, -32.479706, '7Colinas')
    db.geoadd('Farmacias', -58.230900, -32.483697, 'Farmacia Ramirez', -58.233690, -32.484023, 'Farmacia Popular')
    db.geoadd('CentrosEmergencias', -58.238391, -32.484487, 'Alerta Emergencias', -58.234013, -32.479347, 'Centro Medico')
    db.geoadd('Supermercados', -58.241448, -32.488424, 'Supermercados DIA', -58.229926, -32.489049, 'Gran REX')


inicializar()

@app.route('/grupos')
def index():
    grupos = db.keys('*')
    #print(db.geopos('Farmacias', 'Farmacia Ramirez'))
    return jsonify(grupos)

@app.route('/lugaresRadio', methods=['GET'])
def lugaresRadio():
    
    grupo = request.args.get('grupo')
    longitud = request.args.get('longitud')
    latitud = request.args.get('latitud')
    listt = db.georadius(grupo,longitud,latitud, 5, unit='km', withdist =True)
    return jsonify(listt)




@app.route('/listaGrupo', methods=['GET'])
def grupoInteresado():
    if request.method == 'GET':
        listaInteres =[]
        grupoInteres = request.args.get('grupo')
        lista = db.zrange(grupoInteres,0,-1)
        for l in lista:
            longitud,latitud = db.geopos(grupoInteres,l)[0]
            listaInteres.append({"nombre": l, "longitud":longitud, "latitud":latitud})
        a = jsonify(listaInteres)
        print(a)
        return(a)

@app.route('/agregarLugarGrupoInteres', methods=['POST'])
def agregarGrupoInteres():
    if request.method == 'POST':
        grupo = request.args['grupo']
        latitud = request.args['latitud']
        longitud = request.args['longitud']
        nombre = request.args['nombre']
        db.geoadd(grupo, longitud, latitud,nombre)
    return 'agregado'







if __name__ == '__main__':
    app.run(host='backend', port ='5000', debug=False)