# Demo REST API

To run this server:

1. Make sure you have Bun installed
2. Install Elysia: `bun add elysia`
3. Run the server: `bun run countries-server.ts`

This API provides several endpoints:
- GET `/api/countries` - Get all countries
- GET `/api/countries/filter?fictional=true|false` - Filter by real/fictional
- GET `/api/countries/:id` - Get a country by ID
- GET `/api/continents/:continent/countries` - Get countries by continent
- GET `/api/countries/search?name=search_term` - Search countries by name

The database includes both real countries like the US, Japan, and Brazil, as well as fictional ones like Wakanda, Westeros, and Narnia.
