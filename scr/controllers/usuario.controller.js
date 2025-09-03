import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};