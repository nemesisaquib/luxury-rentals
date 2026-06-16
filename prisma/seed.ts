import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listings = [
  {
    slug: "villa-limonaia-amalfi",
    title: "Villa Limonaia",
    location: "Amalfi Coast",
    country: "Italy",
    description:
      "A lemon-grove villa carved into the cliffs above Praiano. Wake to the smell of citrus and the sound of the Tyrrhenian below. Three terraces step down toward a private swim platform, and the kitchen opens fully to the sea breeze. Our scout spent two nights here and left reluctantly.",
    pricePerNight: 420,
    beds: 4,
    baths: 3,
    maxGuests: 8,
    rating: 4.97,
    reviewCount: 128,
    category: "Coastal",
    tag: "Rare find",
    amenities: "Sea view,Private pool,Wi-Fi,Air conditioning,Outdoor kitchen,Parking",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
    lat: 40.611, lng: 14.589,
    hostName: "Giulia",
    hostNote: "Skip the crowded beach clubs — take the cliff path left for 10 minutes to a cove only locals use. Bar Nettuno makes the best granita on the coast.",
    featured: true,
  },
  {
    slug: "casa-barro-oaxaca",
    title: "Casa Barro",
    location: "Oaxaca",
    country: "Mexico",
    description:
      "A handbuilt adobe casa in the foothills of the Sierra Norte, all warm clay walls and cool stone floors. The courtyard centres on a 200-year-old mezquite tree. Mornings are for coffee on the roof; evenings for mezcal under the stars.",
    pricePerNight: 140,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    rating: 4.91,
    reviewCount: 86,
    category: "Countryside",
    tag: "New",
    amenities: "Courtyard,Wi-Fi,Rooftop terrace,Fireplace,Outdoor shower,Kitchen",
    heroImage: "https://images.unsplash.com/photo-1585551897401-7b6c18e0b9d7?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1585551897401-7b6c18e0b9d7?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop",
    lat: 17.073, lng: -96.726,
    hostName: "Mateo",
    hostNote: "The Tlacolula market on Sundays is unmissable. Ask for Doña Reyna's tlayudas at the back — no sign, just follow the smoke.",
    featured: true,
  },
  {
    slug: "keepers-cottage-skye",
    title: "The Keeper's Cottage",
    location: "Isle of Skye",
    country: "Scotland",
    description:
      "A restored lighthouse keeper's cottage on a windswept headland, with the sea on three sides. Thick stone walls, a peat fire, and windows framing nothing but water and sky. Bring a book and stay in when the weather turns — it always does.",
    pricePerNight: 260,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    rating: 4.99,
    reviewCount: 154,
    category: "Coastal",
    tag: "Rare find",
    amenities: "Fireplace,Sea view,Wi-Fi,Wood stove,Hot water bottles,Parking",
    heroImage: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=900&q=80&auto=format&fit=crop",
    lat: 57.487, lng: -6.586,
    hostName: "Fiona",
    hostNote: "The Fairy Pools are stunning but go at dawn before the tour buses. Stop at Single Track café in Glendale for the best flat white on the island.",
    featured: false,
  },
  {
    slug: "quinta-do-sol-alentejo",
    title: "Quinta do Sol",
    location: "Alentejo",
    country: "Portugal",
    description:
      "A whitewashed farmhouse on twelve hectares of cork oak and olive, with a long lap pool facing the sunset. Slow is the only speed here. The kitchen garden supplies dinner; the hammocks supply the afternoon.",
    pricePerNight: 310,
    beds: 5,
    baths: 4,
    maxGuests: 10,
    rating: 4.94,
    reviewCount: 97,
    category: "Countryside",
    tag: "Trending",
    amenities: "Pool,Wi-Fi,Kitchen garden,Air conditioning,Fireplace,Parking,BBQ",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80&auto=format&fit=crop",
    lat: 38.566, lng: -7.913,
    hostName: "Inês",
    hostNote: "Drive to Monsaraz before sunset — the walled village glows gold. The wines from Herdade do Esporão are worth the cellar tour.",
    featured: true,
  },
  {
    slug: "machiya-loft-kyoto",
    title: "Machiya Loft",
    location: "Kyoto",
    country: "Japan",
    description:
      "A 100-year-old machiya townhouse in quiet Nishijin, restored with restraint — tatami, cedar, and a tsuboniwa garden no wider than your arms. Steps from the weavers' district and a short walk to the Kamo river.",
    pricePerNight: 185,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    rating: 4.96,
    reviewCount: 211,
    category: "City",
    tag: "New",
    amenities: "Garden,Wi-Fi,Soaking tub,Air conditioning,Tea set,Bicycle",
    heroImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80&auto=format&fit=crop",
    lat: 35.031, lng: 135.745,
    hostName: "Haruki",
    hostNote: "For breakfast, queue early at Smart Coffee for the egg sandwich. The Nishijin Textile Center has live loom demonstrations most mornings.",
    featured: false,
  },
  {
    slug: "fjordhytte-lofoten",
    title: "Fjordhytte",
    location: "Lofoten",
    country: "Norway",
    description:
      "A black-timber cabin on stilts over a still fjord, with a glass gable framing the peaks. Heated floors, a wood-fired sauna at the water's edge, and in winter, the northern lights overhead. Summer brings the midnight sun and water like glass.",
    pricePerNight: 230,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    rating: 4.98,
    reviewCount: 73,
    category: "Mountain",
    tag: "New",
    amenities: "Sauna,Fjord view,Wi-Fi,Heated floors,Kayak,Fireplace",
    heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop",
    lat: 68.235, lng: 13.617,
    hostName: "Sigrid",
    hostNote: "Paddle the kayak out at midnight in summer — the sun never sets. Reine village is the prettiest drive; stop at the bakery in Å.",
    featured: true,
  },
  {
    slug: "canal-house-amsterdam",
    title: "The Canal House",
    location: "Amsterdam",
    country: "Netherlands",
    description:
      "A slender 17th-century merchant's house on the Prinsengracht, four storeys connected by a staircase you'll learn to love. Beams overhead, the canal below, and the whole Jordaan at your door.",
    pricePerNight: 295,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    rating: 4.93,
    reviewCount: 142,
    category: "City",
    tag: "Trending",
    amenities: "Canal view,Wi-Fi,Kitchen,Bicycles,Fireplace,Washer",
    heroImage: "https://images.unsplash.com/photo-1558551649-e44c8f992010?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1558551649-e44c8f992010?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1459679749680-18eb1eb37b75?w=900&q=80&auto=format&fit=crop",
    lat: 52.374, lng: 4.883,
    hostName: "Bram",
    hostNote: "Skip the Anne Frank queue and book weeks ahead online. For canal-side lunch, Winkel 43 has the apple pie locals actually eat.",
    featured: false,
  },
  {
    slug: "stone-farmhouse-provence",
    title: "Mas des Oliviers",
    location: "Luberon",
    country: "France",
    description:
      "An 18th-century stone mas among lavender and olive groves in the Luberon valley. Shuttered windows, a courtyard fountain, and a pétanque pitch under the plane trees. The light here is the one the painters came for.",
    pricePerNight: 340,
    beds: 4,
    baths: 3,
    maxGuests: 8,
    rating: 4.95,
    reviewCount: 109,
    category: "Countryside",
    tag: "Rare find",
    amenities: "Pool,Lavender garden,Wi-Fi,Air conditioning,Pétanque,Fireplace,Parking",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&q=80&auto=format&fit=crop",
    lat: 43.832, lng: 5.358,
    hostName: "Camille",
    hostNote: "The Sunday market in Coustellet is the real one, not the tourist version. Buy lavender honey and the goat cheese wrapped in chestnut leaves.",
    featured: false,
  },
];

async function main() {
  console.log("Seeding…");
  
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.property.deleteMany();
  await prisma.host.deleteMany();
  await prisma.user.deleteMany();

  // Create a default host user
  const user = await prisma.user.create({
    data: {
      email: "host@hearthandkey.com",
      password: "password123", // normally hashed, fine for mock seed
      name: "Default Host",
      role: "HOST"
    }
  });

  const host = await prisma.host.create({
    data: {
      userId: user.id,
      payoutEmail: "host@hearthandkey.com"
    }
  });

  for (const l of listings) {
    const propertyData = {
      hostId: host.id,
      title: l.title,
      slug: l.slug,
      description: l.description,
      location: l.location,
      country: l.country,
      lat: l.lat,
      lng: l.lng,
      pricePerNight: l.pricePerNight,
      maxGuests: l.maxGuests,
      bedrooms: l.beds,
      bathrooms: l.baths,
      amenities: l.amenities.split(","),
      images: [l.heroImage, ...l.gallery.split(",")],
      featured: l.featured,
      status: "ACTIVE" as any // PropertyStatus.ACTIVE
    };
    await prisma.property.create({ data: propertyData });
  }
  console.log(`Seeded ${listings.length} properties.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
