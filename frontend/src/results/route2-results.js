function Route2Results({ serviceName }) {
  let contents;
  if (
    serviceName.trim() !== "Budget calculator" &&
    serviceName.trim() !== "Loan calculator"
  ) {
    contents = (
      <>
        <h2>Sounds like you need help with managing your personal finances.</h2>
        <p>
          Here are some relevant services. Please try to re-phrase your answers
          for more specific results.
        </p>
        <button>Budget calculator</button>
        <button>Loan calculator</button>
      </>
    );
  } else {
    contents = (
      <>
        <h2>
          Sounds like you need help with managing your personal finances. Based
          on what you've told us, we recommend:
        </h2>
        {/* TO UPDATE */}
        <button>{serviceName}</button>
      </>
    );
  }

  return contents;
}

export default Route2Results;
