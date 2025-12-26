import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerVentas = async (req, res) => {
  try {
    const { data, error } = await supabase.from('ventas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las ventas.",
      error: error.message,
    });
  }
};


export const obtenerVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const { data, error } = await supabase.from('ventas').select('*').eq('id_venta', id_venta);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_venta} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las ventas.",
      error: error.message,
    });
  }
};

export const registrarVenta = async (req, res) => {
  try {
    const { id_cliente, id_empleado, fecha_venta, total_venta} = req.body;
    const { data, error } = await supabase.from('ventas').insert([{
      id_cliente,
      id_empleado,
      fecha_venta,
      total_venta
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_venta: data[0].id_venta });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la venta.",
      error: error.message,
    });
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const { error } = await supabase.from('ventas').delete().eq('id_venta', id_venta);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la venta.',
      error: error.message
    });
  }
};

export const actualizarVentaPatch = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('ventas').update(datos).eq('id_venta', id_venta);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Venta con ID ${id_venta} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la venta.",
      error: error.message,
    });
  }
};