
const Promise = require('bluebird');
const pdf = Promise.promisifyAll(require('html-pdf'));
var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.join(__dirname, "../templates/invoice.html"), "utf8");

let data = { name: "bilas",roll: 229929,section: 10.9292};


const generateInvoice=async () => {

    let fname=`../downloads/${Date.now()}.pdf`;
    var options = { format: "A4",orientation: "landscape",border: "10mm",};
    let document = {html: html,data, path: fname};
    
    
    let res = await pdf.createAsync(html, { format: 'A4', filename: fname});
    return res;
  }



const imageValidation = (image) => {
    let maxSize = 2000000;
    fileExt = image.name.split('.').at(-1);
    if (fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'png')
        return false;
    else if (image.size > maxSize)
        return false;
    else
        return true;
}

const imageUpload=(image)=>{
    let fileExt = image.name.split('.').at(-1);
    let newName = image.md5 + '__' + Date.now() + '' + '.' + fileExt;
    let uploadPath = (__dirname + '/../uploads/images/' + newName);
    image.mv(uploadPath, (err)=> {
        if(err)
        return false;
        else 
        return newName;
    });
    return newName;
}


const pdfValidation = (pdf) => {
    let maxSize = 5000000;
    fileExt = pdf.name.split('.').at(-1);
    if (fileExt != 'pdf')
        return false;
    else if (pdf.size > maxSize)
        return false;
    else
        return true;
}



const pdfUpload=(pdf)=>{
    let fileExt = pdf.name.split('.').at(-1);
    let newName = pdf.md5 + '__' + Date.now() + '' + '.' + fileExt;
    let uploadPath = (__dirname + '/../uploads/documents/' + newName);
    pdf.mv(uploadPath, (err)=> {
        if(err)
        return false;
        else 
        return newName;
    });
    return newName;
}




module.exports = { imageValidation ,imageUpload,pdfValidation,pdfUpload};


















  function getInvoice (data) {
    fname=`../downloads/${Date.now()}.pdf`;
    var options = { format: "A4",orientation: "landscape",border: "10mm",};
    let document = {html: html,data, path: fname,};
    pdf.create(document, options).then((res) => {return(res)})
    .catch((error) => {return(error);});
    return fname;
  }

//  const test=async()=>{
// let a=getInvoice(data);
// console.log(a);
//  }
//  let bilas=async () => {
//   fname=`./documents/${Date.now()}.pdf`;
//   let res = await pdf.createAsync(html, { format: 'A4', filename: fname});
//   return res;
// }

// bilas().then(console.log);
// console.log(2+3)


  // let files = fs.readdirSync(path.join(__dirname, '/documents'));
  // files.forEach(file => {
  //   fs.unlinkSync(path.join(__dirname, '/documents/'+file));
  //   console.log(file);
  // });
