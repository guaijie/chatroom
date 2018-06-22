function _fetch(url,data={},method='get'){
  console.log(url,data)
  method=method.toUpperCase();
  let queryString=stringify(data),initObj={};
  let headers=new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  if(method==='GET'){
    initObj={
      method:method,
      credentials: 'omit',
      headers:headers,
      mode:'no-cors'
    }
  }else if(method==='POST'){

    initObj = {
      method: method,
      credentials: 'omit',
      headers:headers,
      body: queryString,
      mode:'no-cors'
    }
  }
  return fetch(url,initObj);

}

function stringify(data){

  let queryString='';
  if(getDataType(data)==="Object"){
    for(let key in data){
      queryString+=key+'='+data[key]+'&';
    }
  }
  return queryString.slice(0,-1)

}


function getDataType(data){
  return [].toString.apply(data).replace(/\[object\s(.+)\]/,'$1')
}

export {
  _fetch,
  getDataType
}


