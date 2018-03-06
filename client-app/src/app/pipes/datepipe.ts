export  const  FormatDate = (date)  => {
    let currentDate, startYear, splitDate, workYears;
    currentDate = new Date();
    splitDate = date.split('-');
    startYear = splitDate[0];
  

    if(startYear == currentDate.getFullYear()){
      workYears = `Less than a year`;
    }else {
      workYears = `${currentDate.getFullYear() - startYear} Years`;
    }

    return workYears;
  
  }