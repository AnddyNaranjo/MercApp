const Productos = require('../models/Producto');
const Categoria = require('../models/Categoria');

async function prodCate() {
  try {
    const totalProductos = await Productos.countDocuments();

    if (totalProductos === 0) {

      const categorias =
        await Categoria.insertMany([

          {
            nombre: 'Tecnología'
          },

          {
            nombre: 'Accesorios'
          },

          {
            nombre: 'Oficina'
          },

          {
            nombre: 'Gaming'
          }

        ]);

      console.log('✅ Categorías creadas');

      // REFERENCIAS

      const tecnologia = categorias[0]._id;
      const accesorios = categorias[1]._id;
      const oficina = categorias[2]._id;
      const gaming = categorias[3]._id;

      // CREAR PRODUCTOS

      const productos = [

        {
          nombre: 'Laptop HP',
          precio: 850,
          stock: 5,
          descripcion: 'Laptop HP Ryzen 5',
          imagen: null,
          categoriaID: tecnologia
        },

        {
          nombre: 'Tablet Lenovo',
          precio: 300,
          stock: 7,
          descripcion: 'Tablet Android Lenovo',
          imagen: null,
          categoriaID: tecnologia
        },

        {
          nombre: 'Mouse Gamer',
          precio: 25,
          stock: 20,
          descripcion: 'Mouse RGB gamer',
          imagen: null,
          categoriaID: gaming
        },

        {
          nombre: 'Teclado Mecánico',
          precio: 60,
          stock: 15,
          descripcion: 'Teclado RGB',
          imagen: null,
          categoriaID: gaming
        },

        {
          nombre: 'Audífonos Bluetooth',
          precio: 45,
          stock: 12,
          descripcion: 'Audífonos inalámbricos',
          imagen: null,
          categoriaID: accesorios
        },

        {
          nombre: 'Cargador USB-C',
          precio: 18,
          stock: 30,
          descripcion: 'Carga rápida',
          imagen: null,
          categoriaID: accesorios
        },

        {
          nombre: 'Disco SSD',
          precio: 95,
          stock: 10,
          descripcion: 'SSD 1TB',
          imagen: null,
          categoriaID: tecnologia
        },

        {
          nombre: 'Webcam Logitech',
          precio: 70,
          stock: 9,
          descripcion: 'Webcam HD',
          imagen: null,
          categoriaID: accesorios
        },

        {
          nombre: 'Monitor Samsung',
          precio: 220,
          stock: 8,
          descripcion: 'Monitor 24 pulgadas',
          imagen: null,
          categoriaID: oficina
        },

        {
          nombre: 'Impresora Epson',
          precio: 180,
          stock: 4,
          descripcion: 'Impresora multifunción',
          imagen: null,
          categoriaID: oficina
        }

      ];

      await Productos.insertMany(productos);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

      
    } else {
      console.log('Ya existen productos, no se crea producto de prueba');
    }
  } catch (error) {
    console.error('Error al inicializar producto de prueba:', error);
  }
}

module.exports = prodCate;