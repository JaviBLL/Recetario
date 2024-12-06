

        // Función para agregar un nuevo ingrediente
        function agregarIngrediente() {
            const listaIngrediente = document.getElementById('listaIngrediente');
            const ingredienteDiv = document.createElement('div');
            ingredienteDiv.classList.add('ingrediente');
            ingredienteDiv.innerHTML = `
                <label for="ingresoIngrediente">Ingrediente:</label>
                <input type="text" id="ingresoIngrediente" placeholder="Ingrediente" required>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidadIngrediente" placeholder="Cantidad" required min="0" step="0.01">
                <label for="unidad">Unidad:</label>
                <select name="unidad" id="unidad">
                    <option value="Unidad">Unidad</option>
                    <option value="kilos">Kilos</option>
                    <option value="gramos">Gramos</option>
                    <option value="miligramos">Miligramos</option>
                    <option value="litros">Litros</option>
                    <option value="mililitros">Mililitros</option>
                </select>
                <label for="precio">Precio:</label>
                <input type="number" id="precio" placeholder="precio" required min="0" step="0.01">
                <button type="button" onclick="quitarIngrediente(this)">-</button>
            `;
            listaIngrediente.appendChild(ingredienteDiv);
        }

        // Función para quitar un ingrediente
        function quitarIngrediente(button) {
            const ingredienteDiv = button.parentNode;
            ingredienteDiv.parentNode.removeChild(ingredienteDiv);
        }

        // Función de cálculo
        function calculo(nInicio, nFinal, medida) {
            return (medida / nInicio) * nFinal;
        }

        // // Función para calcular la receta ajustada
        // function calcularReceta() {
        //     const nInicio = parseInt(document.getElementById('cantidad').value);
        //     const nFinal = parseInt(document.getElementById('cantFinal').value);
        //     const ingredientes = document.querySelectorAll('.ingrediente');
        //     const resultadosDiv = document.getElementById('resultados');

        //     // Limpiar resultados previos
        //     resultadosDiv.innerHTML = '';

        //     // Validar entrada de datos
        //     if (isNaN(nInicio) || isNaN(nFinal) || nInicio <= 0 || nFinal <= 0) {
        //         resultadosDiv.innerHTML = '<p style="color: red;">Por favor, ingrese cantidades válidas para las personas.</p>';
        //         return;
        //     }

        //     // Iterar sobre los ingredientes y calcular las nuevas cantidades
        //     ingredientes.forEach(ingrediente => {
        //         const nombre = ingrediente.querySelector('#ingresoIngrediente').value;
        //         const cantidad = parseFloat(ingrediente.querySelector('#cantidadIngrediente').value);
        //         const unidad = ingrediente.querySelector('#unidad').value;

        //         if (nombre && !isNaN(cantidad) && cantidad > 0) {
        //             const cantidadAjustada = calculo(nInicio, nFinal, cantidad);

        //             // Mostrar resultado
        //             const resultado = document.createElement('div');
        //             resultado.classList.add('resultado-item');
        //             resultado.textContent = `${nombre}: ${cantidadAjustada.toFixed(2)} ${unidad}`;
        //             resultadosDiv.appendChild(resultado);
        //         }
        //     });
        // }

        // Función para calcular la receta ajustada  
        function calcularReceta() {  
            const nInicio = parseInt(document.getElementById('cantidad').value);  
            const nFinal = parseInt(document.getElementById('cantFinal').value);  
            const ingredientes = document.querySelectorAll('.ingrediente');  
            const resultadosDiv = document.getElementById('resultados');  
            const precioVenta = parseFloat(document.getElementById('precioVenta').value);  
        
            // Limpiar resultados previos  
            resultadosDiv.innerHTML = '';  
        
            // Validar entrada de datos  
            if (isNaN(nInicio) || isNaN(nFinal) || nInicio <= 0 || nFinal <= 0 || isNaN(precioVenta) || precioVenta < 0) {  
                resultadosDiv.innerHTML = '<p style="color: red;">Por favor, ingrese cantidades válidas para las personas y un precio de venta válido.</p>';  
                return;  
            }  
        
            let costoTotal = 0;  
        
            // Iterar sobre los ingredientes y calcular las nuevas cantidades  
            ingredientes.forEach(ingrediente => {  
                const nombre = ingrediente.querySelector('#ingresoIngrediente').value;  
                const cantidad = parseFloat(ingrediente.querySelector('#cantidadIngrediente').value);  
                const unidad = ingrediente.querySelector('#unidad').value;  
                const precio = parseFloat(ingrediente.querySelector('#precio').value);  
                
                if (nombre && !isNaN(cantidad) && cantidad > 0) {  
                    const cantidadAjustada = calculo(nInicio, nFinal, cantidad);  
        
                    // Calcular el costo total de este ingrediente  
                    let cantidadEnUnidad = cantidadAjustada;  
                    if (unidad === 'litros') {  
                        cantidadEnUnidad *= 1000; // Convertir a mililitros  
                    } else if (unidad === 'kilos') {  
                        cantidadEnUnidad *= 1000; // Convertir a gramos  
                    }  
        
                    const costoIngrediente = (precio / cantidad) * cantidadEnUnidad; // Costo del ingrediente  
                    costoTotal += costoIngrediente; // Sumar al costo total  
                    
                    // Mostrar resultado de cada ingrediente  
                    const resultado = document.createElement('div');  
                    resultado.classList.add('resultado-item');  
                    resultado.textContent = `${nombre}: ${cantidadAjustada.toFixed(2)} ${unidad} - Costo: ${formatearNumero(costoIngrediente)}`;  
                    resultadosDiv.appendChild(resultado);  
                }  
            });  
        
            // Calcular el costo por porción  
            const costoPorPorcion = costoTotal / nFinal;  
        
            // Calcular la ganancia total  
            const gananciaTotal = (precioVenta - costoPorPorcion) * nFinal;  
        
            // Mostrar costo total de la receta  
            const costoTotalDiv = document.createElement('div');  
            costoTotalDiv.classList.add('resultado-item');  
            costoTotalDiv.textContent = `Costo total de la receta: ${formatearNumero(costoTotal)}`;  
            resultadosDiv.appendChild(costoTotalDiv);  
        
            // Mostrar costo por porción  
            const costoPorPorcionDiv = document.createElement('div');  
            costoPorPorcionDiv.classList.add('resultado-item');  
            costoPorPorcionDiv.textContent = `Costo por porción: ${formatearNumero(costoPorPorcion)}`;  
            resultadosDiv.appendChild(costoPorPorcionDiv);  
        
            // Mostrar la ganancia total  
            const gananciaTotalDiv = document.createElement('div');  
            gananciaTotalDiv.classList.add('resultado-item');  
            gananciaTotalDiv.textContent = `Ganancia total: ${formatearNumero(gananciaTotal)}`;  
            resultadosDiv.appendChild(gananciaTotalDiv);  
        }  
        
        function formatearNumero(numero) {  
            // Convertir el número a entero si es necesario  
            let entero = Math.floor(numero);  
            // Formatear el número con puntos en los miles  
            return '$' + entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');  
        }  