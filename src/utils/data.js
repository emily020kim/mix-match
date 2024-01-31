export const categories = [
    {
        name: 'tops',
    },
    {
        name: 'bottoms',
    },
    {
        name: 'outerwear',
    },
    {
        name: 'shoes',
    },
    {
        name: 'accessories',
    },
]

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
}

export const feedQuery = `*[_type == "clothes"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "clothes" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
};

export const userCreatedClothesQuery = (userId) => {
  const query = `*[ _type == 'clothes' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedClothesQuery = (userId) => {
  const query = `*[_type == 'clothes' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const clothesDetailQuery = (clothesId) => {
  const query = `*[_type == "clothes" && _id == '${clothesId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const clothesDetailMorePinQuery = (clothes) => {
  const query = `*[_type == "clothes" && category == '${clothes.category}' && _id != '${clothes._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const clothesCategoryQuery = (categoryId) => {
  const query = `*[_type == "clothes" && _id == '${categoryId}]{
    image{
      asset->{
        url
      }
    },
    _id,
  }`;
  return query;
}