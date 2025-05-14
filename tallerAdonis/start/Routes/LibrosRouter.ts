import router from "@adonisjs/core/services/router";
import LibrosController from "../../app/controller/LibrosContolller.ts";


const Libros= new LibrosController();

router.get('/ObtenerLibros', Libros.obtenerLibros);
router.get('/obetenerListaEditorial/:id', Libros.listarEditorial);
router.get('/obteneriniciales/:titulo', Libros.librosConPalabras);
router.get('/obtenerlibrosXanio/:anio',Libros.LibrosXanio);
router.get('/mostrarlibros/:id', Libros.mostrarLibro);
router.post('/crearlibros', Libros.crearLibros);
router.put('/actLibros/:id', Libros.actualizarlibros);
router.delete('/delete/:id', Libros.eliminarLibro);