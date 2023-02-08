const stockProductos = [
  {
    id: 1,
    nombre: "Airbag",
    cantidad: 1,
    desc: "Teatro Opera ",
    precio: 4500,
    img: "img/1.png",
  },
  {
    id: 2,
    nombre: "Cruzando el charco",
    cantidad: 1,
    desc: "Estadio Atenas",
    precio: 4000,
    img: "img/2.png",
  },
  {
    id: 3,
    nombre: "Guasones",
    cantidad: 1,
    desc: "Luna Park ",
    precio: 3000,
    img: "img/3.png",
  },
  {
    id: 4,
    nombre: "La Beriso",
    cantidad: 1,
    desc: " Rosario Central ",
    precio: 5000,
    img: "img/4.jpg",
  },
  {
    id: 5,
    nombre: "La Renga",
    cantidad: 1,
    desc: "Olavarria ",
    precio: 3500,
    img: "img/5.png",
  },
  {
    id: 6,
    nombre: "Divididos",
    cantidad: 1,
    desc: " Rafaela ",
    precio: 4500,
    img: "img/6.jpg",
  },
  {
    id: 7,
    nombre: "El Plan de la Mariposa",
    cantidad: 1,
    desc: "Necochea",
    precio: 2400,
    img: "img/7.png",
  },
  {
    id: 8,
    nombre: "Foo Fighters",
    cantidad: 1,
    desc: " Orfeo de cordoba",
    precio: 11000,
    img: "img/8.jpg",
  },
  {
    id: 9,
    nombre: "Greta Van Fleet",
    cantidad: 1,
    desc: "Velez Sarfield ",
    precio: 12000,
    img: "img/9.png",
  },
  {
    id: 10,
    nombre: "La Federal Blues ",
    cantidad: 1,
    desc: " River Plate",
    precio: 1500,
    img: "img/11.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad de entradas: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e){
  e.preventDefault()
  const persona = document.querySelector('#cliente').value
  const correo = document.querySelector('#correo').value

  if(correo === '' || persona == ''){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
  })
} else {

  //envio de correos ( respuesta)
  const btn = document.getElementById('button');

  document.getElementById('form')
  .addEventListener('submit', function(event) {
    event.preventDefault();
  
    btn.value = 'Sending...';
  
    const serviceID = 'default_service';
    const templateID = 'template_sizac6g';
  
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });
    
  const spinner = document.querySelector('#spinner')
  spinner.classList.add('d-flex')
  spinner.classList.remove('d-none')

  setTimeout(() => {
    spinner.classList.remove('d-flex')
    spinner.classList.add('d-none')
    formulario.reset()

    const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
    alertExito.textContent = 'Realizaste correctamente la compra, te enviaremos la informacion por e-mail'
    formulario.appendChild(alertExito)

    setTimeout(() => {
      alertExito.remove()
    }, 3000)


  }, 3000)
}
localStorage.clear()

}