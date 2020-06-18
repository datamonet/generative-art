// P_3_1_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * analysing and sorting the letters of a text
 * changing the letters alpha value in relation to frequency
 *
 * MOUSE
 * position x          : interpolate between normal text and sorted position
 *
 * KEYS
 * a                   : toggle alpha mode
 * s                   : save png
 */
'use strict';

var joinedText;
var alphabet = 'ABCDEFGHIJKLMNORSTUVWYZÄÖÜß,.;!? ';
var counters = [];

var posX;
var posY;

var drawAlpha = true;

function preload() {
  joinedText = loadStrings('data/faust_kurz.txt');
}

function setup() {
  createCanvas(620, windowHeight);

  noStroke();
  textFont('monospace', 18);

  joinedText = joinedText.join(' ');

  // use the following command, to collect all characters in the text automatically
  // alphabet = getUniqCharacters();

  for (var i = 0; i < alphabet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(255);

  posX = 20;
  posY = 40;

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;

    if (drawAlpha) {
      fill(87, 35, 129, counters[index] * 3);
    } else {
      fill(87, 35, 129);
    }

    var sortY = index * 20 + 40;
    var m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    var interY = lerp(posY, sortY, m);

    text(joinedText.charAt(i), posX, interY);

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }
}

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
    var c = joinedText.charAt(i);
    var upperCaseChar = c.toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    // increase the respective counter
    if (index >= 0) counters[index]++;
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'a' || key == 'A') drawAlpha = !drawAlpha;
}
