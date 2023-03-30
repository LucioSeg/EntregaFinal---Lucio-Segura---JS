const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class = "modalHeaderTitle">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "✖";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carroJs.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src ="${product.img}"> 
        <h3>${product.nombre}</h3>
        <p>$ ${product.precio} </p>
        <span class="restar">-</span>
        <p>Cantidad: ${product.cantidad}</p>
        <span class="sumar">+</span>
        <p>Total: $${product.cantidad * product.precio}</p>
        <span class="delete-product"> ❌ </span>
        `;
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            pintarCarrito();
            saveLocal();
        });
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            pintarCarrito();
            saveLocal();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });
    const total = carroJs.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalComprando = document.createElement("div");
    totalComprando.className = "total-content";
    totalComprando.innerHTML = `El total a pagar es: ${total}$`;
    modalContainer.append(totalComprando);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carroJs.find((element) => element.id === id);

    carroJs = carroJs.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carrtioLength = carroJs.length;

    localStorage.setItem("carritoLength", JSON.stringify(carrtioLength));

    cantidadCarrito.innerText = JSON.parse(
        localStorage.getItem("carritoLength")
    );
};

carritoCounter();
