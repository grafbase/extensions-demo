// countries-server.ts
import { Elysia } from "elysia";

// Define Country interface
interface Country {
  id: number;
  name: string;
  capital: string;
  population: number;
  continent: string;
  currency: string;
  language: string[];
  fictional: boolean;
}

// Hardcoded database of real and fictional countries
const countries: Country[] = [
  {
    id: 1,
    name: "United States",
    capital: "Washington D.C.",
    population: 331_000_000,
    continent: "North America",
    currency: "USD",
    language: ["English"],
    fictional: false,
  },
  {
    id: 2,
    name: "Japan",
    capital: "Tokyo",
    population: 126_000_000,
    continent: "Asia",
    currency: "JPY",
    language: ["Japanese"],
    fictional: false,
  },
  {
    id: 3,
    name: "France",
    capital: "Paris",
    population: 67_000_000,
    continent: "Europe",
    currency: "EUR",
    language: ["French"],
    fictional: false,
  },
  {
    id: 4,
    name: "Wakanda",
    capital: "Birnin Zana",
    population: 6_000_000,
    continent: "Africa",
    currency: "Wakandan Dollar",
    language: ["Wakandan", "Xhosa"],
    fictional: true,
  },
  {
    id: 5,
    name: "Westeros",
    capital: "King's Landing",
    population: 40_000_000,
    continent: "Westeros",
    currency: "Gold Dragon",
    language: ["Common Tongue"],
    fictional: true,
  },
  {
    id: 6,
    name: "Genovia",
    capital: "Pyrus",
    population: 500_000,
    continent: "Europe",
    currency: "Genovian Franc",
    language: ["English", "French"],
    fictional: true,
  },
  {
    id: 7,
    name: "Brazil",
    capital: "Brasília",
    population: 212_000_000,
    continent: "South America",
    currency: "BRL",
    language: ["Portuguese"],
    fictional: false,
  },
  {
    id: 8,
    name: "Narnia",
    capital: "Cair Paravel",
    population: 200_000,
    continent: "Narnia",
    currency: "Lion",
    language: ["Narnian English"],
    fictional: true,
  },
];

// Create the Elysia app
const app = new Elysia()
  .get(
    "/",
    () => "Welcome to the Countries API! Use /api/countries to get started.",
  )

  // Get all countries
  .get("/api/countries", () => countries)

  // Get countries with optional filter for real/fictional
  .get("/api/countries/filter", ({ query }) => {
    const isFictional =
      query.fictional === "true"
        ? true
        : query.fictional === "false"
          ? false
          : undefined;

    if (isFictional === undefined) {
      return countries;
    }

    return countries.filter((country) => country.fictional === isFictional);
  })

  // Get country by ID
  .get("/api/countries/:id", ({ params }) => {
    const country = countries.find((c) => c.id === parseInt(params.id));
    if (!country) {
      return new Response(JSON.stringify({ error: "Country not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return country;
  })

  // Get countries by continent
  .get("/api/continents/:continent/countries", ({ params }) => {
    const continentCountries = countries.filter(
      (c) => c.continent.toLowerCase() === params.continent.toLowerCase(),
    );

    if (continentCountries.length === 0) {
      return new Response(
        JSON.stringify({ error: "No countries found for this continent" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return continentCountries;
  })

  // Search countries by name
  .get("/api/countries/search", ({ query }) => {
    if (!query.name) {
      return new Response(
        JSON.stringify({ error: "Search query parameter 'name' is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const searchResults = countries.filter((country) =>
      country.name.toLowerCase().includes(query.name.toLowerCase()),
    );

    return searchResults;
  })

  // Server port
  .listen(3000);

console.log(
  `🚀 Countries API server is running at ${app.server?.hostname}:${app.server?.port}`,
);

// For running with Bun:
// bun run countries-server.ts
