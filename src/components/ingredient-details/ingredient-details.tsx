import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взял переменную из стора */
  const { ingredients } = useSelector(getIngredientState);
  const { id } = useParams();

  const ingredientData = ingredients.find((i) => {
    if (i._id === id) {
      return i;
    }
  });
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
