import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    selectedOptionId: transactionTypeOptions[0].optionId,
  }

  onChangeOptionId = event => {
    this.setState({selectedOptionId: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, selectedOptionId} = this.state

    const optionType = transactionTypeOptions.find(
      eachType => eachType.optionId === selectedOptionId,
    )

    const {displayText} = optionType

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const filteredTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({
      transactionsList: filteredTransactionsList,
    })
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenseAmount = () => {
    const {transactionsList} = this.state
    let expenseAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })

    return expenseAmount
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expenseAmount

    return balanceAmount
  }

  render() {
    const {
      titleInput,
      amountInput,
      selectedOptionId,
      transactionsList,
    } = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpenseAmount()

    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="welcome-note">
              Welcome back to your
              <span className="money-manager">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expensesAmount}
          />

          <div className="transactions-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="addTransaction-heading">Add Transaction</h1>

              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                id="title"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                className="input"
                id="amount"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="select" className="label">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={selectedOptionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="transactionsHistoryTable-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="tableHeaderCell">Title</p>
                    <p className="tableHeaderCell">Amount</p>
                    <p className="tableHeaderCell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
