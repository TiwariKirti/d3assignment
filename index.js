var fs=require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv') //reading csv file
});
var dataArray=[],countryArray=[],regionArray=[];
var sugarIn=0,saltIn=0,countryIn=0,fatIn=0,proteinIn=0,carboIn=0;
var country=0,sugar=0,salt=0,sugarsalt=0,i=0,fat=0,protein=0,carbohydrate=0,j=0,country1="",region1="",len=0,len1=0,len2=0,len3=0;
var barChart = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var northEurope = ['United Kingdom' , 'Denmark' , 'Sweden' , 'Norway'];
var centralEurope = ['France','Belgium' , 'Germany' , ' Switzerland' , 'Netherlands'];
var southEurope = ['Portugal', 'Greece' , 'Italy' , 'Spain' , 'Croatia' , 'Albania'];
var group=['NorthernEurope','CentralEurope','SouthernEurope'];
var temp="",temp1="";
var k=0,k1=0,k2=0,k3=0;
var infoAdd=0;
var fatAdd=0;
var proteinAdd=0;
var carboAdd=0;
var countryF=[];
var regionF=[];
var count=0;
function countryBar(sugarySalt,countries) {  //function for countryArray
  this.sugarySalt = sugarySalt;
  this.countries = country;
};//end function
function regionChart(fat1,protein1,carbohydrate1,region1) {   //function for regionArray
  this.fat1=fat1;
  this.protein1=protein1;
  this.carbohydrate1=carbohydrate1;
  this.region1=region1;
};//end function
function countChart(countriess,saltsugarInfo1)  {   //function for countryF
  this.countriess=countriess;
  this.saltsugarInfo1=saltsugarInfo1;
};//end function
function regChart(fatss,proteinss,carbos,regionss){ //function for regionF
  this.fatss=fatss;
  this.proteinss=proteinss;
  this.carbos=carbos;
  this.regionss=regionss;
};//end function
lineReader.on('line', function (line) {    //start
  k=0,k1=0,k2=0,k3=0;
     dataArray=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); //date spliting
     while(i<1) //start while loop for reading index
     {
        countryIn=dataArray.indexOf('countries_en');
        sugarIn=dataArray.indexOf('sugars_100g');
        saltIn=dataArray.indexOf('salt_100g');
        fatIn=dataArray.indexOf('fat_100g');
        proteinIn=dataArray.indexOf('proteins_100g');
        carboIn=dataArray.indexOf('carbohydrates_100g');
        i++;
    }  //end while loop for reading index
   country=dataArray[countryIn];
   sugar=dataArray[sugarIn];
   salt=dataArray[saltIn];
   fat=dataArray[fatIn];
   protein=dataArray[proteinIn];
   carbohydrate=dataArray[carboIn];
   if(sugar=="")
   {
     sugar=0;
   }
   if(salt=="")
   {
     salt=0;
   }
   if(country=="")
   {
     country="N";
   }
   if(fat=="")
   {
     fat=0;
   }
   if(protein=="")
   {
     protein=0;
   }
   if(carbohydrate=="")
   {
     carbohydrate=0;
   }
   sugarSalt=parseFloat(sugar)+parseFloat(salt); //adding the sugar and salt values
   len=barChart.length;
   while(k>=0&&k<len) //start while loop to check country
   {
       if((country).includes(barChart[k]))
           country1=barChart[k];
               k++;
   }  ////end while loop to check country
  if(country1)
  {
       countryArray.push(new countryBar(sugarSalt.toFixed(2),country1)); //passing the values
  }
  len1=northEurope.length;
  while(k1>=0 && k1<len1) //start while loop to find region
  {
       if((country).includes(northEurope[k1]))
           region1="NorthernEurope";
           k1++;
  } //end while loop

  len2=centralEurope.length;
  while(k2>=0&&k2<len2) //start while loop to find region
  {
       if((country).includes(centralEurope[k2]))
           region1="CentralEurope";
           k2++;
  }//end while loop
  len3=southEurope.length;
  while(k3>=0&&k3<len3)//start while loop to find region
  {
       if((country).includes(southEurope[k3]))
           region1='SouthernEurope';
           k3++;
  }//end while loop
   if(region1){
       regionArray.push(new regionChart(fat,protein,carbohydrate,region1));//passig the values
  }
});//end

  lineReader.on('close', function() { //start
  for(var m=0;m<barChart.length;m++) //start forloop to read barchart array values
  {
    infoAdd=0;
    for(var n=0;n<countryArray.length;n++){ //start forloop to read country array values
       if((countryArray[n].countries).includes(barChart[m]))
       {
          temp=barChart[m];
          infoAdd=infoAdd+parseFloat(countryArray[n].sugarySalt); //adding the salt and sugar info
       }
  }//end forloop to read country array values
  countryF.push(new countChart(temp,infoAdd.toFixed(2)));//passing the final values
}//end forloop to read barchart array values

  for(var m=0;m<group.length;m++)//start forloop to read group array values
  {
    fatAdd=0;
    proteinAdd=0;
    carboAdd=0;
    for(var n=0;n<regionArray.length;n++){//start forloop to read region array values
      if((regionArray[n].region1).includes(group[m]))
      {
        temp1=group[m];
        fatAdd=fatAdd+parseFloat(regionArray[n].fat1);//adding fat values
        proteinAdd=proteinAdd+parseFloat(regionArray[n].protein1);//assing protein values
        carboAdd=carboAdd+parseFloat(regionArray[n].carbohydrate1);//adding carbohydrate values
      }
  }//end forloop to read group array values
  regionF.push(new regChart(fatAdd.toFixed(2),proteinAdd.toFixed(2),carboAdd.toFixed(2),temp1));//passing the final values

}//end forloop to read region array values
//console.log(JSON.stringify(countryF));
//console.log(JSON.stringify(regionF));
fs.writeFile('country5.json', JSON.stringify(countryF) , 'utf-8');//writing json values into file
fs.writeFile('region.json', JSON.stringify(regionF) , 'utf-8');//writing json values into file
});//end
