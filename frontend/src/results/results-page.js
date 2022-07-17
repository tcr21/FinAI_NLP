import ResultsListing from "./results-listing";

function ResultsPage({ route, serviceName }) {
  return (
    <main>
      <h1>Results</h1>
      <ResultsListing route={route} serviceName={serviceName} />
    </main>
  );
}

export default ResultsPage;
