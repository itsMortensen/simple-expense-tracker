import { ExpensesTable } from './components/ExpensesTable';
import { ExpensesFilter } from './components/ExpensesFilter';
import { ExpensesForm } from './components/ExpensesForm';
import { useState } from 'react';
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'amarito', amount: 10, category: 'grocery' },
    { id: 2, description: 'banaa', amount: 25, category: 'Grocery' },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;
  return (
    <div>
      <ExpensesForm
        onSumbit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <ExpensesFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpensesTable
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
};

export default App;
