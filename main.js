
    // Elementos del DOM
    const startNumSlider = document.getElementById('startNum');
    const stepNumSlider = document.getElementById('stepNum');
    const countNumSlider = document.getElementById('countNum');
    const startNumValue = document.getElementById('startNumValue');
    const stepNumValue = document.getElementById('stepNumValue');
    const countNumValue = document.getElementById('countNumValue');
    const numericPattern = document.getElementById('numericPattern');
    const numericRule = document.getElementById('numericRule');
    const numericStep = document.getElementById('numericStep');

    const shapeTypeSelect = document.getElementById('shapeType');
    const shapeSizeSlider = document.getElementById('shapeSize');
    const shapeCountSlider = document.getElementById('shapeCount');
    const shapeSizeValue = document.getElementById('shapeSizeValue');
    const shapeCountValue = document.getElementById('shapeCountValue');
    const geometricPattern = document.getElementById('geometricPattern');
    const geometricRule = document.getElementById('geometricRule');
    const geometricStep = document.getElementById('geometricStep');

    // Colores para las figuras
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];

    // Función para generar patrón numérico
    function generateNumericPattern() {
      const start = parseInt(startNumSlider.value);
      const step = parseInt(stepNumSlider.value);
      const count = parseInt(countNumSlider.value);

      // Actualizar valores mostrados
      startNumValue.textContent = start;
      stepNumValue.textContent = step;
      countNumValue.textContent = count;

      // Actualizar regla
      numericRule.innerHTML = `<strong>Regla actual:</strong> Empezar en ${start}, sumar ${step} cada vez`;

      // Limpiar patrón anterior
      numericPattern.innerHTML = '';

      // Generar secuencia
      for (let i = 0; i < count; i++) {
        const value = start + (i * step);
        const numberElement = document.createElement('div');
        numberElement.className = 'number-item';
        numberElement.textContent = value;
        numberElement.style.animationDelay = `${i * 0.1}s`;
        numericPattern.appendChild(numberElement);

        // Pequeña pausa para la animación
        setTimeout(() => {
          numberElement.classList.add('pattern-animation');
        }, i * 100);
      }

      // Mostrar paso de crecimiento
      numericStep.textContent = `Paso de crecimiento: +${step} en cada término`;
    }

    // Función para generar patrón geométrico
    function generateGeometricPattern() {
      const type = shapeTypeSelect.value;
      const size = parseInt(shapeSizeSlider.value);
      const count = parseInt(shapeCountSlider.value);

      // Actualizar valores mostrados
      shapeSizeValue.textContent = size;
      shapeCountValue.textContent = count;

      // Limpiar patrón anterior
      geometricPattern.innerHTML = '';

      let ruleText = '';
      let stepText = '';

      for (let i = 0; i < count; i++) {
        const shapeElement = document.createElement('div');
        shapeElement.className = 'shape-item';
        shapeElement.style.animationDelay = `${i * 0.1}s`;

        if (type === 'alternating') {
          // Alternar triángulo y círculo
          if (i % 2 === 0) {
            shapeElement.innerHTML = `<div class="triangle" style="border-bottom-color: ${colors[i % colors.length]}; transform: scale(${size / 30});"></div>`;
          } else {
            shapeElement.innerHTML = `<div class="circle" style="width: ${size}px; height: ${size}px; background: ${colors[i % colors.length]};"></div>`;
          }
          ruleText = 'Alternar entre triángulo y círculo con colores diferentes';
          stepText = 'Patrón: ▲ ● ▲ ● ...';
        } else if (type === 'growing') {
          // Cuadrados que crecen
          const currentSize = size + (i * 5);
          shapeElement.innerHTML = `<div class="square" style="width: ${currentSize}px; height: ${currentSize}px; background: ${colors[i % colors.length]};"></div>`;
          ruleText = 'Cuadrados que aumentan de tamaño progresivamente';
          stepText = `Crecimiento: +5px en cada figura`;
        } else if (type === 'repeating') {
          // Repetir secuencia de 3
          const shapes = ['triangle', 'circle', 'square'];
          const shapeType = shapes[i % 3];
          const color = colors[Math.floor(i / 3) % colors.length];

          if (shapeType === 'triangle') {
            shapeElement.innerHTML = `<div class="triangle" style="border-bottom-color: ${color}; transform: scale(${size / 30});"></div>`;
          } else if (shapeType === 'circle') {
            shapeElement.innerHTML = `<div class="circle" style="width: ${size}px; height: ${size}px; background: ${color};"></div>`;
          } else {
            shapeElement.innerHTML = `<div class="square" style="width: ${size}px; height: ${size}px; background: ${color};"></div>`;
          }
          ruleText = 'Repetir secuencia: triángulo, círculo, cuadrado';
          stepText = 'Patrón: ▲ ● ■ ▲ ● ■ ...';
        }

        geometricPattern.appendChild(shapeElement);

        // Pequeña pausa para la animación
        setTimeout(() => {
          shapeElement.classList.add('pattern-animation');
        }, i * 100);
      }

      // Actualizar regla y paso
      geometricRule.innerHTML = `<strong>Regla actual:</strong> ${ruleText}`;
      geometricStep.textContent = stepText;
    }

    // Event listeners para patrones numéricos
    startNumSlider.addEventListener('input', generateNumericPattern);
    stepNumSlider.addEventListener('input', generateNumericPattern);
    countNumSlider.addEventListener('input', generateNumericPattern);

    // Event listeners para patrones geométricos
    shapeTypeSelect.addEventListener('change', generateGeometricPattern);
    shapeSizeSlider.addEventListener('input', generateGeometricPattern);
    shapeCountSlider.addEventListener('input', generateGeometricPattern);

    // Generar patrones iniciales
    generateNumericPattern();
    generateGeometricPattern();
