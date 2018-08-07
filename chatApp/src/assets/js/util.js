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

function _fetch(url,data={},method="GET") {
  method=method.toUpperCase();
  let queryString=stringify(data),initObj={};
  let headers=new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  if(method==='GET'){
    url+=('?'+queryString);
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
  return fetch(url,initObj)
  .then(res=>res.json())
}

export default {
  install(Vue,options){
    Vue.$fetch=Vue.prototype.$fetch=_fetch
  }
}




