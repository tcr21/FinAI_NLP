function Route3Results({ serviceName }) {
  let contents;
  // Case in which bert said route3 but gpt said it wasn't
  if (serviceName[0] === "unsure if route3") {
    contents = (
      <>
        <h2>
          It sounds like you might be at risk. If this is the case, please contact emergency services. 
          If not, please try to rephrase your answers.
        </h2>
      </>
    );
  } else {
    contents = (
      <>
        <h2>
          It sounds like you might be at risk. If this is the case, please contact emergency services. 
          If not, please try to rephrase your answers.
        </h2>
      </>
    );
  }

  return contents;
}

export default Route3Results;
