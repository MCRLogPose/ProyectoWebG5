function mostrarTexto() {
    setTimeout(function() {
        document.querySelector('h4.texto0').classList.add('show');
    }, 500); 
    setTimeout(function() {
        document.querySelector('h1.texto').classList.add('show');
    }, 1000); 
    setTimeout(function() {
        document.querySelector('p.texto1').classList.add('show');
    }, 1500); 
}