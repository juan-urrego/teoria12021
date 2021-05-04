import {Token} from './token';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Práctica 1, teoría de lenguajes';

  keywords: string[] = ['var', 'function', 'while', 'if', 'let', 'const'];  // KEYWORDS  -->automata
  operators: string[] = ['=', '+', '-', '*', '/', '%', '==', '!', '<', '>', '&&', '||'];  // OPERATOR
  separators: string[] = ['(', ')', '{', '}', ',', ';', '[', ']', '.'];  // SEPARATOR
  regNumb = /^[0-9]*(.|e)?[0-9]+$/;// regExp to identify numbers
  regString = /(["'])(.*?)\1/g; //'((?:[^"\\]|\\.)*)'; // regExp to identify strings
  regBadIdentify = /[^\"?]+/g;
  specialChars: string[] = [' '].concat(this.operators).concat(this.separators); // Array with all chars;

  input: string;
  output: Token[] = [];

  constructor() {
  }

  transformar() {
    let tokens: string[] = [];
    let tokenProcessed = [];
    let type: string;
    let todo = [];
    this.input.split('\n').map(line => {
      todo = todo.concat(this.divideByCharConstant(line))
    })

    todo.map(text => {
      if (text[0] === '"') {
        tokens.push(text);
      } else {
        let splitText = [text];
        this.specialChars.map(character => {
          splitText = this.divideByCharacter(character, splitText);
        });
        tokens = tokens.concat(splitText);
      }
    });
    tokens = tokens.filter(x => x !== '' && x !== ' ' && x !== '\n');// Elimino elementos vacios en el array
    tokens.map(token => {
      if (this.regString.test(token)) type = 'Char constant';
      else if (this.automataKeyword(token)) type = 'Keyword';
      else if (this.regNumb.test(token)) type = 'Number constant';
      else if (this.operators.indexOf(token) !== -1) type = 'Operator';
      else if (this.separators.indexOf(token) !== -1) type = 'Separator';
      else if (token.indexOf("\"") === -1 && (token.indexOf("?")) == -1 && (token.indexOf("\\")) == -1) type = 'Identify';

      else type = 'Error'
      tokenProcessed.push({Token: token, Type: type});
    });
    this.output = tokenProcessed;
  }

  divideByCharConstant(text: string): string[] {
    let countQuotes = 0;
    let stringAux1 = '';
    let stringAux2 = '';
    const splitText = [];
    for (let i = 0; i < text.length; ++i) {
      if (String(text[i]) === '"') {
        if (stringAux2.length !== 0) {
          splitText.push(stringAux2);
          stringAux2 = '';
        }
        countQuotes++;
      }
      switch (countQuotes) {
        case 0:
          stringAux2 = stringAux2 + text[i];
          break;
        case 1:
          stringAux1 = stringAux1 + text[i];
          break;
        case 2:
          stringAux1 = stringAux1 + '"';
          countQuotes = 0;
          splitText.push(stringAux1);
          stringAux1 = '';
          break;
      }
      if (i === text.length - 1 && countQuotes === 1) {
        splitText.push(stringAux1);
      }
    }

    if (stringAux2.length !== 0) {
      splitText.push(stringAux2);
    }
    return splitText;
  }

  divideByCharacter(character: string, text: string[]): string[] {
    const splitText = [];
    let textInside = [];
    text.map(word => {
      if (!word.match(this.regNumb)) {
        textInside = word.split(character);
        textInside.map(otherWord => {
          splitText.push(otherWord);
          splitText.push(character);
        });
        splitText.pop();
      } else {
        splitText.push(word);
      }
    });
    return splitText;
  }

  automataKeyword(word: string): boolean {
    const arrayLetters = Array.from(word);
    let state = 'initial';

    arrayLetters.map(letter => {
      switch (state) {
        case 'initial':
          if (letter === 'v') {
            state = 'v';
          } else if (letter === 'f') {
            state = 'f';
          } else if (letter === 'i') {
            state = 'i';
          } else if (letter === 'w') {
            state = 'w';
          } else if (letter === 'l') {
            state = 'l';
          } else if (letter === 'c') {
            state = 'c';
          } else {
            state = 'err';
          }
          break;
        case 'v':
          state = letter === 'a' ? 'va' : 'err';
          break;
        case 'va':
          state = letter === 'r' ? 'var' : 'err';
          break;
        case 'var':
          state = 'err';
          break;
        case 'f':
          state = letter === 'u' ? 'fu' : 'err';
          break;
        case 'fu':
          state = letter === 'n' ? 'fun' : 'err';
          break;
        case 'fun':
          state = letter === 'c' ? 'func' : 'err';
          break;
        case 'func':
          state = letter === 't' ? 'funct' : 'err';
          break;
        case 'funct':
          state = letter === 'i' ? 'functi' : 'err';
          break;
        case 'functi':
          state = letter === 'o' ? 'functio' : 'err';
          break;
        case 'functio':
          state = letter === 'n' ? 'function' : 'err';
          break;
        case 'function':
          state = 'err';
          break;
        case 'w':
          state = letter === 'h' ? 'wh' : 'err';
          break;
        case 'wh':
          state = letter === 'i' ? 'whi' : 'err';
          break;
        case 'whi':
          state = letter === 'l' ? 'whil' : 'err';
          break;
        case 'whil':
          state = letter === 'e' ? 'while' : 'err';
          break;
        case 'while':
          state = 'err';
          break;
        case 'i':
          state = letter === 'f' ? 'if' : 'err';
          break;
        case 'if':
          state = 'err';
          break;
        case 'l':
          state = letter === 'e' ? 'le' : 'err';
          break;
        case 'le':
          state = letter === 't' ? 'let' : 'err';
          break;
        case 'let':
          state = 'err';
          break;
        case 'c':
          state = letter === 'o' ? 'co' : 'err';
          break;
        case 'co':
          state = letter === 'n' ? 'con' : 'err';
          break;
        case 'con':
          state = letter === 's' ? 'cons' : 'err';
          break;
        case 'cons':
          state = letter === 't' ? 'const' : 'err';
          break;
        case 'const':
          state = 'err';
          break;
        case 'err':
          break;
      }
    });
    return this.keywords.indexOf(state) !== -1;
  }
}
