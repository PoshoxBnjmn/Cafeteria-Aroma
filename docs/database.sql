-- Este archivo SQL representa el esquema de una base de datos relacional
-- basado en las entidades definidas en `docs/backend.json` y los datos
-- de ejemplo en `src/lib/data.ts`.

-- Tabla para almacenar los usuarios de la aplicación.
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- En una app real, siempre guardar el hash de la contraseña.
    profile_picture TEXT,
    points INTEGER NOT NULL DEFAULT 0,
    role VARCHAR(50) -- 'admin' u otros roles futuros.
);

-- Tabla para almacenar los productos de la cafetería.
CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Bebestibles Calientes', 'Frappes / Bebidas Frías', 'Dulces', 'Salados', 'Canjeables')),
    image TEXT,
    image_hint VARCHAR(255),
    points INTEGER, -- Puntos que se ganan al comprar el producto.
    points_cost INTEGER -- Costo en puntos para canjear el producto.
);

-- Tabla para almacenar los pedidos de los usuarios.
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    total_points_awarded INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla intermedia para la relación muchos-a-muchos entre pedidos y productos.
CREATE TABLE order_items (
    order_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Precio del producto en el momento de la compra.
    points_awarded INTEGER,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla para almacenar los testimonios de los clientes.
CREATE TABLE testimonials (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    image TEXT,
    image_hint VARCHAR(255)
);

-- Tabla para el historial de puntos de los usuarios.
CREATE TABLE points_history (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    amount INTEGER NOT NULL, -- Positivo para ganancias, negativo para gastos.
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Inserción de datos de ejemplo --

-- Insertar el usuario administrador.
-- La contraseña 'adminpassword123' se representaría como un hash en una aplicación real.
INSERT INTO users (id, name, email, password_hash, role, points, profile_picture) VALUES
('admin_user', 'Admin', 'admin@aroma.com', 'hashed_admin_password', 'admin', 9999, 'https://picsum.photos/seed/admin_user/128/128');

-- Insertar productos de ejemplo.
INSERT INTO products (id, name, description, price, category, image, image_hint, points, points_cost) VALUES
('prod_1', 'Café Caliente Clásico', 'Un café negro, rico y aromático.', 2390, 'Bebestibles Calientes', 'https://cdn.shopify.com/s/files/1/2964/0212/files/42_b0706929-b3f8-4f6c-bfe9-53a36b1df554_480x480.png?v=1720472518', 'hot coffee', 25, NULL),
('prod_2', 'Espresso Intenso', 'Un shot de energía pura.', 1990, 'Bebestibles Calientes', 'https://sumatocoffee.com/cdn/shop/articles/espresso_d93cf1fb-0d4d-4da2-877f-c8226560ea4a.png?v=1758145494&width=640', 'espresso shot', 20, NULL),
('prod_3', 'Cappuccino Cremoso', 'Espresso, leche vaporizada y espuma.', 3490, 'Bebestibles Calientes', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Cappuccino_PeB.jpg/1200px-Cappuccino_PeB.jpg', 'cappuccino art', 35, NULL),
('prod_4', 'Frappé de Caramelo', 'Hielo, café y un toque dulce de caramelo.', 4290, 'Frappes / Bebidas Frías', 'https://i0.wp.com/caferama.com/wp-content/uploads/2023/01/caramel-dra.jpg?fit=768%2C512&ssl=1', 'iced frappe', 45, NULL),
('prod_5', 'Smoothie de Frutas', 'Una mezcla refrescante de frutas de temporada.', 3990, 'Frappes / Bebidas Frías', 'https://s3.amazonaws.com/static.realcaliforniamilk.com/media/foodservice/Super_Berry_Smoothie.jpg', 'fruit smoothie', 40, NULL),
('prod_6', 'Malteada de Chocolate', 'Cremosa y con un intenso sabor a chocolate.', 4290, 'Frappes / Bebidas Frías', 'https://i0.wp.com/sarasellos.com/wp-content/uploads/2024/07/milkshake-chocolate-5.jpg?resize=683%2C1024&ssl=1', 'chocolate milkshake', 42, NULL),
('prod_7', 'Croissant de Chocolate', 'Hojaldre relleno de chocolate derretido.', 2690, 'Dulces', 'https://guiadacozinha.com.br/wp-content/uploads/2012/01/croissant-de-chocolate.jpg', 'chocolate croissant', 27, NULL),
('prod_8', 'Tarta de Queso Clásica', 'Suave y cremosa, con base de galleta.', 3790, 'Dulces', 'https://cdn.recetasderechupete.com/wp-content/uploads/2018/03/Tarta-de-queso-Antonio.jpg', 'cheesecake slice', 38, NULL),
('prod_9', 'Cupcake Red Velvet', 'Esponjoso y con un glaseado de queso crema.', 2990, 'Dulces', 'https://www.rainbownourishments.com/wp-content/uploads/2023/02/vegan-red-velvet-cupcakes-1.jpg', 'red cupcake', 30, NULL),
('prod_10', 'Sándwich de Jamón y Queso', 'Un clásico que nunca falla.', 4990, 'Salados', 'https://s-api.qcart.app/images/comoquiero-uploads/images/recipes/originals/2065.jpg?s=716x600&fit=cover&ext=webp', 'ham sandwich', 50, NULL),
('prod_11', 'Tostada con Palta y Huevo', 'Con huevo pochado sobre pan artesanal.', 5490, 'Salados', 'https://cl-jumbo-recipes-cms.ecomm.cencosud.com/cms/cl/Recetas_Jumbo/view_version/660d7342f72e9dd4bd4725b1/8cb3e20c-0b5d-41ff-b446-b6cbc5021590.jpg', 'avocado toast', 55, NULL),
('prod_12', 'Quiche Lorraine', 'Tarta salada con tocino y queso.', 4790, 'Salados', 'https://www.rebanando.com/uploads/media/01-quiche-lorraine-2.jpg?1395574006', 'quiche lorraine', 47, NULL),
('redeem_1', 'Galleta de Chispas', 'Una galleta clásica, recién horneada.', 0, 'Canjeables', 'https://images.aws.nestle.recipes/resized/546910e19c08ec91b3345de4f718e09a_Original_NTH_Chocolate_Chip_Cookie_1080_850.jpg', 'chocolate chip cookie', NULL, 100),
('redeem_2', 'Café Americano (Pequeño)', 'Un café suave para cualquier momento del día.', 0, 'Canjeables', 'https://i.blogs.es/139e0f/cafe-americano2/840_560.jpeg', 'americano coffee', NULL, 150),
('redeem_3', 'Jugo Natural de Naranja', 'Exprimido al momento.', 0, 'Canjeables', 'https://media.gq.com.mx/photos/5e31d403309f5700081fc82c/master/pass/GettyImages-909604746.jpg', 'orange juice', NULL, 200);

-- Insertar testimonios de ejemplo.
INSERT INTO testimonials (id, name, quote, image, image_hint) VALUES
('test_1', 'Ana Sofía', '¡El mejor café que he probado! El servicio es rápido y la calidad insuperable. Me encanta que ahora sea virtual.', 'https://picsum.photos/seed/testimonial_1/100/100', 'smiling person'),
('test_2', 'Carlos Pérez', 'Los dulces son una maravilla, sobre todo el croissant de chocolate. ¡Siempre pido para toda la oficina!', 'https://picsum.photos/seed/testimonial_2/100/100', 'happy person'),
('test_3', 'Laura Gómez', 'El sistema de recomendaciones es genial. Me sugirió el Frappé de Caramelo y ahora es mi favorito. ¡Gracias, Aroma!', 'https://picsum.photos/seed/testimonial_3/100/100', 'customer portrait');
