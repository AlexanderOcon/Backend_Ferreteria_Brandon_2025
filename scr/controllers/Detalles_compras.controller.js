import { pool } from "../../db_connection.js";
// Obtener todas las categorías
export const obtenerDetalles_Compras = async (req, res) => {
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

export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_compra;
    const [result] = await pool.query("SELECT * FROM detalles_compras WHERE id_detalle_compra= ?",[id_detalle_compra]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
    });
  }
};

export const registrarDetallesCompras = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Detalles_Compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)", 
      [id_compra, 
      id_producto, 
      cantidad, 
      precio_unitario
    ]);
    res.status(201).json({ id_detalle_compra: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error,
    });
  }
};