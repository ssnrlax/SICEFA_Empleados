
package org.utl.dsm404.rest;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm404.controller.ControladorEmpleado;
import org.utl.dsm404.model.Empleado;
import org.utl.dsm404.model.Persona;

@Path("empleado")
public class RestEmpleado extends Application{
 @Path("insertEmpleado")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEmpleado(
            @FormParam("datosEmpleado") @DefaultValue("") String empleado
    ){
        System.out.println(empleado);
        Gson gson = new Gson();
        ControladorEmpleado cp = new ControladorEmpleado();
        Persona p = gson.fromJson(empleado, Persona.class);
        
        cp.agregarEmpleado(p);
        
        String out = gson.toJson(p);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
    @Path("getAllEmpleados")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmpleados() {
        try {
            ControladorEmpleado controladorEmpleado = new ControladorEmpleado();
            List<Empleado> empleados = controladorEmpleado.getAll();

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(empleados);

            return Response.status(Response.Status.OK).entity(jsonResponse).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al procesar la solicitud de empleados").build();
        }
    }
    
    @Path("update")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEmpleado(@FormParam("datosEmpleado") @DefaultValue("{}") String empleado) {
    Gson gson = new Gson();
    ControladorEmpleado cp = new ControladorEmpleado();
    Persona p = gson.fromJson(empleado, Persona.class);

    try {
        Persona resultado = cp.actualizarEmpleado(p);

        if (resultado != null) {
            // Si la actualización fue exitosa, devolver el resultado en formato JSON
            String resultadoJson = gson.toJson(resultado);
            return Response.ok(resultadoJson, MediaType.APPLICATION_JSON).build();
        } else {
            // Si el resultado es null, algo salió mal en la actualización
            // Devolver una respuesta con código de error y un mensaje adecuado
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al actualizar el empleado").build();
        }
    } catch (Exception ex) {
        // Manejar la excepción adecuadamente, por ejemplo, loguearla
        ex.printStackTrace();
        
        // Devolver una respuesta con código de error y un mensaje adecuado
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error en el servidor al procesar la solicitud").build();
    }
    }
}