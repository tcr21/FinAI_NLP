import "../quizzes/quiz-listing.css";
import UndefinedRouteResults from "./route-undefined-results";
import Route1Results from "./route1-results";
import Route2Results from "./route2-results";
import Route3Results from "./route3-results";

function ResultsListing({ route, serviceName }) {
  let contents;
  console.log("serviceName from ResultsListing ", serviceName);
  if (route === "route1") {
    contents = <Route1Results serviceName={serviceName} />;
  } else if (route === "route2") {
    contents = <Route2Results serviceName={serviceName} />;
  } else if (route === "route3") {
    contents = <Route3Results serviceName={serviceName} />;
  } else {
    contents = <UndefinedRouteResults serviceName={serviceName} />;
  }
  return <>{contents}</>;
}

export default ResultsListing;
