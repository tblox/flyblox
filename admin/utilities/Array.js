export const sortBy = ( array, property ) =>{
    const clone = JSON.parse(JSON.stringify(array))
    clone.sort((a, b) => {
        if ( a[property] < b[property] ){
            return -1;
          }
          if ( a[property] < b[property] ){
            return 1;
          }
          return 0;
    })

    return clone;
}