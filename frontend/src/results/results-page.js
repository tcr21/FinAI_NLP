import ResultsListing from "./results-listing";

function ResultsPage({ serviceName }) {
  if (serviceName === null) return <p>Waiting for user input</p>;
  console.log("serviceName.data.route: ", serviceName.data.route);
  console.log("serviceName.data.route: ", serviceName.data.service);
  return (
    <main>
      <h1>Results</h1>
      <ResultsListing
        route={serviceName.data.route}
        serviceName={serviceName.data.service}
      />
    </main>
  );
}

export default ResultsPage;
