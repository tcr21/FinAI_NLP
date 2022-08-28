import borrowingQuiz from "./borrowing-quiz";
import digitalBankingQuiz from "./digital-banking";
import financeProductsQuiz from "./finance-products-quiz";
import financeSkillsQuiz from "./finance-skills-quiz";
import formalFinanceQuiz from "./formal-finance-quiz";
import loanQuiz from "./loan-quiz";
import microfinanceQuiz from "./microfinance-quiz";
import savingBorrowingQuiz from "./saving-borrowing-quiz";
import savingBudgetingQuiz from "./saving-budgeting-quiz";
import savingQuiz from "./saving-quiz";

// Create new quiz.js and add it here, plus uncomment loadData() call in main index.js if want to load it to firebase

const quizzes = [formalFinanceQuiz, savingBorrowingQuiz, savingBudgetingQuiz, financeProductsQuiz, borrowingQuiz, loanQuiz, microfinanceQuiz, savingQuiz, digitalBankingQuiz, financeSkillsQuiz];

export default quizzes;
