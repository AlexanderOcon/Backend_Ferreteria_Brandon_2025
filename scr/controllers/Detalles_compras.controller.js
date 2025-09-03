import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM detalles_compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};