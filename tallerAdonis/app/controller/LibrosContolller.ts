import pgDatabase from "../database/pgDatabase.ts";

export default class LibrosController{

 async obtenerLibros({request,response}){
//select * from Libros
        const resul=await pgDatabase.query('select * from Libros')
        console.log(resul.rows)
        return response.json({MENSAJE: resul.rows})

 }

async crearLibros({request,response}){
//INSERT INTO libros (id_libros, titulo, autor, anio_publicacion, editorial_id) VALUES (11, 'pocajontas', 'juan perez', '2020-02-01', 1);
    const {id_libros,titulo,autor,anio_publicacion,editorial_id}=request.body()

    const crear = await pgDatabase.query('INSERT INTO Libros (id_libros ,titulo, autor,anio_publicacion, editorial_id) VALUES ($1,$2,$3,$4,$5)')
    console.log(crear.rows)
    if (titulo.lenght>0){
        if(typeof titulo === "string"){
            if (autor.lenght >0){
                if(anio_publicacion.lenght === 4){
                    if(typeof anio_publicacion === "number"){
                        const resul=await pgDatabase.query("INSERT INTO libros (id_libros,titulo,autor,anio_publicacion,editorial_id) VALUES ($1,$2,$3,$4,$5)",
                            [id_libros,titulo,autor,anio_publicacion,editorial_id]
                        );
                        console.log(resul.rowCount);
                        if (resul.rowCount > 0){return response.json}
                    }
                }
            }
        }
    }
 } 

async mostrarLibro({params, request,response}){
    //select*from libros where id_libros =7;
    const id =params.id
    const resull=await pgDatabase.query('select * from Libros WHERE id_libros= $1',[id])
    return resull.rows[0] || {mensaje: 'Producto no encontrado'}    
 }

async actualizarlibros ({params,request,response}){
    const id=params.id
    const {id_libros,titulo,autor,anio_publicacion,editorial_id}=request.body()
    await pgDatabase.query('UPDATE libros SET id_libros=$1, titulo=$2, autor=$3, anio_publicacion=$4, editorial_id=$5 WHERE autor =$6', [id_libros,titulo,autor,anio_publicacion,editorial_id,id])
    return { mensaje: 'Prducto actualizado correctamente' }
}

async eliminarLibro({params,request,response}){
    //DELETE FROM libros WHERE id_libros=10;
    const id=params.id
    await pgDatabase.query('DELETE FROM libros WHERE id_libros= $1',[id])
    return { mensaje:'Producto eliminado' }
 }

async listarEditorial({params,request,response}){
    //select*from libros where editorial_id=1;
    const id=params.id
    const resul=await pgDatabase.query('select * from libros where editorial_id=$1', [id])
    console.log(resul)
    return response.json({mensaje:resul.rows})
}

async librosConPalabras({params,request,response}){
    //select*from libros where titulo like 'el%'
    const titulo=params.titulo
    const resul=await pgDatabase.query('select * from libros where titulo like "%$1%"', [titulo])
    console.log(resul)
    return response.json({mensaje:resul.rows})
}

async LibrosXanio({params,request,response}){
    //select*from libros where anio_publicacion='2020-09-30'

    const anio_publicacion=params.anio_publicacion
    const resul=await pgDatabase.query('select * from libros where anio_publicacion=$1',[anio_publicacion])
    console.log(resul)
    return response.json({mensaje:resul.rows})
}






}