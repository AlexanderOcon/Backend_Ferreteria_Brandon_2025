import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los usuarios.",
      error: error.message,
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const { data, error } = await supabase.from('usuarios').select('*').eq('id_usuario', id_usuario);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_usuario} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los usuarios.",
      error: error.message,
    });
  }
};

export const registrarUsuarios = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const { data, error } = await supabase.from('usuarios').insert([{
      usuario,
      contraseña
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_usuario: data[0].id_usuario });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el usuario.",
      error: error.message,
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const { error } = await supabase.from('usuarios').delete().eq('id_usuario', id_usuario);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el usuario.',
      error: error.message
    });
  }
};

export const actualizarUsuarioPatch = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('usuarios').update(datos).eq('id_usuario', id_usuario);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Usuario con ID ${id_usuario} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el usuario.",
      error: error.message,
    });
  }
};