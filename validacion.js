"use strict";

function mostrarError(campoId, mensaje){

const campo = document.querySelector(`#${campoId}`);
const span = document.querySelector(`#error-${campoId}`);

campo.classList.add("invalido");
campo.classList.remove("valido");

span.textContent = mensaje;
span.classList.add("visible");

}

function limpiarError(campoId){

const campo = document.querySelector(`#${campoId}`);
const span = document.querySelector(`#error-${campoId}`);

campo.classList.remove("invalido");
campo.classList.add("valido");

span.textContent = "";
span.classList.remove("visible");

}

function limpiarTodo(){

["nombre","email","password","confirmar","telefono"]
.forEach(id => limpiarError(id));

}

function validarNombre(){

const campo = document.querySelector("#nombre");

if(campo.validity.valueMissing){
mostrarError("nombre","El nombre es obligatorio");
return false;
}

if(campo.validity.tooShort){
mostrarError("nombre","Debe tener al menos 3 caracteres");
return false;
}

limpiarError("nombre");
return true;

}

function validarEmail(){

const campo = document.querySelector("#email");

if(campo.validity.valueMissing){
mostrarError("email","El correo es obligatorio");
return false;
}

if(campo.validity.typeMismatch){
mostrarError("email","Formato de correo inválido");
return false;
}

limpiarError("email");
return true;

}

function validarPassword(){

const campo = document.querySelector("#password");

if(campo.validity.valueMissing){
mostrarError("password","La contraseña es obligatoria");
return false;
}

if(campo.validity.tooShort){
mostrarError("password","Debe tener mínimo 8 caracteres");
return false;
}

const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

if(!regex.test(campo.value)){
mostrarError("password","Debe tener una mayúscula y un número");
return false;
}

limpiarError("password");
return true;

}

function validarConfirmar(){

const pass = document.querySelector("#password").value;
const confirmar = document.querySelector("#confirmar").value;

if(!confirmar){
mostrarError("confirmar","Debe confirmar la contraseña");
return false;
}

if(pass !== confirmar){
mostrarError("confirmar","Las contraseñas no coinciden");
return false;
}

limpiarError("confirmar");
return true;

}

function validarTelefono(){

const campo = document.querySelector("#telefono");

if(!campo.value.trim()){
limpiarError("telefono");
return true;
}

if(campo.validity.patternMismatch){
mostrarError("telefono","Solo números (7-15 dígitos)");
return false;
}

limpiarError("telefono");
return true;

}

document.querySelector("#nombre")
.addEventListener("blur", validarNombre);

document.querySelector("#email")
.addEventListener("blur", validarEmail);

document.querySelector("#password")
.addEventListener("blur", validarPassword);

document.querySelector("#confirmar")
.addEventListener("blur", validarConfirmar);

document.querySelector("#telefono")
.addEventListener("blur", validarTelefono);

document.querySelector("#confirmar")
.addEventListener("input",()=>{
if(document.querySelector("#confirmar").value)
limpiarError("confirmar");
});

const form = document.querySelector("#form-registro");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const resultados = [
validarNombre(),
validarEmail(),
validarPassword(),
validarConfirmar(),
validarTelefono()
];

const todoValido = resultados.every(r => r === true);

if(todoValido){

const mensajeExito = document.querySelector("#mensaje-exito");

mensajeExito.classList.remove("oculto");
mensajeExito.classList.add("visible");

setTimeout(()=>{
form.reset();
limpiarTodo();
mensajeExito.classList.remove("visible");
mensajeExito.classList.add("oculto");
},2000);

}else{

const primerError = form.querySelector(".invalido");

if(primerError) primerError.focus();

}

});

function evaluarFortaleza(valor){

let puntos = 0;

if(valor.length >= 8) puntos++;
if(/[A-Z]/.test(valor)) puntos++;
if(/[0-9]/.test(valor)) puntos++;
if(/[^A-Za-z0-9]/.test(valor)) puntos++;

const niveles = ["","Débil","Regular","Buena","Fuerte"];
const colores = ["","#c62828","#f57f17","#1565c0","#2e7d32"];

return {nivel:niveles[puntos], color:colores[puntos], puntos};

}

const campoPassword = document.querySelector("#password");

campoPassword.addEventListener("input",()=>{

const {nivel,color,puntos} = evaluarFortaleza(campoPassword.value);

let indicador = document.querySelector("#fortaleza");

if(!indicador){

indicador = document.createElement("span");
indicador.id = "fortaleza";

campoPassword.insertAdjacentElement("afterend", indicador);

}

indicador.textContent = puntos > 0 ? `Contraseña: ${nivel}` : "";
indicador.style.color = color;

});