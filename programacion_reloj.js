//let es para variables que se pueden fenerar en ejecucion y const pues obvi son constantes 
const btn = document.querySelector(".fa-play")
const btn_stop = document.querySelector(".fa-stop") ///////////////////////////////////////////////////////////1
let html_folio = document.getElementById("inputFolio")
// const html_folio = document.querySelector(".inputFolio")// elemento del input del folio 

//variables para generar el folio 
let  folio =1
const limite_max = 1000000 //valor maximo del folio 
//variable para el cambio de el el icono de play a pause 
let estado = false
// variables para el reloj que se quiere hacer 
let tiempoRef= Date.now()
let acumulado = 0
let cronometrar
// parte de cambio se estados del boton 

function iniciar(){
    btn.classList.toggle('fa-pause')  // cambiamos el valor de la clase por el simbolo de pausa 
    estado = !estado    //utilizamos el mismo comparador para cambiar el estado de la variable 
    if (btn_stop.classList.contains("fa-scissors")) {
        console.log('esta en clase scissors');
    } else {
        console.log('no esta en scissors');
    }
    pausar(estado)  //mandamos todo al valor de estado 
    generarfolio()
    

}   

function pausar(value){
    if(value == true){
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
    if (estado == true) {
        estado= !estado
        console.log("el tiempo se detuvo")
        cronometrar = false
        acumulado = 0
        btn.classList.toggle('fa-pause')
        // html_folio.value = ""
    } else {
        cronometrar = false 
        acumulado = 0
        console.log('el timpo se detuvo')
        html_folio.value = ""
        
    }
}

//generar el folio que se va a tomar en cuenta en el 
function generarfolio(){
    if (estado == true && acumulado== 0) {
        
        html_folio.value = folio
        folio = folio+1
    }
    else{

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

// 
