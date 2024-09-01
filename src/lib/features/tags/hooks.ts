import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTags } from './tags.slice';

export const useGetTags = () => {
  const dispatch = useAppDispatch();
  
  dispatch(fetchTags());

  const tagsList = useAppSelector((state) => state.tags.tags);
  const tagsError = useAppSelector((state) => state.tags.error);
  const tagsStatus = useAppSelector((state) => state.tags.status);

  return {
    tagsList,
    tagsError,
    tagsStatus
  };
}; 
