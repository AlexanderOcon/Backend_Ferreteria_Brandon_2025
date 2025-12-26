import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const { data, error } = await supabase.from('categorias').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los Categorias.",
      error: error.message,
    });
  }
};

// Obtener una categoría por su ID
export const obtenerCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;
    const { data, error } = await supabase.from('categorias').select('*').eq('id_categoria', id_categoria);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_categoria} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las categorias.",
      error: error.message,
    });
  }
};

// Registrar una nueva Categoría
export const registrarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;
    const { data, error } = await supabase.from('categorias').insert([{
      nombre_categoria,
      descripcion_categoria
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_categoria: data[0].id_categoria });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la categoría.",
      error: error.message,
    });
  }
};

// Eliminar una categoría por su ID
export const eliminarCategoria = async (req, res) => {
  try {
    const id_categoria = req.params.id_categoria;
    const { error } = await supabase.from('categorias').delete().eq('id_categoria', id_categoria);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error.message
    });
  }
};

// Controlador para actualizar parcialmente una categoría por su ID
export const actualizarCategoriaPatch = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('categorias').update(datos).eq('id_categoria', id_categoria);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Categoría con ID ${id_categoria} actualizada.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la categoría.",
      error: error.message,
    });
  }
};

