/* global fetch, persona, emp */

function insertarEmpleado() {
    let ruta = "http://localhost:8080/ModuloEmpleado/api/empleado/insertEmpleado";

    let persona = {
        nombre: document.getElementById("txtNombre").value,
        apellidoPaterno: document.getElementById("txtApellidoP").value,
        apellidoMaterno: document.getElementById("txtApellidoM").value,
        genero: document.getElementById("txtGenero").value,
        fechaNacimiento: document.getElementById("txtFechaNacimiento").value,
        rfc: document.getElementById("txtRFC").value,
        curp: document.getElementById("txtCURP").value,
        domicilio: document.getElementById("txtDomicilio").value,
        codigoPostal: document.getElementById("txtCodigoPostal").value,
        ciudad: document.getElementById("txtCiudad").value,
        estado: document.getElementById("txtEstado").value,
        telefono: document.getElementById("txtTelefono").value,
        foto: document.getElementById("txtFoto").value
    };

    let empleado = {
        idSucursal: document.getElementById("txtidSucursal").value,
        rol: document.getElementById("txtRol").value,
        puesto: document.getElementById("txtPuesto").value,
        salarioBruto: parseFloat(document.getElementById("txtSalarioBruto").value)
    };

    persona.empleado = empleado;

    let params = { datosEmpleado: JSON.stringify(empleado) };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
        .then(function (data) {
            if (!data.ok) {
                throw new Error('Error en la solicitud al servidor');
            }
            return data.json();
        })
        .then(function (json) {
            console.log(json);

            mostrarEnTabla(json);

        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    
    clean();
}

let empleadoSeleccionadoId = null;
function cargarDatosEdicion(empleado) {
    // Obtener referencias a los elementos del formulario
    const idPersonaInput = document.getElementById('txtIdPersona');
    const nombreInput = document.getElementById('txtNombre');
    const apellidoPaternoInput = document.getElementById('txtApellidoP');
    const apellidoMaternoInput = document.getElementById('txtApellidoM');
    const generoInput = document.getElementById('txtGenero');
    const fechaNacimientoInput = document.getElementById('txtFechaNacimiento');  
    const rfcInput = document.getElementById('txtRFC');
    const curpInput = document.getElementById('txtCURP');
    const domicilioInput = document.getElementById('txtDomicilio');
    const codigoPostalInput = document.getElementById('txtCodigoPostal');
    const ciudadInput = document.getElementById('txtCiudad');
    const estadoInput = document.getElementById('txtEstado');
    const telefonoInput = document.getElementById('txtTelefono');
    const fotoInput = document.getElementById('txtFoto');
    const idSucursalInput = document.getElementById('txtidSucursal');
    const rolInput = document.getElementById('txtRol');
    const puestoInput = document.getElementById('txtPuesto');
    const salarioBrutoInput = document.getElementById('txtSalarioBruto');

    // Cargar los datos del empleado en el formulario
    idPersonaInput.value = empleado.idPersona;
    nombreInput.value = empleado.persona.nombre;
    apellidoPaternoInput.value = empleado.persona.apellidoPaterno;
    apellidoMaternoInput.value = empleado.persona.apellidoMaterno;
    generoInput.value = empleado.persona.genero;
    fechaNacimientoInput.value = empleado.persona.fechaNacimiento;
    rfcInput.value = empleado.persona.rfc;
    curpInput.value = empleado.persona.curp;
    domicilioInput.value = empleado.persona.domicilio;
    codigoPostalInput.value = empleado.persona.codigoPostal;
    ciudadInput.value = empleado.persona.ciudad;
    estadoInput.value = empleado.persona.estado;
    telefonoInput.value = empleado.persona.telefono;
    fotoInput.value = empleado.persona.foto;
    idSucursalInput.value = empleado.idSucursal;
    rolInput.value = empleado.rol;
    puestoInput.value = empleado.puesto;
    salarioBrutoInput.value = empleado.salarioBruto;

    empleadoSeleccionadoId = empleado.idPersona;
}

function editarEmpleado() {
    if (empleadoSeleccionadoId) {
        const idEmpleado = empleadoSeleccionadoId;

        const v_nombre = document.getElementById("txtNombre").value;
        const v_apellidoPaterno = document.getElementById("txtApellidoP").value;
        const v_apellidoMaterno = document.getElementById("txtApellidoM").value;
        const v_genero = document.getElementById("txtGenero").value;
        const v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
        const v_rfc = document.getElementById("txtRFC").value;
        const v_curp = document.getElementById("txtCURP").value;
        const v_domicilio = document.getElementById("txtDomicilio").value;
        const v_codigoPostal = document.getElementById("txtCodigoPostal").value;
        const v_ciudad = document.getElementById("txtCiudad").value;
        const v_estado = document.getElementById("txtEstado").value;
        const v_telefono = document.getElementById("txtTelefono").value;
        const v_foto = document.getElementById("txtFoto").value;

        const v_idSucursal = document.getElementById("txtidSucursal").value;
        const v_rol = document.getElementById("txtRol").value;
        const v_puesto = document.getElementById("txtPuesto").value;
        const v_salarioBruto = parseFloat(document.getElementById("txtSalarioBruto").value);

        const empleadoActualizado = {
            idPersona: idEmpleado,
            nombre: v_nombre,
            apellidoPaterno: v_apellidoPaterno,
            apellidoMaterno: v_apellidoMaterno,
            genero: v_genero,
            fechaNacimiento: v_fechaNacimiento,
            rfc: v_rfc,
            curp: v_curp,
            domicilio: v_domicilio,
            codigoPostal: v_codigoPostal,
            ciudad: v_ciudad,
            estado: v_estado,
            telefono: v_telefono,
            foto: v_foto,

            idSucursal: v_idSucursal,
            rol: v_rol,
            puesto: v_puesto,
            salarioBruto: v_salarioBruto
        };

        actualizarEmpleado(empleadoActualizado);
    } else {
        alert('Por favor, selecciona un empleado antes de editar.');
    }
}

function editarEmpleado(empleado) {
    const ruta = "http://localhost:8080/ModuloEmpleado/api/empleado/update";
    
    const params = new URLSearchParams();
    params.append('datosEmpleado', JSON.stringify(empleado));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    };

    fetch(ruta, requestOptions)
        .then(function (data) {
            return data.json();
        })
        .then(function (json) {
            mostrarEnTabla(json);
        })
        .catch(function (error) {
            alert(error.message);
        });
}


function mostrarEnTabla(empleado) {
    let tableBody = document.getElementById("employee-table");
    let newRow = tableBody.insertRow();

    let cellId = newRow.insertCell(0);
    let cellNombre = newRow.insertCell(1);
    let cellApellidoPaterno = newRow.insertCell(2);
    let cellTelefono = newRow.insertCell(3);
    let cellActivo = newRow.insertCell(4);

    if (empleado && empleado.persona) {
        cellId.innerHTML = empleado.idPersona;
        cellNombre.innerHTML = empleado.persona.nombre;
        cellApellidoPaterno.innerHTML = empleado.persona.apellidoPaterno;
        cellTelefono.innerHTML = empleado.persona.telefono;
        cellActivo.innerHTML = empleado.activo === 1 ? 'Activo' : 'Inactivo';

        newRow.onclick = function() {
            cargarDatosEdicion(empleado);
            empleadoSeleccionado = empleado.idPersona;
        };
    } else {
        // location.reload();
    }
}


function clean(){
    document.getElementById("txtNombre").value="",
    document.getElementById("txtApellidoP").value="",
    document.getElementById("txtApellidoM").value="",
    document.getElementById("txtGenero").value="",
    document.getElementById("txtFechaNacimiento").value="",
    document.getElementById("txtRFC").value="",
    document.getElementById("txtCURP").value="",
    document.getElementById("txtDomicilio").value="",
    document.getElementById("txtCodigoPostal").value="",
    document.getElementById("txtCiudad").value="",
    document.getElementById("txtEstado").value="",
    document.getElementById("txtTelefono").value="",
    document.getElementById("txtFoto").value="",
    document.getElementById("txtidSucursal").value="",
    document.getElementById("txtRol").value="",
    document.getElementById("txtPuesto").value="",
    document.getElementById("txtSalarioBruto").value="";
}

function mostrarTodosLosEmpleados() {
    fetch('http://localhost:8080/ModuloEmpleado/api/empleado/getAllEmpleados')
         .then(response => response.json())
         .then(data => {
             data.forEach(empleado => mostrarEnTabla(empleado));
         })
         .catch(error => console.error('Error:', error));
}

function actualizarEmpleado(){
    let ruta = "http://localhost:8080/ModuloEmpleado/api/empleado/update";

    let persona = {
        nombre: document.getElementById("txtNombre").value,
        apellidoPaterno: document.getElementById("txtApellidoP").value,
        apellidoMaterno: document.getElementById("txtApellidoM").value,
        genero: document.getElementById("txtGenero").value,
        fechaNacimiento: document.getElementById("txtFechaNacimiento").value,
        rfc: document.getElementById("txtRFC").value,
        curp: document.getElementById("txtCURP").value,
        domicilio: document.getElementById("txtDomicilio").value,
        codigoPostal: document.getElementById("txtCodigoPostal").value,
        ciudad: document.getElementById("txtCiudad").value,
        estado: document.getElementById("txtEstado").value,
        telefono: document.getElementById("txtTelefono").value,
        foto: document.getElementById("txtFoto").value
    };

    let empleado = {
        idSucursal: document.getElementById("txtidSucursal").value,
        rol: document.getElementById("txtRol").value,
        puesto: document.getElementById("txtPuesto").value,
        salarioBruto: parseFloat(document.getElementById("txtSalarioBruto").value)
    };

    persona.empleado = empleado;

    let params = { datosEmpleado: JSON.stringify(persona) };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
        .then(function (data) {
            if (!data.ok) {
                throw new Error('Error en la solicitud al servidor');
            }
            return data.json();
        })
        .then(function (json) {
            console.log(json);

            mostrarEnTabla(json);

        })
        .catch(function (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud.');
        });
    
    clean();
}

mostrarTodosLosEmpleados();