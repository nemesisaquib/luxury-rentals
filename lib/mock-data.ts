export const MOCK_LISTINGS = [
  {
    id: "1",
    slug: "the-glass-house",
    title: "The Glass House",
    location: "Hudson Valley",
    country: "USA",
    description: "Nestled quietly within 10 acres of pristine woodland, The Glass House offers an immersive nature experience without sacrificing modern luxury. Floor-to-ceiling windows blur the lines between indoors and out, letting you wake up to deer grazing in the morning mist. Designed by an award-winning architectural firm, this minimalist retreat features heated concrete floors, a suspended fireplace, and a chef's kitchen perfect for intimate gatherings.",
    pricePerNight: 450,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    rating: 4.98,
    reviewCount: 142,
    category: "Countryside",
    tag: "Trending",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80"
    ].join(","),
    amenities: "Wood-burning fireplace,Chef's Kitchen,Outdoor Fire Pit,Fast WiFi,Radiant Floor Heating,Soaking Tub",
    hostName: "Eleanor",
    hostNote: "Be sure to grab fresh eggs from the farm stand down the road. If you're lucky, you might spot the red foxes playing near the creek at dusk.",
    featured: true,
    lat: 41.8,
    lng: -74.0,
  },
  {
    id: "2",
    slug: "cliffside-villa",
    title: "Cliffside Villa",
    location: "Amalfi Coast",
    country: "Italy",
    description: "Perched dramatically on the cliffs of the Amalfi Coast, this historic 19th-century villa combines traditional Italian charm with breathtaking Mediterranean views. Step out onto the expansive wraparound terrace to sip espresso while watching the boats drift by. The villa features hand-painted majolica tiles, a private infinity pool seamlessly carved into the rock, and a fragrant lemon grove trailing down the hillside.",
    pricePerNight: 850,
    beds: 4,
    baths: 3,
    maxGuests: 8,
    rating: 4.95,
    reviewCount: 89,
    category: "Coastal",
    tag: "Rare find",
    heroImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
      "https://images.unsplash.com/photo-1533654793924-4fc4949deaf9?w=1200&q=80",
      "https://images.unsplash.com/photo-1543661875-92ff1500cdcb?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
    ].join(","),
    amenities: "Infinity Pool,Private Beach Access,Terrace,Air Conditioning,Concierge Service,Espresso Machine",
    hostName: "Matteo",
    hostNote: "Take the hidden stone stairs directly down to a secluded cove. My favorite local spot for dinner is Trattoria da Cumpa'—ask for the lemon pasta, it's off-menu.",
    featured: true,
    lat: 40.6,
    lng: 14.6,
  },
  {
    id: "3",
    slug: "desert-oasis",
    title: "Desert Oasis",
    location: "Joshua Tree",
    country: "USA",
    description: "Experience the magic of the high desert in this beautifully restored mid-century modern home. Surrounded by ancient Joshua Trees and massive boulders, this is the ultimate sanctuary for stargazing and disconnection. The interior blends vintage furniture with modern comforts, while the backyard oasis boasts a cedar hot tub, an outdoor shower, and a vintage Airstream trailer transformed into a cozy reading nook.",
    pricePerNight: 320,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    rating: 4.89,
    reviewCount: 215,
    category: "Desert",
    tag: null,
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
      "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80"
    ].join(","),
    amenities: "Cedar Hot Tub,Outdoor Shower,Star-Gazing Deck,Record Player,BBQ Grill,Desert Landscaping",
    hostName: "Sarah",
    hostNote: "The Milky Way is spectacular around 2 AM here. Wrap up in the provided wool blankets and lay out on the deck. Pappy & Harriet's is a must-visit for live music and ribs.",
    featured: true,
    lat: 34.1,
    lng: -116.3,
  }
];

export const MOCK_MESSAGES = [
  {
    id: "msg-1",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    subject: "Hosting Inquiry",
    message: "I have a restored 18th-century farmhouse in Provence. I'm interested in applying to be a host on Hearth & Key. What are the specific requirements?",
    status: "UNREAD",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: "msg-2",
    name: "James Holden",
    email: "j.holden@example.com",
    subject: "Concierge Services",
    message: "We're booking 'The Glass House' next month for an anniversary. Can you help arrange a private chef for one of the evenings?",
    status: "READ",
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
  },
  {
    id: "msg-3",
    name: "Sophia Rossi",
    email: "sophia.rossi@example.com",
    subject: "Press/Media Collab",
    message: "Hi team! I'm a travel editor at a major publication and would love to feature Hearth & Key in our upcoming 'Best Luxury Stays' issue. Who is the best person to speak with?",
    status: "READ",
    createdAt: new Date(Date.now() - 86400000 * 12), // 12 days ago
  }
];

export let MOCK_FAQS = [
  {
    id: "faq-1",
    question: "What is the Hearth & Key Zero-Fee Guarantee?",
    answer: "Unlike other platforms that charge guests a 15-20% service fee at checkout, Hearth & Key charges absolutely zero guest service fees. The nightly rate you see is exactly what you pay. We charge hosts a flat commission instead, ensuring complete transparency for our guests."
  },
  {
    id: "faq-2",
    question: "How do you vet your properties?",
    answer: "Every home on Hearth & Key is scouted in-person by our team. We evaluate over 100 criteria including design aesthetic, architectural significance, premium amenities, and the quality of the surrounding neighborhood before inviting a host to join our platform."
  },
  {
    id: "faq-3",
    question: "Can I cancel my reservation?",
    answer: "Cancellation policies vary by host. Generally, our hosts offer full refunds for cancellations made at least 14 days prior to check-in. You can view the specific cancellation policy for any property on its listing page before you book."
  },
  {
    id: "faq-4",
    question: "Do you offer concierge services?",
    answer: "Yes. For select premium stays, our complimentary concierge can assist with private chefs, daily housekeeping, luxury transportation, and curated local itineraries. Contact our support team after booking to arrange services."
  }
];

export let MOCK_JOBS = [
  {
    id: "job-1",
    title: "Senior Property Scout",
    location: "Los Angeles, CA",
    type: "Full-time",
    department: "Real Estate",
    description: "We are looking for an experienced scout to travel across California to vet luxury coastal properties.",
    status: "ACTIVE",
    createdAt: new Date("2026-06-01T10:00:00Z").toISOString(),
  },
  {
    id: "job-2",
    title: "Guest Experience Concierge",
    location: "Remote (US)",
    type: "Full-time",
    department: "Support",
    description: "Provide white-glove support to our guests before, during, and after their stays.",
    status: "ACTIVE",
    createdAt: new Date("2026-06-10T14:30:00Z").toISOString(),
  }
];

export let MOCK_APPLICATIONS = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Property Scout",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    portfolio: "https://sarahjenkins.com",
    message: "I've been scouting luxury real estate for 5 years and love your brand.",
    status: "UNREAD",
    createdAt: new Date("2026-06-12T09:15:00Z").toISOString(),
  }
];
