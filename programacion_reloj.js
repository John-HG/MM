//let te permite declarar variables limitando su alcance (scope) al bloque, declaración, o expresión donde se está usando
// y const pues obvi son constantes 
const btn = document.querySelector(".fa-play")
const btn_stop = document.querySelector(".fa-stop") ///////////////////////////////////////////////////////////1
let html_folio = document.getElementById("inputFolio")
let html_fecha_reporte =document.getElementById('fecha_reporte')
let html_fecha_soporte = document.getElementById('fecha_soporte')
let html_ID = document.getElementById('inputMachineID')
let fecha= new Date()
let id_actual 
let estado_timer_inicial 
// const html_folio = document.querySelector(".inputFolio")// elemento del input del folio 

//variables para generar el folio 
let  folio =1
const limite_max = 1000000 //valor maximo del folio 
//variable para cambiar el icono de play a pause 
let estado = false
// variables para el reloj que se quiere hacer 
let tiempoRef= Date.now()
let acumulado = 0
let cronometrar
// parte de cambio de estados del boton 

function iniciar(){
    if (html_ID.value == "") {
        alert("Campos necesarios incompletos")
    }
    else{
        btn.classList.toggle('fa-pause')  // cambiamos el valor de la clase por el simbolo de pausa 
        estado = !estado    //utilizamos el mismo comparador para cambiar el estado de la variable 
        estado_timer_inicial = true
        if (btn_stop.classList.contains("fa-scissors")) {
            console.log('esta en clase scissors');
        } else {
            console.log('no esta en scissors');
        }
        pausar(estado)  //mandamos todo al valor de estado 
        comenzar_timer()
    }
    
}   

function pausar(value){
    if(value){
        console.log(value);
        console.log("El tiempo comenzo")
        cronometrar= true
    }
    else{
        console.log(value);
        console.log("El tiempo a sido pausado")
        cronometrar = false
    } 
}
function detener(){
    if (estado) {
        estado= !estado
        console.log("el tiempo se detuvo")
        cronometrar = false
        acumulado = 0
        btn.classList.toggle('fa-pause')
        html_folio.value = ""
        estado_timer_inicial = false

    } else {
        cronometrar = false 
        acumulado = 0
        console.log('el timpo se detuvo 1')
        // html_folio.value = ""
        
    }
}
// parte para realizar el ajuste del reloj 

setInterval(() => {
    let tiempo = document.getElementById("div_tiempo")

    if(cronometrar){
        acumulado += Date.now() - tiempoRef
    }
    tiempoRef = Date.now()
    tiempo.innerHTML = formatear(acumulado) // acumulado esta en milisegundos 
    
}, 1000/60); //fotogramas por segundo 

function formatear(tiempo_ms){
    let MS = tiempo_ms % 1000                           // poner el tiempo en milisegundos
    let S = Math.floor(((tiempo_ms -MS) / 1000) % 60)   // formateas el tiempo de los milisegundos 
    let M = Math.floor((S / 60) % 60)
    let H = Math.floor((M/60))
    Number.prototype.ceros = function(n){
        return (this+"").padStart(n,0)
    }
    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2)
        //+ "." + MS.ceros(3)
}
//aqui se asigna el tiempo en el que se comenzo a trabajar por parte del tecnico  
function comenzar_timer(){
    if (estado && acumulado == 0 ) {
        let fecha_soporte = fecha.toLocaleString('en-US')
        html_fecha_soporte.value= fecha_soporte
    }
    else{
        html_fecha_soporte.value = ("")
    }    

}
// aqui se asigna el tiempo en el que se realizo el reporte de la falla
function generar_folio(){
    if (html_ID.value == "") {
        alert("Campos necesarios incompletos")
    }
    else{
        
        let fecha_1 = fecha.toLocaleString('en-US')
        let hora = fecha.toLocaleTimeString()
        let dia =fecha.toLocaleDateString()
        let opcion=confirm("Se genero el siguiente folio: "+ folio + "\n" + "Fecha: "+ fecha_1)
        if (opcion == true) {
            alert("Se genero exitosamente el reporte")
            html_folio.value=folio
            html_fecha_reporte.value = fecha_1
            
        } else {
            alert("Se cancelo el reporte de down time ")
        }
        folio++
    }
    
} 
