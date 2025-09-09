import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerDetalles_Ventas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Detalles_Ventas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error,
    });
  }
};


export const obtenerDetalles_Venta = async (req, res) => {
  try {
    const id_detalle_venta = req.params.id_detalle_venta;
    const [result] = await pool.query("SELECT * FROM Detalles_Ventas WHERE id_detalle_venta= ?",[id_detalle_venta]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_venta} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};