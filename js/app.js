//variables
const carrito = document.querySelector('#carrito'),
    contenedorCarrito = document.querySelector('#lista-carrito tbody'),
    listaCursos = document.querySelector('#lista-cursos'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let carritoCompra = [];

//eventos
cargarEventListener();

function cargarEventListener(){
    //agrega curso al presionar "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        carritoCompra=[] //reset carrito

        limpiarHTML();//eliminamos todo HTML
    })
}

//eliminar curso del carrito
function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo (filter) carritoCompra x data-id
        carritoCompra = carritoCompra.filter(curso => curso.id !==cursoId)
        carritoHTML(); //iteramos sobre el carrito y mostrar en HTML
    }
}


//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado);
    }
}

// extraer info de curso
function leerDatosCursos(curso){
    //creo obj con el contenido del curso selecc
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si hay elem en el carrito, y si son =les
    const existe = carritoCompra.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = carritoCompra.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna los obj actualiz
            }else{
                return curso; // retorna objs NO actual
            }
        });
        carritoCompra= [...cursos];
    }else{
        //agregar elementos al carrito
        carritoCompra = [...carritoCompra, infoCurso]
    }

    
    console.log(carritoCompra); 
    carritoHTML();
}

//mostrar carrito en HTML
function carritoHTML(){
    //limpiar HTML
    limpiarHTML();

    //recorre carrito y genera HTML
    carritoCompra.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id }= curso
        const row = document.createElement('tr'); //un row/tr es para TBODY
        row.innerHTML = `
        <td>
          <img src ="${imagen}" width="100"/>  
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
       </td> 
        `;
//agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    })
};

//limpiar carrito xq appendChild no elimina art y se repite elimina los cursos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = ''; //este puede ir arriba solo MEJOR TECNICA ES 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    } //es mas RAPIDO!!!! ve arriba si hay elem, si hay elimina sino se detiene
}


