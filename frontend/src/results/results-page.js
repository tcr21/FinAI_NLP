import ResultsListing from "./results-listing";

function ResultsPage({ routeServiceName }) {
  if (routeServiceName === null) return <p>Waiting for user input</p>;
  return (
    <main>
      <h1>Results</h1>
      <ResultsListing
        route={routeServiceName.data.route}
        serviceName={routeServiceName.data.service}
      />
    </main>
  );
}

export default ResultsPage;
