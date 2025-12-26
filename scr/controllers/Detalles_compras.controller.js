import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerDetalles_Compras = async (req, res) => {
  try {
    const { data, error } = await supabase.from('detalles_compras').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los detalles de compras.",
      error: error.message,
    });
  }
};

export const obtenerDetalles_Compra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const { data, error } = await supabase.from('detalles_compras').select('*').eq('id_detalle_compra', id_detalle_compra);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los detalles de compras.",
      error: error.message,
    });
  }
};

export const registrarDetallesCompras = async (req, res) => {
  try {
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const { data, error } = await supabase.from('detalles_compras').insert([{
      id_compra,
      id_producto,
      cantidad,
      precio_unitario
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_detalle_compra: data[0].id_detalle_compra });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar los detalles de compra.",
      error: error.message,
    });
  }
};


export const eliminarDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const { error } = await supabase.from('detalles_compras').delete().eq('id_detalle_compra', id_detalle_compra);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle de compra.',
      error: error.message
    });
  }
};

export const actualizarDetallesCompraPatch = async (req, res) => {
  try {
    const { id_detalle_compra } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('detalles_compras').update(datos).eq('id_detalle_compra', id_detalle_compra);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Detalle de compra con ID ${id_detalle_compra} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el detalle de compra.",
      error: error.message,
    });
  }
};