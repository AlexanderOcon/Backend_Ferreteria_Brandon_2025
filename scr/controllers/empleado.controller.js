import { supabase } from "../../supabase_client.js";
// Obtener todas las categorías
export const obtenerEmpleados = async (req, res) => {
  try {
    const { data, error } = await supabase.from('empleados').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los empleados.",
      error: error.message,
    });
  }
};

export const obtenerempleado = async (req, res) => {
  try {
    const id_empleado = req.params.id_empleado;
    const { data, error } = await supabase.from('empleados').select('*').eq('id_empleado', id_empleado);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_empleado} no encontrado.`,
      });
    }
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de los empleados.",
      error: error.message,
    });
  }
};

export const registrarEmpelado = async (req, res) => {
  try {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion} = req.body;
    const { data, error } = await supabase.from('empleados').insert([{
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      celular,
      cargo,
      fecha_contratacion
    }]).select();
    if (error) throw error;
    res.status(201).json({ id_empleado: data[0].id_empleado });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar el empleado.",
      error: error.message,
    });
  }
};

export const eliminarEmpleado = async (req, res) => {
  try {
    const id_empleado = req.params.id_empleado;
    const { error } = await supabase.from('empleados').delete().eq('id_empleado', id_empleado);
    if (error) throw error;

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el empleado.',
      error: error.message
    });
  }
};

export const actualizarEmpleadoPatch = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const datos = req.body;

    const { error } = await supabase.from('empleados').update(datos).eq('id_empleado', id_empleado);
    if (error) throw error;

    res.status(200).json({
      mensaje: `Empleado con ID ${id_empleado} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el empleado.",
      error: error.message,
    });
  }
};