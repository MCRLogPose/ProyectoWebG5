function mensaje(){
    usu=document.form2.usuario.value
    com=document.form2.comentarios.value
    email=document.form2.email.value
    if(usu=='' ||  com=='' || email==''){
        alert('Es obligatorio rellenar todos los campos')
        document.form2.usuario.focus()
        document.form2.usuario.value=''
        document.form2.email.value=''
        document.form2.comentarios.value=''
    }else{
        (usu && com && email)
        alert('Tu mensaje fue enviado con éxito '+usu)
        document.form2.usuario.value=''
        document.form2.email.value=''
        document.form2.comentarios.value=''
    }
}