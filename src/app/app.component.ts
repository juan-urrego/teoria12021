import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teoria';
  //PALABRAS A UTILIZAR -->automata
  palabrasKeyword: string[] = ['var', 'function', 'while', 'if', 'let', 'const'];
  //IDENTIFY ---> R.EX
  nombreVariable: string;
  //OPERATOR -----> automata
  operador: string[] = ['=', '+', '-', '*', '/', '%', '==', '!', '<', '>', '&&', '||']
  //NUMERIC CONST ----> REX
  numConst: number
  //CHAR CONST "" '' ---->Automata
  textoString: string;
  //SEPARATOR 
  separador: string[] = ['(', ')', '{', '}', ',', '.', ';', '[', ']']
  //(nombreVariable, inta) -> (operador, =)
  
  entrada: string;
  salida: string;
  prueba: string;

  constructor() {
    
  }

  transformar() {
    let caracteresEspeciales: string[] = [' '];
    //Guardamos un array con todos los simbolos que pueden ser separadores para una keyword
    caracteresEspeciales=caracteresEspeciales.concat(this.operador).concat(this.separador);


    //guardamos los string en un array filas cada salto de linea
    let filas = this.entrada.split('\n');
    
    //Separamos las palabras con comillas
    let todo = this.leerCharConst(this.entrada);
    console.log("sin separar por caracteres", todo);
    
    
    //Separo todo por diferentes caracteres
    caracteresEspeciales.forEach(caracter => {
      todo = this.separarPorSimbolo(caracter, todo)
    });

    //Elimino elementos vacios en el array
    todo = todo.filter(x => x !== '' && x !== ' ');

    //extraigo los numeros se parados por (espacios)
    
    var valoresAceptados =  /^[0-9]*(\.?)[0-9]+$/;
    // var valorString = "((?:[^\"\\]|\\.)*)";
    
    console.log("todo el array de iteraciones",todo);    
    
    
    todo.map(iteracion => {
      console.log("iteracion",iteracion);
      

      //comprobacion de charConst ---> REVISAR
      // if(iteracion.match(valorString)){
        // console.log("valor analizar",iteracion);
        
        // prueba3 = this.leerCharConst(iteracion);
        // console.log(prueba3);              
        
      // }

      //comprobacion de numeros en el array
      if(iteracion.match(valoresAceptados)){
        console.log("iteracion numerica", iteracion);        
      }
      
      //comprobacion de keywords     
      if  (this.automataKeyword(iteracion)){
        console.log("iteracion keyword",iteracion);
      }
    })
  

  }

  leerCharConst(cadena: string): string[] {
    let numeroComillasDobles = 0;    
    let stringNuevo : string = "";
    let stringNuevo2: string = "";
    let arrayNuevo = [];
    for (let i = 0; i < cadena.length; ++i) {      
      
      if(String(cadena[i]) == "\"") {   
        if(stringNuevo2.length != 0){
          arrayNuevo.push(stringNuevo2);
          stringNuevo2 ="";
        }     
        numeroComillasDobles++;
      }

      if(numeroComillasDobles == 0){
        stringNuevo2 = stringNuevo2 + cadena[i]
      }
      if(numeroComillasDobles == 1) {
        stringNuevo = stringNuevo + cadena[i]
      }
      if(numeroComillasDobles == 2) {
        stringNuevo = stringNuevo + "\"";
        numeroComillasDobles = 0;
        arrayNuevo.push(stringNuevo);
        stringNuevo = "";
      }
      if(i == cadena.length -1 && numeroComillasDobles==1){
        arrayNuevo.push(stringNuevo);
      }
      
      

    }
    if(stringNuevo2.length != 0){

      arrayNuevo.push(stringNuevo2);
    }
    
    return arrayNuevo;
  }

  escribirDatos() {

  }

  separarPorSimbolo(caracter:string, texto:string[]): string[]{
    let arreglo=[];
    texto.map(palabra=>{
      if(palabra[0] != "\""){        
        let iguales = palabra.split(caracter);
        for(let i = 0; i < iguales.length; i++){
          arreglo.push(iguales[i]);
          arreglo.push(caracter);        
        }
        arreglo.pop();
      }

    })      
    return arreglo;
  }


  automataKeyword(palabra: string): boolean {
    //aca tiramos codigo del automata goto, pero con las palabras 
    const arrayLetters=Array.from(palabra);
    let state = "initial";
    const acceptedStates= ["function","var","let","if","const"];
    arrayLetters.map(letter =>{

          switch(state){
            case "initial":
              if(letter=="v") state="v";
              else if (letter=="f") state="f";
              else if (letter=="i") state="i";
              else if (letter=="w") state="w";
              else if (letter=="l") state="l";
              else if (letter=="c") state="c";
              else state ="err";
              break;
            case "v":
              state= letter =="a" ? "va":"err"
              break;
            case "va":
              state= letter =="r" ? "var":"err"
              break;
            case "var":
              state="err"
              break;
            case "f":
              state= letter =="u" ? "fu":"err"
              break;  
            case "fu":
              state= letter =="n" ? "fun":"err"
              break;
            case "fun":
              state= letter =="c" ? "func":"err"
              break;
            case "func":
              state= letter =="t" ? "funct":"err"
              break;
            case "funct":
              state= letter =="i" ? "functi":"err"
              break;
            case "functi":
              state= letter =="o" ? "functio":"err"
              break;  
            case "functio":
              state= letter =="n" ? "function":"err"
              break;
            case "function":
              state="err"
              break;
            case "w":
              state= letter =="h" ? "wh":"err"
              break;
            case "wh":
              state= letter =="i" ? "whi":"err"
              break;  
            case "whi":
              state= letter =="l" ? "whil":"err"
              break;
            case "whil":
              state= letter =="e" ? "while":"err"
              break;
            case "while":
              state="err";
              break;
            case "i":
              state= letter =="f" ? "if":"err"
              break;
            case "if":
              state="err"
              break;
            case "l":
              state= letter =="e" ? "le":"err"
              break;
            case "le":
              state= letter =="t" ? "let":"err"
              break;
            case "let":
              state= "err";
              break;
            case "c":
              state= letter =="o" ? "co":"err"
              break;
            case "co":
              state= letter =="n" ? "con":"err"
              break;
            case "con":
              state= letter =="s" ? "cons":"err"
              break;
            case "cons":
              state= letter =="t" ? "const":"err"
              break;
            case "const":
              state="err";
              break;
            case "err":
              break;
          }

    })
  
    
    if(acceptedStates.indexOf(state)==-1) {

      return false;
    }
    return true;


  }
}
