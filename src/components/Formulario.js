import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualiarError ] =useState(false)

    //funcion que s eejecuta cada que el usaurio escribe en un input
    const actualizarState = e => { //extrae lo que el usuario escribe
       //console.log(e.target.name); //que campo estamos escribiendo
       //console.log(e.target.value); //el valor que se esta escribiendo
        actualizarCita({ //modifica cita
            ...cita, //objeto o arreglo que vamos a copiar
            [e.target.name]: e.target.value 
        }) 
    }

    //extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} =cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        //alert('Enviando')
        e.preventDefault(); //prevenir la accion por default

        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === ''){ //si agrega espacios en blanco, los va a eliminar
            actualiarError(true);
            //alert('Por favor llena todos los campos');
            return; //par que se corte el codigo
        }

        //Eliminar el mensaje previo de error
        actualiarError(false);

        //Asignar un ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);


        //Reiniciar el form

        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return (  
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> 
            : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width" //Tome todo el espacio disponible
                    placeholder="Nombre Mascota"
                    onChange={actualizarState} //lee los caracteres que se esta copiando en el input, se va a estar actualizando
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width" //Tome todo el espacio disponible
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width" //Tome todo el espacio disponible
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width" //Tome todo el espacio disponible
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                  
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes ={
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;