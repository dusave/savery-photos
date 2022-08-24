export const natSort = (arr: Array<string>) =>{
  return arr.map(v=>{ // split string into number/ascii substrings
      let processedName = []
      let str = v
      for(let i=0;i<str.length;i++) {
          let isNum = Number.isInteger(Number(str[i]));
          let j;
          for(j=i+1;j<str.length;j++) {
              if(Number.isInteger(Number(str[j]))!=isNum) {
                  break;
              }
          }
          processedName.push(isNum ? Number(str.slice(i,j)) : str.slice(i,j));
          i=j-1;
      }
      // console.log(processedName);
      return processedName;

  }).sort((a,b) => {
      let len = Math.min(a.length,b.length);
      for(let i=0;i<len;i++) {
          if(a[i]!=b[i]) {
              let isNumA = Number.isInteger(a[i]);
              let isNumB = Number.isInteger(b[i]);
              if(isNumA && isNumB) {
                  return (a[i] as number) - (b[i] as number);
              } else if(isNumA) {
                  return -1;
              } else if(isNumB) {
                  return 1;
              } else {
                  return a[i]<b[i] ? -1 : 1 ;
              }
          }
      }
      // in case of one string being a prefix of the other
      return a.length - b.length;
  }).map(v => v.join(''));
}
