## Grafbase Extensions Demo

Demonstrates how to use Grafbase Extensions to extend the functionality of your GraphQL API by federating a REST API and integrating with NATS.

### Quickstart

1. Run `docker-compose up` to start the NATS server
2. Run `grafbase dev -c grafbase.toml -o graph-overrides.toml` to start the Grafbase dev server
3. Run `subscription.sh` to subscribe to GraphQL subscriptions
4. Open your browser and navigate to `http://localhost:5000` to view the Grafbase Explorer
