function Route2Results({ serviceName }) {
  // TO DO: UPDATE WHEN DEVELOP SERVICES
  let contents;
  if (
    serviceName.includes("Budget calculator") &&
    serviceName.includes("Loan calculator")
  ) {
    contents = (
      <>
        <h2>
          Sounds like you need help with managing your personal finances. Based
          on what you've told us, we recommend:
        </h2>
        <button>{serviceName[0]}</button>
        <button>{serviceName[1]}</button>
      </>
    );
    return contents;
  } else {
    contents = (
      <>
        <h2>
          Sounds like you need help with managing your personal finances. Based
          on what you've told us, we recommend:
        </h2>
        <button>{serviceName[0]}</button>
      </>
    );
    return contents;
  }
}

export default Route2Results;
