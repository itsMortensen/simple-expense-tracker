import catagories from './categories';

interface Props {
  onSelectCategory: (category: string) => void;
}
export const ExpensesFilter = ({ onSelectCategory }: Props) => {
  return (
    <div className='mb-3'>
      <select
        className='form-select'
        aria-label=' select example'
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value=''>All Category</option>
        {catagories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
