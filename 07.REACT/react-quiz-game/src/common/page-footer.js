import "./page-footer.css";

function PageFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="page-footer">©️ Tiphaine Ramenason, {year} </footer>
  );
}

export default PageFooter;
