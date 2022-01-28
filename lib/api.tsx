
export const getCuratedPhotos = async (pageIndex) => {  
  const res = await fetch(
    pageIndex == 1 ? `https://api.artic.edu/api/v1/exhibitions?page=2` : `https://api.artic.edu/api/v1/exhibitions?page=${pageIndex}`
  );
  const responseJson = await res.json();
  return [responseJson.data, responseJson.pagination['total_pages']];  
};