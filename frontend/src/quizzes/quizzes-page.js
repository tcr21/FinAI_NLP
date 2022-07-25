import QuizListing from "./quiz-listing";

function QuizzesPage() {
  return (
    <main>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              FINANCE EDUCATION
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Learn about finance
            </h1>
          </div>
          <QuizListing />
        </div>
      </section>
    </main>
  );
}

export default QuizzesPage;
