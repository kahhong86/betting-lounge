const duration = [], data1 = [], data2 = [], fastestDomain = [],listing = document.getElementById('data'),
      site = '', timer = new Date().getTime(); 

const createNode = (element) => {
  return document.createElement(element);
}
const append = (parent,el) => { 
  return parent.appendChild(el);
}

function datapull(website){

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 2000);

  fetch(website) 
    .then((response) => {      
      console.log(response);
      if(response.status == 200){
        let timerPage = new Date().getTime();
        timerPage = timerPage - timer;
        duration.push(timerPage);
        fastestDomain.push(website);
      }
    return response.json();           
  })
    .then( data => {  
      let runners = data;
      data1.push(runners.uuid);
      data2.push(runners.rand);
  })
  .catch( error => {
     fastestDomain.push(website);
      duration.push(9999);
  }
), {signal: controller.signal }; 
}

const domains = [
  'https://api-v4.zly889.com/api/v4/healthcheck',
  'https://api-v4.5a0ba.cn/api/v4/healthcheck',
  'https://api-v4.23sf999.com/api/v4/healthcheck',
  'https://api-v4.diaoq.com/api/v4/healthcheck'
]

function timeout(ms, promise){
  return new Promise((resolve,reject) => {
    const timerz = setTimeout(() => {
      reject(new Error('Timeout'))
    },ms)
    
    promise
      .then(value => {
      clearTimeout(timer)
      resolve(value)
    }).catch(reason =>{
      clearTimeout(timer)
      reject(reason)
    })
  })
}

for (let i = 0; i < domains.length ; i++){
  timeout(2000, datapull(domains[i]));
  
  if( i == domains.length -1){
    setTimeout(() => {
      // console.log(domains);
      let lowestvalue = Math.min.apply(Math,duration);
      let lowestposition = duration.indexOf(lowestvalue);
     
      let span = createNode('span'),
          label = createNode('label');
      label.innerHTML = 'uuid ' + data1[lowestposition] + ' ';
      span.innerHTML = 'randz '+ data2[lowestposition];
      
      append(listing,label);
      append(listing,span);
      console.log(fastestDomain);
      console.log(duration);
      console.log(fastestDomain[lowestposition]);
    },2000)  
  }
} 
