let cols, rows;
let w = 40;
let grid = [];
let buttonState = 0; // 0: Primer momento, 1: Segundo momento, 2: Tercer momento
let globalDeformation = 0;
let amplitude = 20;
let extraButtons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = color((i + j) % 2 * 255);
    }
  }
}

function draw() {
  background(255);

  let time = millis() * 0.001;
  let frequency = 0.1;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * w;

      let deformation = 0;

      if (buttonState === 0) {
        // Primer momento: fondo con movimiento wavy del cursor
        let distance = dist(mouseX, mouseY, x + w / 2, y + w / 2);
        if (distance < 100) {
          deformation = amplitude * sin(TWO_PI * frequency * i + time * 3);
        }
      } else if (buttonState === 1) {
        // Segundo momento: fondo con movimiento en pantalla
        deformation = amplitude * sin(TWO_PI * frequency * i + time * 3);
      }

      // Dibujar la celda con el color actual y la deformación
      fill(grid[i][j]);
      noStroke();
      beginShape();
      vertex(x, y + deformation);
      vertex(x + w, y + deformation);
      vertex(x + w, y + w + deformation);
      vertex(x, y + w + deformation);
      endShape(CLOSE);
    }
  }

  // Dibujar el botón en el centro
  drawCenterButton();

  // Dibujar botones adicionales en el tercer momento
  if (buttonState === 2) {
    for (let i = 0; i < extraButtons.length; i++) {
      extraButtons[i].display();
    }
  }
}

function drawCenterButton() {
  let rectWidth = 400; // Ajusta el ancho del botón blanco
  let rectHeight = 200; // Ajusta la altura del botón blanco

  if (buttonState === 0) {
    fill(0);
  } else if (buttonState === 1) {
    fill(255);
  } else if (buttonState === 2) {
    fill(255);
  }

  noStroke();
  rect(width / 2 - rectWidth / 2, height / 2 - rectHeight / 2, rectWidth, rectHeight);

  textAlign(CENTER, CENTER);
  textSize(24);

  if (buttonState === 0) {
    fill(255);
    text("Bienvenidos a mi portafolio", width / 2, height / 2 - 20);
    text("(Presiona)", width / 2, height / 2 + 20);
  } else if (buttonState === 1) {
    fill(0);
    textSize(18);
    text("Mi nombre es Catalina Cabezas,soy estudiante", width / 2, height / 2 - 60);
    text("de segundo año de diseño en la PUCV.", width / 2, height / 2 - 40);
    text("En este portafolio presento una serie", width / 2, height / 2 - 20);
    text("de encargos realizados mediante el código", width / 2, height / 2);
    text("y en conjunto de herramientas como lo son", width / 2, height / 2 + 20);
    text("HTML, CSS, P5js y Github, las cuales permitieron", width / 2, height / 2 + 40);
    text("obtener un despertar creativo en el área digital.", width / 2, height / 2 + 60);
  } else if (buttonState === 2) {
    fill(0);
    text("¡Haz clic en los círculos!", width / 2, height / 2);
    textSize(14);
    text("(Recuerda interactuar haciendo clic)", width / 2, height / 2 + 20);
  }
}

function animate() {
  globalDeformation = amplitude * sin(millis() * 0.001 * 3);
  requestAnimationFrame(animate);
}

function mouseMoved() {
  if (buttonState === 0) {
    animate();
  }
}

function mousePressed() {
  let rectX = width / 2 - 300 / 2; // Ajusta la posición X del botón blanco
  let rectY = height / 2 - 150 / 2; // Ajusta la posición Y del botón blanco

  if (mouseX > rectX && mouseX < rectX + 300 && mouseY > rectY && mouseY < rectY + 150) {
    // Cambiar el estado del botón al presionar
    buttonState++;

    // Resetear el estado si estamos en el tercer momento
    if (buttonState > 2) {
      buttonState = 0;
      // Limpiar la lista de botones adicionales cuando volvemos al primer momento
      extraButtons = [];
    }

    // Crear 5 botones adicionales cuando estamos en el tercer momento
    if (buttonState === 2) {
      let buttonSpacing = 50;
      let totalButtonsWidth = 5 * 50 + 4 * buttonSpacing;
      let initialX = width / 2 - totalButtonsWidth / 2; // Mover la declaración de initialX aquí
      for (let i = 0; i < 5; i++) {
        let x = initialX + i * (50 + buttonSpacing);
        let y = height / 2 + 100;
        let buttonText = ["♔", "♕", "♖", "♘", "♙"][i];
        let link = buttonLinks[i];
        let button = new ExtraButton(x, y, buttonText, link);
        extraButtons.push(button);
      }
    }
  } else if (buttonState === 2) {
    // Verificar clic en botones adicionales
    for (let i = 0; i < extraButtons.length; i++) {
      extraButtons[i].clicked();
    }
  }
}

class ExtraButton {
  constructor(x, y, symbol, link) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.symbol = symbol;
    this.link = link;
  }

  display() {
    fill(200); // Cambiado a gris claro (ajusta el valor según tu preferencia)
    noStroke(); // Sin delineado
    ellipse(this.x, this.y, this.size, this.size);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(24);
    text(this.symbol, this.x, this.y);
  }

  clicked() {
    // Verificar si el mouse está sobre el botón
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      // Abrir el enlace si está definido
      if (this.link) {
        window.open(this.link, '_blank');
      }
    }
  }
}

// En el bloque donde creas los botones adicionales:
let buttonLinks = [
  "https://kvtari.github.io/Tarea-1",
  "https://kvtari.github.io/Tarea-2",
  "https://kvtari.github.io/Tarea-3",
  "https://kvtari.github.io/Tarea-4",
  "https://kvtari.github.io/Tarea-5"
]; // Agrega tus enlaces aquí

for (let i = 0; i < 5; i++) {
  let x = width / 2 - 250 + i * (50 + 50);
  let y = height / 2 + 100;
  let buttonText = ["♔", "♕", "♖", "♘", "♙"][i];
  let link = buttonLinks[i];
  let button = new ExtraButton(x, y, buttonText, link);
  extraButtons.push(button);
}





