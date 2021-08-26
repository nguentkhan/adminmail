'use strict';

var english, morse;

function translateToMorse() { 
  // print to morse div to display
  document.getElementById('morse').innerHTML = morse;
    
  // show div if there is more then 1 letter translated
    if (english.length === 0) {
      document.getElementById('morseWrapper').style.display="block";
      document.getElementById('morse').innerHTML = 'Nothing to Translate';
    } else{
      document.getElementById('morseWrapper').style.display="block";
    }
}
function userEnglishInput() {
  // get user value and make all lower case
    english = document.getElementById('englishInput').value.toLowerCase();
    morse = english.split("");
    console.log(morse);
    // replace object
    var replaceObj = {
      .-: 'a/',
      a: '.- / ',
      b: '-... / ',
      c: '-.-. / ',
      d: '-.. / ',
      e: '. / ',
      f: '..-. / ',
      g: '--. / ',
      h: '.... / ', 
      i: '.. / ', 
      j: '.--- / ', 
      k: '-.- / ', 
      l: '.-.. / ', 
      m: '-- / ', 
      n: '-. / ', 
      o: '--- / ', 
      p: '.--. / ', 
      q: '--.- / ',
      r: '.-. / ', 
      s: '... / ', 
      t: '- / ', 
      u: '..- / ', 
      v: '...- / ', 
      w: '.-- / ', 
      x: '-..- / ', 
      y: '-.-- / ', 
      z: '--.. / ',
      '0': '----- / ',
      '1': '.---- / ',
      '2': '..-- / ',
      '3': '...-- / ',
      '4': '....- / ',
      '5': '----- / ',
      '6': '-.... / ',
      '7': '--.... / ',
      '8': '---.. / ',
      '9': '----. / ',
      '.': '.-.-.- / ',
      ',': '--..-- / ',
      ':': '---... / ',
      "'": '.----. / ',
      '"': '.----. / ',
      '-': '-....- / ',
      '@': '.--.-. / ',
      '=': '-...- / ',
      ' ': "",
      '?': '..--.. / ',
      '\/': '-..-. / '
    }
    // replace characters and retrun
    morse = english.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9|@|.|,|:|"|'|=|\s+|[?=]|\//gi, function(matched) {    
      return replaceObj[matched];
    });    
}
function resetTranslate() {
  english = [];
  morse = [];
  document.getElementById('englishInput').value = ' ';
  document.getElementById('morseWrapper').style.display="none";
  document.getElementById('englishInput').focus();
}
function runScript(e) {
    if (e.keyCode == 13) {
        return false;
    }
}
