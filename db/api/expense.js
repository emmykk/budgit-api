const models = require("../models/index.js");

const addExpense = async (expenseData) => {
  /**
   * @param expenseData structure:
   * object with properties:
   * HouseholdId
   * UserId
   * description
   * amount
   *  */
  try {
    const newExpense = await models.Expense.create({
      ...expenseData,
    });
    return new Promise((resolve) =>
      resolve({
        message: `New expense of $${expenseData.amount} added to the householdId ${expenseData.HouseholdId}`,
        body: newExpense,
      })
    );
  } catch (err) {
    return new Promise((resolve) =>
      resolve({ message: err.toString(), body: null })
    );
  }
};

const getAllExpenses = async (userId) => {
  //  find household by userId in HouseholdMember table
  const usersHousehold = await models.HouseholdMember.findOne({
    where: { userId: userId },
  });
  const { householdId } = usersHousehold;

  try {
    const allExpenses = await models.Expense.findAll({
      where: { HouseholdId: householdId },
    });
    return new Promise((resolve) =>
      resolve({ body: allExpenses, message: null })
    );
  } catch (err) {
    return new Promise((resolve) =>
      resolve({ message: err.toString(), body: null })
    );
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};