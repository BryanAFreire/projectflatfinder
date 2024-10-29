export const checkFlatFavorite = (id) => {
    const flats_favorites = JSON.parse(localStorage.getItem('flats_favorites'));
    if (flats_favorites != null) {
        const exist = flats_favorites.findIndex((item)=>{
            return item.idFlat === id
        })
        if (exist !== -1){
            return true;
        }
        
    }
    return false;
};
