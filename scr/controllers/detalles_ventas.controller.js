import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerDetalles_Ventas = async (req, res) => {
  try {
    const { data, error } = await supabase.from('detalles_ventas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los detalles de ventas.",
      error: error.message,
    });
  }
};


export const obtenerDetalles_Venta = async (req, res) => {
  try {
    const id_detalle_venta = req.params.id_detalle_venta;
    const { data, error } = await supabase.from('detalles_ventas').select('*').eq('id_detalle_venta', id_detalle_venta);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_detalle_venta} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los detalles de ventas.",
      error: error.message,
    });
  }
};

export const registrarDetallesVentas = async (req, res) => {
  try {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
    const { data, error } = await supabase.from('detalles_ventas').insert([{
      id_venta,
      id_producto,
      cantidad,
      precio_unitario
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_detalle_venta: data[0].id_detalle_venta });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar los detalles de venta.",
      error: error.message,
    });
  }
};

export const eliminarDetalleVenta = async (req, res) => {
  try {
    const id_detalle_venta = req.params.id_detalle_venta;
    const { error } = await supabase.from('detalles_ventas').delete().eq('id_detalle_venta', id_detalle_venta);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle de venta.',
      error: error.message
    });
  }
};

export const actualizarDetallesVentaPatch = async (req, res) => {
  try {
    const { id_detalle_venta } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('detalles_ventas').update(datos).eq('id_detalle_venta', id_detalle_venta);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Detalle de venta con ID ${id_detalle_venta} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el detalle de venta.",
      error: error.message,
    });
  }
};