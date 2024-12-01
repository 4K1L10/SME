import React from 'react';
import '../styles/Dashboard.css';

const SupportAndPrivacy = () => {
  return (
    <div className="white-box">
      <h1>Contacta con el Soporte</h1>
      <p>Si tienes problemas o dudas sobre el uso de la plataforma, puedes contactarnos mediante las siguientes opciones:</p>
      <ul>
        <li><strong>Correo electrónico:</strong> soporte@monitoreoenergia.com</li>
        <li><strong>Teléfono:</strong> +123 456 789</li>
        <li><strong>Formulario de contacto:</strong> Visita nuestra página de contacto en <a href="http://www.monitoreoenergia.com/contacto">www.monitoreoenergia.com/contacto</a></li>
      </ul>
      <h2>Ayuda y Términos de Privacidad</h2>
      <p>Para obtener más ayuda o leer los términos de privacidad de nuestra plataforma:</p>
      <ul>
        <li><strong>Ayuda:</strong> Visita nuestra página de <a href="http://www.monitoreoenergia.com/ayuda">Ayuda</a>.</li>
        <li><strong>Términos de Privacidad:</strong> Consulta nuestros <a href="http://www.monitoreoenergia.com/terminos">Términos de Privacidad</a>.</li>
      </ul>
    </div>
  );
};

export default SupportAndPrivacy;
    