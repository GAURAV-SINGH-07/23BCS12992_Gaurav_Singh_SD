
require('dotenv').config();
const { sequelize, User, Category, Product } = require('./models');

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ force: true });
    console.log('✅ Tables recreated');

    // Default user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'hashed_password_placeholder',
    });
    console.log('✅ Default user created');

    // Categories
    const categories = await Category.bulkCreate([
      { name: 'Electronics', slug: 'electronics', image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300' },
      { name: 'Books', slug: 'books', image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300' },
      { name: 'Clothing', slug: 'clothing', image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300' },
      { name: 'Home & Kitchen', slug: 'home-kitchen', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300' },
      { name: 'Sports & Outdoors', slug: 'sports-outdoors', image_url: 'https://images.unsplash.com/photo-1461896836934-bd45ba680e4b?w=300' },
      { name: 'Beauty & Personal Care', slug: 'beauty', image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300' },
    ]);
    console.log('✅ Categories created');

    // Products
    const products = [
      // Electronics
      {
        name: 'Apple iPhone 15 Pro Max - 256GB - Natural Titanium',
        description: 'iPhone 15 Pro Max features a strong and light titanium design with a textured matte-glass back. It also features the A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
        price: 1199.00,
        original_price: 1299.00,
        category_id: categories[0].id,
        stock_quantity: 50,
        rating: 4.7,
        review_count: 2847,
        brand: 'Apple',
        images: [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
          'https://images.unsplash.com/photo-1591337676887-a217a6c7cdb3?w=600',
        ],
        specifications: { Display: '6.7-inch Super Retina XDR', Chip: 'A17 Pro', Storage: '256GB', Camera: '48MP Main', Battery: 'Up to 29 hrs video playback' },
      },
      {
        name: 'Samsung Galaxy S24 Ultra 5G - 512GB - Titanium Black',
        description: 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium frame and a 200MP camera.',
        price: 1299.99,
        original_price: 1419.99,
        category_id: categories[0].id,
        stock_quantity: 35,
        rating: 4.5,
        review_count: 1923,
        brand: 'Samsung',
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
          'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600',
        ],
        specifications: { Display: '6.8-inch Dynamic AMOLED 2X', Processor: 'Snapdragon 8 Gen 3', Storage: '512GB', Camera: '200MP Wide', Battery: '5000 mAh' },
      },
      {
        name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        description: 'Industry-leading noise canceling with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones.',
        price: 348.00,
        original_price: 399.99,
        category_id: categories[0].id,
        stock_quantity: 120,
        rating: 4.6,
        review_count: 8452,
        brand: 'Sony',
        images: [
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600',
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600',
        ],
        specifications: { Type: 'Over-ear', 'Noise Canceling': 'Yes - Auto NC Optimizer', 'Battery Life': '30 hours', Connectivity: 'Bluetooth 5.2', Weight: '250g' },
      },
      {
        name: 'Apple MacBook Pro 16" M3 Max - 36GB RAM - 1TB SSD',
        description: 'The most advanced Mac laptops for demanding workflows. Supercharged by M3 Max chip for exceptional performance.',
        price: 3499.00,
        original_price: 3699.00,
        category_id: categories[0].id,
        stock_quantity: 20,
        rating: 4.8,
        review_count: 1256,
        brand: 'Apple',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
        ],
        specifications: { Display: '16.2-inch Liquid Retina XDR', Chip: 'M3 Max', Memory: '36GB', Storage: '1TB SSD', Battery: 'Up to 22 hrs' },
      },
      {
        name: 'Logitech MX Master 3S Wireless Mouse - Graphite',
        description: 'Master any task at hand with MX Master 3S - an iconic mouse remastered. Feel every satisfying moment of a wheel engineered to be magnetically precise.',
        price: 99.99,
        original_price: 109.99,
        category_id: categories[0].id,
        stock_quantity: 200,
        rating: 4.7,
        review_count: 5643,
        brand: 'Logitech',
        images: [
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
          'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600',
        ],
        specifications: { Type: 'Wireless', Sensor: '8000 DPI', Battery: '70 days on full charge', Connectivity: 'Bluetooth / USB receiver', Weight: '141g' },
      },

      // Books
      {
        name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
        description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you how to form good habits.',
        price: 11.98,
        original_price: 27.00,
        category_id: categories[1].id,
        stock_quantity: 500,
        rating: 4.8,
        review_count: 98234,
        brand: 'James Clear',
        images: [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
        ],
        specifications: { Format: 'Hardcover', Pages: '320', Publisher: 'Avery', Language: 'English', ISBN: '978-0735211292' },
      },
      {
        name: 'The Psychology of Money: Timeless Lessons on Wealth',
        description: 'Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
        price: 14.99,
        original_price: 18.99,
        category_id: categories[1].id,
        stock_quantity: 350,
        rating: 4.7,
        review_count: 65234,
        brand: 'Morgan Housel',
        images: [
          'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600',
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600',
        ],
        specifications: { Format: 'Paperback', Pages: '256', Publisher: 'Harriman House', Language: 'English', ISBN: '978-0857197689' },
      },
      {
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. This book is a must for any developer.',
        price: 33.49,
        original_price: 49.99,
        category_id: categories[1].id,
        stock_quantity: 150,
        rating: 4.6,
        review_count: 12456,
        brand: 'Robert C. Martin',
        images: [
          'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
        ],
        specifications: { Format: 'Paperback', Pages: '464', Publisher: 'Pearson', Language: 'English', ISBN: '978-0132350884' },
      },

      // Clothing
      {
        name: "Levi's Men's 501 Original Fit Jeans - Dark Stonewash",
        description: "The original jean. The 501 Original Fit sits at the waist and is regular through the thigh, with a straight leg. Button fly.",
        price: 49.99,
        original_price: 69.50,
        category_id: categories[2].id,
        stock_quantity: 300,
        rating: 4.4,
        review_count: 23456,
        brand: "Levi's",
        images: [
          'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
        ],
        specifications: { Material: '100% Cotton', Fit: 'Original Fit', Rise: 'Regular', Closure: 'Button Fly', Care: 'Machine Washable' },
      },
      {
        name: 'Nike Air Force 1 Low - White/White',
        description: 'The radiance lives on in the Nike Air Force 1. This b-ball legend puts a fresh spin on what you know best.',
        price: 90.00,
        original_price: 115.00,
        category_id: categories[2].id,
        stock_quantity: 180,
        rating: 4.7,
        review_count: 45678,
        brand: 'Nike',
        images: [
          'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
        ],
        specifications: { Material: 'Leather Upper', Sole: 'Air-Sole Unit', Closure: 'Lace-up', Style: 'Low Top', Color: 'White/White' },
      },
      {
        name: 'Champion Men\'s Powerblend Pullover Hoodie - Oxford Grey',
        description: 'This throwback Champion Powerblend hoodie keeps its shape after every wash. Made with a cotton-poly blend fleece for warmth.',
        price: 29.99,
        original_price: 45.00,
        category_id: categories[2].id,
        stock_quantity: 250,
        rating: 4.5,
        review_count: 34567,
        brand: 'Champion',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
          'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600',
        ],
        specifications: { Material: '50% Cotton, 50% Polyester', Fit: 'Relaxed', Features: 'Reduced Pilling, Kangaroo Pocket', Hood: 'Drawstring', Care: 'Machine Washable' },
      },

      // Home & Kitchen
      {
        name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker - 6 Quart',
        description: 'Best selling multi-cooker. 7 Appliances in 1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté pan, Yogurt Maker and Warmer.',
        price: 79.99,
        original_price: 99.95,
        category_id: categories[3].id,
        stock_quantity: 100,
        rating: 4.7,
        review_count: 156789,
        brand: 'Instant Pot',
        images: [
          'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
        ],
        specifications: { Capacity: '6 Quart', Functions: '7-in-1', Material: 'Stainless Steel', Wattage: '1000W', Dimensions: '13.4 x 12.2 x 12.5 in' },
      },
      {
        name: 'Keurig K-Elite Coffee Maker - Brushed Silver',
        description: 'Enjoy a smooth, great-tasting cup of coffee, iced coffee, or specialty beverages at the press of a button.',
        price: 149.99,
        original_price: 189.99,
        category_id: categories[3].id,
        stock_quantity: 75,
        rating: 4.5,
        review_count: 34567,
        brand: 'Keurig',
        images: [
          'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600',
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
        ],
        specifications: { 'Water Reservoir': '75 oz', 'Brew Sizes': '4, 6, 8, 10, 12 oz', Feature: 'Strong Brew, Iced Setting', Color: 'Brushed Silver', 'Auto Off': 'Yes' },
      },
      {
        name: 'iRobot Roomba 694 Robot Vacuum - Wi-Fi Connected',
        description: 'The Roomba 694 robot vacuum uses a 3-Stage Cleaning System with Dual Multi-Surface Brushes to pick up everything from small particles to large debris.',
        price: 179.99,
        original_price: 274.99,
        category_id: categories[3].id,
        stock_quantity: 60,
        rating: 4.3,
        review_count: 45678,
        brand: 'iRobot',
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
          'https://images.unsplash.com/photo-1589894404892-7310b92ea7a2?w=600',
        ],
        specifications: { 'Cleaning System': '3-Stage', 'Run Time': '90 min', 'Smart Features': 'Wi-Fi, Voice Control', Navigation: 'iAdapt', Filter: 'Standard' },
      },

      // Sports & Outdoors
      {
        name: 'YETI Rambler 26 oz Bottle with Chug Cap - Navy',
        description: 'This stainless steel vacuum insulated bottle keeps your water the perfect cold temperature all day long.',
        price: 35.00,
        original_price: 40.00,
        category_id: categories[4].id,
        stock_quantity: 400,
        rating: 4.8,
        review_count: 23456,
        brand: 'YETI',
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
          'https://images.unsplash.com/photo-1523362628745-0c100fc988a1?w=600',
        ],
        specifications: { Volume: '26 oz', Material: '18/8 Stainless Steel', Insulation: 'Double-Wall Vacuum', Cap: 'Chug Cap', 'Dishwasher Safe': 'Yes' },
      },
      {
        name: 'Fitbit Charge 5 Fitness Tracker - Black/Graphite',
        description: 'Optimize your workout with a Daily Readiness Score, built-in GPS, stress management tools, sleep tracking, 24/7 heart rate and more.',
        price: 119.95,
        original_price: 149.95,
        category_id: categories[4].id,
        stock_quantity: 90,
        rating: 4.2,
        review_count: 12345,
        brand: 'Fitbit',
        images: [
          'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600',
          'https://images.unsplash.com/photo-1510017803434-a899b57f5a67?w=600',
        ],
        specifications: { Display: 'Color AMOLED', Sensors: 'Heart Rate, SpO2, EDA, GPS', Battery: 'Up to 7 days', 'Water Resistant': '50m', Compatibility: 'iOS & Android' },
      },
      {
        name: 'Coleman Sundome Camping Tent - 4 Person - Green',
        description: 'Set up camp in 10 minutes with this spacious 4-person tent. Features WeatherTec system with patented welded floors and inverted seams.',
        price: 69.99,
        original_price: 99.99,
        category_id: categories[4].id,
        stock_quantity: 45,
        rating: 4.5,
        review_count: 34567,
        brand: 'Coleman',
        images: [
          'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
          'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
        ],
        specifications: { Capacity: '4 Person', Dimensions: "9' x 7'", Height: "4'11\"", Material: 'Polyester', Setup: '10 minutes' },
      },

      // Beauty & Personal Care
      {
        name: 'CeraVe Moisturizing Cream - 19 oz - Body and Face Moisturizer',
        description: 'Developed with dermatologists. CeraVe Moisturizing Cream has a unique formula with 3 essential ceramides to help restore the skin barrier.',
        price: 16.08,
        original_price: 21.99,
        category_id: categories[5].id,
        stock_quantity: 600,
        rating: 4.7,
        review_count: 98765,
        brand: 'CeraVe',
        images: [
          'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
        ],
        specifications: { Size: '19 oz', Type: 'Cream', Skin: 'Dry to Very Dry', Key: 'Ceramides, Hyaluronic Acid', 'Fragrance-Free': 'Yes' },
      },
      {
        name: 'Dyson Airwrap Multi-Styler Complete - Nickel/Copper',
        description: 'Engineered for multiple hair types. Style, smooth, or dry with no extreme heat damage. Coanda air technology styles and hides flyaways.',
        price: 499.99,
        original_price: 599.99,
        category_id: categories[5].id,
        stock_quantity: 30,
        rating: 4.3,
        review_count: 8765,
        brand: 'Dyson',
        images: [
          'https://images.unsplash.com/photo-1522338242992-e1a54571a8f5?w=600',
          'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600',
        ],
        specifications: { Motor: 'Dyson digital motor V9', Technology: 'Coanda air styling', Attachments: '6 styling accessories', Heat: 'Intelligent heat control', Weight: '660g' },
      },
    ];

    await Product.bulkCreate(products);
    console.log(`✅ ${products.length} products created`);

    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();