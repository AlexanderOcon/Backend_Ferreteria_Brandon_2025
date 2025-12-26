import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerProductos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los productos.",
      error: error.message,
    });
  }
};


export const obtenerProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const { data, error } = await supabase.from('productos').select('*').eq('id_producto', id_producto);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_producto} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos del producto.",
      error: error.message,
    });
  }
};

export const registrarProductos = async (req, res) => {
  try {
    const { nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen} = req.body;
    const { data, error } = await supabase.from('productos').insert([{
      nombre_producto,
      descripcion_producto,
      id_categoria,
      precio_unitario,
      stock,
      imagen
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_producto: data[0].id_producto });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el producto.",
      error: error.message,
    });
  }
};


export const eliminarProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const { error } = await supabase.from('productos').delete().eq('id_producto', id_producto);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error.message
    });
  }
};

export const actualizarProductoPatch = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('productos').update(datos).eq('id_producto', id_producto);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Producto con ID ${id_producto} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el producto.",
      error: error.message,
    });
  }
};