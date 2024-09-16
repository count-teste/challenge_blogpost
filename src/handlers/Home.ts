import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = 'favorites';

const parseFavorites = (data: string | null): string[] => {
  if (!data) return [];
  return data.split(',').filter(Boolean);
};

const updateFavorites = async (favorites: string[]) => {
  await AsyncStorage.setItem(FAVORITES_KEY, favorites.join(','));
};

export const handleFavorite = async (
  setFavoriteState?: React.Dispatch<React.SetStateAction<string[]>>,
  id?: number,
  setFavoriteLoading?: React.Dispatch<React.SetStateAction<number>>
) => {
  if (setFavoriteLoading) setFavoriteLoading(Number(id));

  if (id === undefined) {
    const asyncItem = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites = parseFavorites(asyncItem);
    setFavoriteState && setFavoriteState(favorites);
    setFavoriteLoading && setFavoriteLoading(-1);
    return;
  }

  const asyncItem = await AsyncStorage.getItem(FAVORITES_KEY);
  const favorites = parseFavorites(asyncItem);

  if (favorites.includes(String(id))) {
    const updatedFavorites = favorites.filter(item => item !== String(id));
    await updateFavorites(updatedFavorites);
    setFavoriteState && setFavoriteState(updatedFavorites);
  } else {
    const updatedFavorites = [...favorites, String(id)];
    await updateFavorites(updatedFavorites);
    setFavoriteState && setFavoriteState(updatedFavorites);
  }

  setFavoriteLoading && setFavoriteLoading(-1);
};
