import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchCategories } from './categorys.slice';

export const useGetCategories = () => {
  const dispatch = useAppDispatch();

  dispatch(fetchCategories());

  const categoryList = useAppSelector((state) => state.categories.categories);
  const categoriesError = useAppSelector((state) => state.categories.error);
  const categoriesStatus = useAppSelector((state) => state.categories.status);

  return {
    categoryList,
    categoriesError,
    categoriesStatus
  };
}; 
