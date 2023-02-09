(function () {
  /* ---------------------------------------------*/
  /*         variables y objetos generales         */
  /* ---------------------------------------------*/

  let app = document.getElementById('app');
  let input_caracter = document.getElementById('numero-caracteres');
   
  let config = {
    caracteres: parseInt(input_caracter.value),
    simbolos: true,
    numeros: true,
    mayusculas: true,
    minusculas: true,
  }

  
  let caracteres = {
    numeros: '0 1 2 3 4 5 6 7 8 9',
    simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
    mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
  }

  /* -------------------------------------------------------------------------- */
  /*                                   eventos                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------ evento para evitar submit ----------------------- */

  app.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  /* ------------- evento para incrementar el valor de caracteres ------------- */

  app.elements.namedItem('btn-mas-uno').addEventListener('click', () => {
    config.caracteres++;
    input_caracter.value = config.caracteres
  })

  /* ------------- evento para descrementar el valor de caracteres ------------- */

  app.elements.namedItem('btn-menos-uno').addEventListener('click', () => {
    if (config.caracteres > 4) {
      config.caracteres--;
      input_caracter.value = config.caracteres
    }
  })

  app.elements.namedItem('btn-generar').addEventListener('click', function (e) {
    generarPassword()
  })

  app.elements.namedItem('input-password').addEventListener('click', function (e) {
    copiarPassword()
  })

  /* ------------- eventos para cambiar el estados de los botones ------------- */

  app.elements.namedItem('btn-simbolos').addEventListener('click', function() { btnToggle(this), config.simbolos = !config.simbolos})
  app.elements.namedItem('btn-numeros').addEventListener('click', function() { btnToggle(this),config.numeros = !config.numeros})
  app.elements.namedItem('btn-mayusculas').addEventListener('click', function() { btnToggle(this), config.mayusculas = !config.mayusculas})

  /* -------------------------------------------------------------------------- */
  /*                                  funciones                                 */
  /* -------------------------------------------------------------------------- */

  function btnToggle(elemento) {
    elemento.classList.toggle('false');
    elemento.childNodes[0].classList.toggle('fa-check')
    elemento.childNodes[0].classList.toggle('fa-times')
  }

  /* ---------------------------Funcion generar contraseña --------------------------- */
  function generarPassword() {
    let caracteresFinales = '';
    let password = '';

    for (propiedad in config){

        if (config[propiedad] == true) {
          caracteresFinales += caracteres[propiedad] + ' '
        
        }
    }
    caracteresFinales = caracteresFinales.trim();
    caracteresFinales = caracteresFinales.split(' ');

    for (let i = 0; i < config.caracteres; i++) {
      password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]

    }
    
    app.elements.namedItem('input-password').value = password;
  }
  function copiarPassword() {
    app.elements.namedItem('input-password').select();
    document.execCommand('copy');

    document.getElementById('alerta-copiado').classList.add('active')


    setTimeout(function () {
    document.getElementById('alerta-copiado').classList.remove('active')
      
    }, 1500)
   }
  generarPassword()
}())