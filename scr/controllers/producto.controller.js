import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM productos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};


export const obtenerProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const [result] = await pool.query("SELECT * FROM productos WHERE id_producto= ?",[id_producto]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_producto} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los empleados.",
    });
  }
};