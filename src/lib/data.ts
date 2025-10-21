import type { Product, Testimonial, User, Order, PointsHistoryEntry } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod_1', name: 'Café Caliente Clásico', description: 'Un café negro, rico y aromático.', price: 2390, category: 'Bebestibles Calientes', image: 'https://cdn.shopify.com/s/files/1/2964/0212/files/42_b0706929-b3f8-4f6c-bfe9-53a36b1df554_480x480.png?v=1720472518', imageHint: 'hot coffee', points: 25 },
  { id: 'prod_2', name: 'Espresso Intenso', description: 'Un shot de energía pura.', price: 1990, category: 'Bebestibles Calientes', image: 'https://sumatocoffee.com/cdn/shop/articles/espresso_d93cf1fb-0d4d-4da2-877f-c8226560ea4a.png?v=1758145494&width=640', imageHint: 'espresso shot', points: 20 },
  { id: 'prod_3', name: 'Cappuccino Cremoso', description: 'Espresso, leche vaporizada y espuma.', price: 3490, category: 'Bebestibles Calientes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Cappuccino_PeB.jpg/1200px-Cappuccino_PeB.jpg', imageHint: 'cappuccino art', points: 35 },
  { id: 'prod_4', name: 'Frappé de Caramelo', description: 'Hielo, café y un toque dulce de caramelo.', price: 4290, category: 'Frappes / Bebidas Frías', image: 'https://i0.wp.com/caferama.com/wp-content/uploads/2023/01/caramel-dra.jpg?fit=768%2C512&ssl=1', imageHint: 'iced frappe', points: 45 },
  { id: 'prod_5', name: 'Smoothie de Frutas', description: 'Una mezcla refrescante de frutas de temporada.', price: 3990, category: 'Frappes / Bebidas Frías', image: 'https://s3.amazonaws.com/static.realcaliforniamilk.com/media/foodservice/Super_Berry_Smoothie.jpg', imageHint: 'fruit smoothie', points: 40 },
  { id: 'prod_6', name: 'Malteada de Chocolate', description: 'Cremosa y con un intenso sabor a chocolate.', price: 4290, category: 'Frappes / Bebidas Frías', image: 'https://i0.wp.com/sarasellos.com/wp-content/uploads/2024/07/milkshake-chocolate-5.jpg?resize=683%2C1024&ssl=1', imageHint: 'chocolate milkshake', points: 42 },
  { id: 'prod_7', name: 'Croissant de Chocolate', description: 'Hojaldre relleno de chocolate derretido.', price: 2690, category: 'Dulces', image: 'https://guiadacozinha.com.br/wp-content/uploads/2012/01/croissant-de-chocolate.jpg', imageHint: 'chocolate croissant', points: 27 },
  { id: 'prod_8', name: 'Tarta de Queso Clásica', description: 'Suave y cremosa, con base de galleta.', price: 3790, category: 'Dulces', image: 'https://cdn.recetasderechupete.com/wp-content/uploads/2018/03/Tarta-de-queso-Antonio.jpg', imageHint: 'cheesecake slice', points: 38 },
  { id: 'prod_9', name: 'Cupcake Red Velvet', description: 'Esponjoso y con un glaseado de queso crema.', price: 2990, category: 'Dulces', image: 'https://www.rainbownourishments.com/wp-content/uploads/2023/02/vegan-red-velvet-cupcakes-1.jpg', imageHint: 'red cupcake', points: 30 },
  { id: 'prod_10', name: 'Sándwich de Jamón y Queso', description: 'Un clásico que nunca falla.', price: 4990, category: 'Salados', image: 'https://s-api.qcart.app/images/comoquiero-uploads/images/recipes/originals/2065.jpg?s=716x600&fit=cover&ext=webp', imageHint: 'ham sandwich', points: 50 },
  { id: 'prod_11', name: 'Tostada con Palta y Huevo', description: 'Con huevo pochado sobre pan artesanal.', price: 5490, category: 'Salados', image: 'https://cl-jumbo-recipes-cms.ecomm.cencosud.com/cms/cl/Recetas_Jumbo/view_version/660d7342f72e9dd4bd4725b1/8cb3e20c-0b5d-41ff-b446-b6cbc5021590.jpg', imageHint: 'avocado toast', points: 55 },
  { id: 'prod_12', name: 'Quiche Lorraine', description: 'Tarta salada con tocino y queso.', price: 4790, category: 'Salados', image: 'https://www.rebanando.com/uploads/media/01-quiche-lorraine-2.jpg?1395574006', imageHint: 'quiche lorraine', points: 47 },
  // Redeemable Products
  { id: 'redeem_1', name: 'Galleta de Chispas', description: 'Una galleta clásica, recién horneada.', price: 0, category: 'Canjeables', image: 'https://images.aws.nestle.recipes/resized/546910e19c08ec91b3345de4f718e09a_Original_NTH_Chocolate_Chip_Cookie_1080_850.jpg', imageHint: 'chocolate chip cookie', pointsCost: 100 },
  { id: 'redeem_2', name: 'Café Americano (Pequeño)', description: 'Un café suave para cualquier momento del día.', price: 0, category: 'Canjeables', image: 'https://i.blogs.es/139e0f/cafe-americano2/840_560.jpeg', imageHint: 'americano coffee', pointsCost: 150 },
  { id: 'redeem_3', name: 'Jugo Natural de Naranja', description: 'Exprimido al momento.', price: 0, category: 'Canjeables', image: 'https://media.gq.com.mx/photos/5e31d403309f5700081fc82c/master/pass/GettyImages-909604746.jpg', imageHint: 'orange juice', pointsCost: 200 },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
    { id: 'test_1', name: 'Ana Sofía', quote: '¡El mejor café que he probado! El servicio es rápido y la calidad insuperable. Me encanta que ahora sea virtual.', image: 'https://picsum.photos/seed/testimonial_1/100/100', imageHint: 'smiling person' },
    { id: 'test_2', name: 'Carlos Pérez', quote: 'Los dulces son una maravilla, sobre todo el croissant de chocolate. ¡Siempre pido para toda la oficina!', image: 'https://picsum.photos/seed/testimonial_2/100/100', imageHint: 'happy person' },
    { id: 'test_3', name: 'Laura Gómez', quote: 'El sistema de recomendaciones es genial. Me sugirió el Frappé de Caramelo y ahora es mi favorito. ¡Gracias, Aroma!', image: 'https://picsum.photos/seed/testimonial_3/100/100', imageHint: 'customer portrait' },
];

export const MOCK_USERS: User[] = [
    {
        id: 'admin_user',
        name: 'Admin',
        email: 'admin@aroma.com',
        password: 'adminpassword123',
        role: 'admin',
        points: 9999,
        profilePicture: 'https://picsum.photos/seed/admin_user/128/128'
    }
];

export const MOCK_ORDERS: Order[] = [];

export const MOCK_POINTS_HISTORY: PointsHistoryEntry[] = [];
