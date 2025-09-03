import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};