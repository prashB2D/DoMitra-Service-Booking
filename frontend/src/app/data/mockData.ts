export interface Category {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  city: string;
  state: string;
  priceMin: number;
  priceMax: number;
  categoryId: number;
  phone: string;
  image: string;
  providerId: string;
  views: number;
  contacts: number;
}

export const categories: Category[] = [
  { id: 1, name: "Plumbing" },
  { id: 2, name: "Electrical" },
  { id: 3, name: "Carpentry" },
  { id: 4, name: "Painting" },
  { id: 5, name: "AC Repair" },
];

export const indianCities = [
  { city: "Hassan", state: "Karnataka" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Mysore", state: "Karnataka" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Bhopal", state: "Madhya Pradesh" },
];

export const mockServices: Service[] = [
  {
    id: 1,
    title: "Expert Plumbing Repair",
    description:
      "Professional plumbing services for homes and offices. Experienced in fixing leaks, installing pipes, and bathroom fittings. Available 24/7 for emergency repairs.",
    city: "Hassan",
    state: "Karnataka",
    priceMin: 300,
    priceMax: 700,
    categoryId: 1,
    phone: "9876543210",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800",
    providerId: "1",
    views: 120,
    contacts: 25,
  },
  {
    id: 2,
    title: "Professional Electrician Services",
    description:
      "Licensed electrician with 10+ years experience. Specializing in home wiring, electrical repairs, and installations. Safety certified.",
    city: "Bangalore",
    state: "Karnataka",
    priceMin: 400,
    priceMax: 1000,
    categoryId: 2,
    phone: "9876543211",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
    providerId: "2",
    views: 85,
    contacts: 18,
  },
  {
    id: 3,
    title: "Custom Carpentry Work",
    description:
      "Quality carpentry services for furniture making, repairs, and custom woodwork. Skilled in modern and traditional designs.",
    city: "Hassan",
    state: "Karnataka",
    priceMin: 500,
    priceMax: 1500,
    categoryId: 3,
    phone: "9876543212",
    image: "https://images.unsplash.com/photo-1585128903994-80d902f8c814?w=800",
    providerId: "3",
    views: 95,
    contacts: 22,
  },
  {
    id: 4,
    title: "House Painting Services",
    description:
      "Interior and exterior painting services. Premium quality paints used. Clean and professional work guaranteed.",
    city: "Mysore",
    state: "Karnataka",
    priceMin: 2000,
    priceMax: 5000,
    categoryId: 4,
    phone: "9876543213",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
    providerId: "4",
    views: 110,
    contacts: 30,
  },
  {
    id: 5,
    title: "AC Repair & Maintenance",
    description:
      "Expert AC repair, installation, and regular maintenance. All brands serviced. Quick response time.",
    city: "Hassan",
    state: "Karnataka",
    priceMin: 350,
    priceMax: 800,
    categoryId: 5,
    phone: "9876543214",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800",
    providerId: "5",
    views: 150,
    contacts: 35,
  },
  {
    id: 6,
    title: "Emergency Plumbing Solutions",
    description:
      "Fast and reliable plumbing services. Leak detection, pipe repairs, and drainage solutions. Available on short notice.",
    city: "Bangalore",
    state: "Karnataka",
    priceMin: 250,
    priceMax: 600,
    categoryId: 1,
    phone: "9876543215",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800",
    providerId: "1",
    views: 75,
    contacts: 15,
  },
  {
    id: 7,
    title: "Home Electrical Wiring",
    description:
      "Complete electrical solutions for new homes and renovations. LED installations, safety checks, and modern electrical panels.",
    city: "Mumbai",
    state: "Maharashtra",
    priceMin: 600,
    priceMax: 1200,
    categoryId: 2,
    phone: "9876543216",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    providerId: "2",
    views: 130,
    contacts: 28,
  },
  {
    id: 8,
    title: "Furniture Making & Repair",
    description:
      "Custom furniture design and repair services. Specializing in wooden furniture, restoration, and polishing.",
    city: "Delhi",
    state: "Delhi",
    priceMin: 800,
    priceMax: 2000,
    categoryId: 3,
    phone: "9876543217",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    providerId: "3",
    views: 65,
    contacts: 12,
  },
];
