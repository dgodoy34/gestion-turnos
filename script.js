let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];

function actualizarLocalStorage() {
    try {
        localStorage.setItem('turnos', JSON.stringify(turnos));
        localStorage.setItem('historial', JSON.stringify(historial));
    } catch (e) {
        console.error('Error al actualizar localStorage:', e);
    }
}

function mostrarTurnos() {
    const listaTurnos = document.getElementById('lista-turnos');
    listaTurnos.innerHTML = '';
    turnos.forEach((turno, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            <span>${turno.nombre} ${turno.apellido} - ${turno.fecha} ${turno.hora} - Notas: ${turno.notas}</span>
            <button class="btn btn-danger btn-sm eliminar-turno" data-index="${index}">Eliminar</button>
        `;
        listaTurnos.appendChild(li);
    });

    document.querySelectorAll('.eliminar-turno').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const turnoEliminado = turnos.splice(index, 1)[0];
            historial.push(turnoEliminado);
            actualizarLocalStorage();
            mostrarTurnos();
            mostrarHistorial();
        });
    });
}

function mostrarHistorial() {
    const listaHistorial = document.getElementById('lista-historial');
    listaHistorial.innerHTML = '';
    historial.forEach(turno => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${turno.nombre} ${turno.apellido} - ${turno.fecha} ${turno.hora} - Notas: ${turno.notas}`;
        listaHistorial.appendChild(li);
    });
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('notas').value = '';
}

document.getElementById('solicitar').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const notas = document.getElementById('notas').value;

    if (nombre && apellido && fecha && hora) {
        const turno = { nombre, apellido, telefono, email, fecha, hora, notas };
        turnos.push(turno);
        actualizarLocalStorage();
        mostrarTurnos();
        limpiarFormulario();

        document.getElementById('turnoModalMensaje').textContent = `Turno para ${nombre} ${apellido} el ${fecha} a las ${hora} solicitado con éxito. Notas: ${notas}`;
        $('#turnoModal').modal('show');
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

document.getElementById('borrar-historial').addEventListener('click', function() {
    historial = [];
    actualizarLocalStorage();
    mostrarHistorial();
});

mostrarTurnos();
mostrarHistorial();