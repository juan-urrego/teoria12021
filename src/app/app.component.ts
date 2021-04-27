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
  operador: string[] = ['=', '+', '-', '*', '/', '%', '==', '!=', '<=', '>=', '&&', '||']
  //NUMERIC CONST ----> REX
  numConst: number
  //CHAR CONST "" '' ---->Automata
  textoString: string;
  //SEPARATOR 
  separador: string[] = ['(', ')', '{', '}', ',', '.', ';', '[', ']']
  //(nombreVariable, inta) -> (operador, =)


  entrada: string;
  salida: string;




  constructor() {

  }

  transformar() {
    let prueba: string[] = [];
    //guardamos los string en un array filas cada salto de linea
    let filas = this.entrada.split('\n');
    console.log(filas);

    //para leer cada salto de linea
    filas.forEach(fila => {
      //Guardamos en un array letra por letra dependiendo de cada fila  
      for (let i = 0; i < fila.length; ++i) {
        prueba.push(String(fila[i]));
      }
      //Se analiza todas las letras de una fila

    });
    console.log(prueba);


  }
  leerDatos() {

  }

  escribirDatos() {

  }


  automataKeyword(keyword: string) {
    //aca tiramos codigo del automata goto, pero con las palabras 
    
    const arrayLetters = Array.from(keyword)
    let state = "initial";
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
            case "fucti":
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
          if state in["function","var","let","if","const"]{

          }
          return true;

    })


  }
}
