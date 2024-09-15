function logar(){
    var Login = document.getElementById('login').value;
    var Senha = document.getElementById('senha').value;

    if(Login == 'admin' && Senha == 'admin123') {
        location.href = "https://a8ab-45-166-34-57.ngrok-free.app";
    }
    else{
        alert('Usúario ou senha inválido!')
    }
}