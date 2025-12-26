import { supabase } from "../../supabase_client.js";
// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('clientes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los clientes.",
      error: error.message,
    });
  }
};

export const obtenerCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const { data, error } = await supabase.from('clientes').select('*').eq('id_cliente', id_cliente);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_cliente} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los clientes.",
      error: error.message,
    });
  }
};


export const registrarCliente = async (req, res) => {
  try {
    const { primer_nombre, segundo_nombre,primer_apellido, segundo_apellido, celular, direccion, cedula } = req.body;
    const { data, error } = await supabase.from('clientes').insert([{
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      celular,
      direccion,
      cedula
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_cliente: data[0].id_cliente });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el cliente.",
      error: error.message,
    });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const { error } = await supabase.from('clientes').delete().eq('id_cliente', id_cliente);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error.message
    });
  }
};

// Controlador para actualizar parcialmente una categoría por su ID
export const actualizarClientePatch = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('clientes').update(datos).eq('id_cliente', id_cliente);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Cliente con ID ${id_cliente} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el cliente.",
      error: error.message,
    });
  }
};