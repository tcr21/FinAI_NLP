function Route3Results({ serviceName }) {
  let contents;
  // Case in which bert said route3 but gpt said it wasn't
  if (serviceName[0] === "unsure if route3") {
    contents = (
      <>
        <h2>
          It sounds like you are at risk. Please contact emergency services if
          this is the case. If not, please try to rephrase your answers.
        </h2>
      </>
    );
  } else {
    contents = (
      <>
        <h2>
          It sounds like you are at risk. Please contact emergency services
        </h2>
      </>
    );
  }

  return contents;
}

export default Route3Results;
