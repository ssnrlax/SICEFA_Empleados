package org.utl.dsm404.controller;
import java.sql.CallableStatement;
import java.sql.SQLException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.utl.dsm404.bd.ConnectionMysql;
import org.utl.dsm404.model.Empleado;
import org.utl.dsm404.model.Persona;


public class ControladorEmpleado {
    public Persona agregarEmpleado(Persona p) {
    Empleado emp = new Empleado();
        String query = "{call insertarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
    try {
        ConnectionMysql connMysql = new ConnectionMysql();
        Connection conn = connMysql.open();
        java.sql.CallableStatement pstm = conn.prepareCall(query);

        pstm.setString(1, p.getNombre());
        pstm.setString(2, p.getApellidoPaterno());
        pstm.setString(3, p.getApellidoMaterno());
        pstm.setString(4, p.getGenero());

        // Convertir la fecha de nacimiento a java.sql.Date
        if (p.getFechaNacimiento() != null) {
            pstm.setDate(5, new java.sql.Date(p.getFechaNacimiento().getTime()));
        } else {
            pstm.setNull(5, Types.DATE);
        }

        pstm.setString(6, p.getRfc());
        pstm.setString(7, p.getCurp());
        
        pstm.setString(8, p.getDomicilio());
        pstm.setString(9, p.getCodigoPostal());
        pstm.setString(10, p.getCiudad());
        pstm.setString(11, p.getEstado());
        pstm.setString(12, p.getTelefono());
        pstm.setString(13, p.getFoto());
        // Cliente
        pstm.setInt(14, p.getEmpleado().getIdSucursal());
        pstm.setString (15, p.getEmpleado().getRol());
        pstm.setString(16, p.getEmpleado().getPuesto());
        pstm.setFloat(17, p.getEmpleado().getSalarioBruto());
        pstm.registerOutParameter(18, java.sql.Types.INTEGER);
        pstm.registerOutParameter(19, java.sql.Types.INTEGER);
        pstm.registerOutParameter(20, java.sql.Types.INTEGER);
        pstm.registerOutParameter(21, java.sql.Types.VARCHAR);
        // Ejecutar el procedimiento almacenado
        pstm.execute();
        
        // Almacenar los datos OUT del Procedure
        p.setIdPersona(pstm.getInt(18));
        
        pstm.close();
        connMysql.close();
    } catch (SQLException e) {
    }
    return p;
}
    
    public List<Empleado> getAll() {
        List<Empleado> empleados = new ArrayList<>();

        String query = "SELECT * FROM EmpleadoPersonaView";
        try {
            ConnectionMysql connMysql = new ConnectionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            while (rs.next()) {
                Empleado emp = new Empleado();
                Persona persona = new Persona();

                // Set Empleado fields
                emp.setCodigoEmpleado(rs.getString("codigo"));
                emp.setFechaIngreso(rs.getDate("fechaIngreso"));
                emp.setPuesto(rs.getString("puesto"));
                emp.setSalarioBruto(rs.getFloat("salarioBruto"));
                emp.setActivo(rs.getInt("activo"));
                emp.setIdPersona(rs.getInt("idPersona"));
                emp.setIdUsuario(rs.getInt("idUsuario"));
                emp.setIdSucursal(rs.getInt("idSucursal"));

                // Set Persona fields
                persona.setIdPersona(rs.getInt("idPersona"));
                persona.setNombre(rs.getString("nombre"));
                persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
                persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
                persona.setGenero(rs.getString("genero"));
                persona.setFechaNacimiento(rs.getDate("fechaNacimiento"));
                persona.setRfc(rs.getString("rfc"));
                persona.setCurp(rs.getString("curp"));
                persona.setDomicilio(rs.getString("domicilio"));
                persona.setCodigoPostal(rs.getString("codigoPostal"));
                persona.setCiudad(rs.getString("ciudad"));
                persona.setEstado(rs.getString("estado"));
                persona.setTelefono(rs.getString("telefono"));
                persona.setFoto(rs.getString("foto"));

                // Set Persona in Empleado
                emp.setPersona(persona);

                // Add Empleado to the list
                empleados.add(emp);
            }


            rs.close();
            pstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return empleados;
    }
    
public Persona actualizarEmpleado(Persona p) {
    String query = "{call actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
    
    try {
        ConnectionMysql connMysql = new ConnectionMysql(); 
         Connection conn = connMysql.open(); 
         CallableStatement cstmt = conn.prepareCall(query);

        // Parámetros de entrada para la Persona
        cstmt.setInt(1, p.getIdPersona());
        cstmt.setString(2, p.getNombre());
        cstmt.setString(3, p.getApellidoPaterno());
        cstmt.setString(4, p.getApellidoMaterno());
        cstmt.setString(5, p.getGenero());

        // Convertir la fecha de nacimiento a java.sql.Date
        if (p.getFechaNacimiento() != null) {
            cstmt.setDate(6, new java.sql.Date(p.getFechaNacimiento().getTime()));
        } else {
            cstmt.setNull(6, Types.DATE);
        }

        cstmt.setString(7, p.getRfc());
        cstmt.setString(8, p.getCurp());
        cstmt.setString(9, p.getDomicilio());
        cstmt.setString(10, p.getCodigoPostal());
        cstmt.setString(11, p.getCiudad());
        cstmt.setString(12, p.getEstado());
        cstmt.setString(13, p.getTelefono());
        cstmt.setString(14, p.getFoto());

        // Parámetros de entrada para el Empleado
        cstmt.setString(15, p.getEmpleado().getRol());
        cstmt.setInt(16, p.getEmpleado().getIdEmpleado());
        cstmt.setString(17, p.getEmpleado().getPuesto());
        cstmt.setFloat(18, p.getEmpleado().getSalarioBruto());

        // Parámetros de salida
        cstmt.registerOutParameter(19, java.sql.Types.INTEGER);
        cstmt.registerOutParameter(20, java.sql.Types.INTEGER);
        cstmt.registerOutParameter(21, java.sql.Types.VARCHAR);

        // Ejecutar el procedimiento almacenado
        cstmt.execute();

        // Obtener los resultados de los parámetros de salida
        // Obtener los resultados de los parámetros de salida
    int parametroSalida1 = cstmt.getInt(19);
    int parametroSalida2 = cstmt.getInt(20);
    String parametroSalida3 = cstmt.getString(21);


        cstmt.close();
        connMysql.close();
    } catch (SQLException e) {
        // Manejar la excepción (mostrar un mensaje de error, registrar en un archivo de registro, etc.)
        e.printStackTrace();
    }
        return p;
    }

   
}
