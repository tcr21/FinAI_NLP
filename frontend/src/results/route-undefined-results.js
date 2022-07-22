import Route1Results from "./route1-results";
import Route2Results from "./route2-results";
import Route3Results from "./route3-results";

function UndefinedRouteResults({ serviceName }) {
  let contents;
  if (serviceName[0] === "route1") {
    contents = <Route1Results serviceName={serviceName} />;
  } else if (serviceName[0] === "route2") {
    contents = <Route2Results serviceName={serviceName} />;
  } else if (serviceName[0] === "route3") {
    contents = <Route3Results serviceName={serviceName} />;
  } else {
    contents = (
      <p>
        Sorry, we haven't found any suggestions for what you wrote. Please try
        to re-phrase your answers.
      </p>
    );
  }

  return contents;
}

export default UndefinedRouteResults;
