import HomeScreen from "./home-page";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_URL } from "@/api/common/CONSTANTS";
export default function index() {
  console.log("API_URL", API_URL);
  const client = new ApolloClient({
    uri: `http://${API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <HomeScreen />
    </ApolloProvider>
  );
}
