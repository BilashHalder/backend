const transaction=(data)=>{

    let {name,transaction_id,amount,date}=data;
    let html=`<html>
    <head></head>
      <link
        rel="stylesheet"
        type="text/css"
        hs-webfonts="true"
        href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi"
      />
  
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <style type="text/css">
        * {
          font-family: Georgia, "Times New Roman", Times, serif;
        }
  
        a {
          text-decoration: underline;
          color: inherit;
          font-weight: bold;
          color: #253342;
        }
  
        h1 {
          font-size: 20px;
        }
  
        h2 { font-size: 20px; font-weight: 300; }
  
        p {
          font-weight: 100;
        }
  
        td {
          vertical-align: top;
        }
        @media only screen and (max-width: 767px) {
          h1 {
            font-size: 20px;
            width: 100%;
          }
  
          h2 {
            font-size: 15px;
            font-weight: 100;
          }
          h3 {
            font-size: 12px;
          }
          p {
            font-weight: 0;
            font-size: 10px;
          }
          #nav {
            max-width: 100%;
            margin-top: 0px !important;
          }
          th,
          td {
            font-size: 10px;
          }
          #invest {
            max-width: 100%;
            text-align: center;
            margin: auto;
          }
          #btn {
            max-width: 100%;
          }
          #btnn {
            font-size: 10px;
            letter-spacing: 0px;
            font-weight: 10px;
            padding: 0px;
            margin: auto;
          }
          #term {
            font-size: 8px !important;
          }
        }
      </style>
    </head>
    <body
      style="
        width: 100%;
        margin: auto;
        padding: 0;
        font-size: 18px;
        color: #33475b;
        word-break: break-word;
        background-color: #f5f8fa;
      "
    >
      <div
        id="nav"
        style="
          margin: auto;
          width: 500px;
          background-color: white;
          margin-top: 10px;
        "
      >
        <table role="presentation" width="100%">
          <tr>
            <td
              style="color: white; background-color: #c1d7ed; text-align: center"
            >
              <img
                src="https://creazionegroup.in/img/creazionepic-removebg-preview.png"
                width="80px"
                style="text-align:center"
              />
            </td>
          </tr>
        </table>
        <table
          role="presentation"
          cellpadding="0"
          cellspacing="10px"
          style="padding: 30px 30px 30px 60px; width: 100%"
        >
          <tr>
            <td>
              <h1 style="color: blue; text-align: center">Hello !!</h1>
              <h3 style="color: black; text-align: center">${name}</h3>
              <h3 style="text-align: center">
                You request for the withdrawal of &#8377; ${amount} on ${date}
              </h3>
              <p>
                The withdrawal request has been accepted . The amount is added to
                your bank account no :
              </p>
            </td>
          </tr>
        </table>
  
        <table id="invest" style="width: 100%">
          <p style="text-align: center">Details</p>
  
          <tr style="background-color: #e6e7e8">
            <td style="text-align: center">Date of Request</td>
  
            <td style="text-align: center">07/11/2022</td>
          </tr>
  
          <tr style="background-color: #e6e7e8">
            <td style="text-align: center">Transaction Id</td>
            <td style="text-align: center">CRZ 0013</td>
          </tr>
          <tr style="text-align: center; background-color: #e6e7e8">
            <td style="text-align: center">Ammount</td>
            <td style="text-align: center">&#8377; 100000</td>
          </tr>
          <tr style="text-align: center; background-color: #e6e7e8">
            <td style="text-align: center">Disbursed On</td>
            <td style="text-align: center">10/11/2022</td>
          </tr>
        </table>
  
        <table
          role="presentation"
          width="100%"
          style="margin-top: 50px; background-color: #eaf0f6"
        >
          <tr>
            <td style="text-align: center">
              <h2 style="color: #307350">Creazione Group</h2>
              <p>
                Thank you for showing interest in Creazione Group . Keep investing
                with us to get maximum profit in less time . share with your
                friends & Family and help them to earn .
              </p>
              <p id="term" style="font-size: 10px; color: red">T&C Apply</p>
              <a href="#"> Ask us a question</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 8px">
          This is a Computer Genereted Receipt . No sign Required
        </p>
      </div>
    </body>
  </html>
  `;

   return html;
}

module.exports={transaction}