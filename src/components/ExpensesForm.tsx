/* eslint-disable @typescript-eslint/no-misused-promises */
import { z } from 'zod';
import catagories from './categories';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'description can not be lesst than 3 charaters' })
    .max(50, {
      message: 'description length should be a maximum of 50 characters',
    }),
  amount: z
    .number({ invalid_type_error: 'a valid number is required' })
    .min(0.01, { message: 'aamount should be at least 1 cent' })
    .max(100000000, { message: 'max valus exeded' }),

  category: z.enum(catagories, {
    errorMap: () => ({
      message: 'category is required',
    }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSumbit: (data: FormData) => void;
}

export const ExpensesForm = ({ onSumbit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className='mb-3'>
      <form
        onSubmit={handleSubmit((data) => {
          onSumbit(data);
          reset();
        })}
      >
        <div className='mb-3'>
          <label htmlFor='DescriptionInputFiled' className='form-label'>
            Description
          </label>
          <input
            {...register('description')}
            type='text'
            className='form-control'
            id='DescriptionInputFiled'
            aria-describedby='description'
          />
          {errors.description && (
            <p className='text-danger'>{errors.description.message}</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='AmountInputField' className='form-label'>
            Amount
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type='number'
            className='form-control'
            id='AmountInputField'
          />
          {errors.amount && (
            <p className='text-danger'>{errors.amount.message}</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='CategoryInputField' className='form-label'>
            Category
          </label>
          <select
            {...register('category')}
            className='form-select'
            aria-label=' select example'
            id='CategoryInputField'
          >
            <option value={''}></option>
            {catagories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-danger'>{errors.category.message}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};
