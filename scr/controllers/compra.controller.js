import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerCompras = async (req, res) => {
  try {
    const { data, error } = await supabase.from('compras').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer las compras.",
      error: error.message,
    });
  }
};

export const obtenerCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const { data, error } = await supabase.from('compras').select('*').eq('id_compra', id_compra);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_compra} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las compras.",
      error: error.message,
    });
  }
};

export const registrarCompra = async (req, res) => {
  try {
    const { id_empleado, fecha_compra, total_compra } = req.body;
    const { data, error } = await supabase.from('compras').insert([{
      id_empleado,
      fecha_compra,
      total_compra
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_compra: data[0].id_compra });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la compra.",
      error: error.message,
    });
  }
};

export const eliminarCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const { error } = await supabase.from('compras').delete().eq('id_compra', id_compra);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la compra.',
      error: error.message
    });
  }
};

// Controlador para actualizar parcialmente una categoría por su ID
export const actualizarCompraPatch = async (req, res) => {
  try {
    const { id_compra } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('compras').update(datos).eq('id_compra', id_compra);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Compra con ID ${id_compra} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la compra.",
      error: error.message,
    });
  }
};