function validar_usuarios(){
    usu=document.form1.usuario.value
    pass=document.form1.password.value
    email=document.form1.email.value
    if(usu=='' ||  pass=='' || email==''){
        alert('Es obligatorio rellenar todos los campos')
        document.form1.usuario.focus()
        document.form1.usuario.value=''
        document.form1.email.value=''
        document.form1.password.value=''
    }else{
        switch(usu){
            case 'miguel':
                if(pass=='java'){
                    alert('Bienvenido Sr.' +usu)
                    location='index.html'
                }else{
                    alert('La contraseña es incorrecta')
                    document.form1.password.select()
                    document.form1.password.focus()
                }
                break
            case 'cesar':
                if(pass=='flores'){
                    alert('Bienvenido '+usu)
                    location='index.html'
                }else{
                    alert('La contraseña es incorrecta')
                    document.form1.password.select()
                }
                break
            case 'admin':
                if(pass=='utp'){
                    alert('Bienvenido '+usu)
                    location='index.html'
                }else{
                    alert('La contraseña es incorrecta')
                    document.form1.password.select()
                }
                break
            default:
                alert('Su usuario no se encuentra registrado en la página')
                document.form1.usuario.focus()
                document.form1.usuario.value=''
                document.form1.email.value=''
                document.form1.password.value=''
        }

    }
}