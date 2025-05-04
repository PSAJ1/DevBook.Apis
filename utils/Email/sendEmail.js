const {SendEmailCommand} = require("@aws-sdk/client-ses"); 
const { sesClient } = require("../sesClient");
function CreateSendEmailCommand(fromUser,toUser,subject,body,ReplyToAddress="support.devbook@developer-ps.com"){
    return new SendEmailCommand({
        Destination: {
          /* required */
          CcAddresses: [
            /* more items */
          ],
          ToAddresses: [
            toUser,
            /* more To-email addresses */
          ],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: "UTF-8",
              Data: body,
            },
            Text: {
              Charset: "UTF-8",
              Data: "TEXT_FORMAT_BODY",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        Source: fromUser,
        ReplyToAddresses: [
            ReplyToAddress
        ],
      });
};

const SendEmailFromNoReply = async (toUser,subject,body) => {
    const sendEmailCommand = CreateSendEmailCommand(
      "no-reply@developer-ps.com",
      toUser,
      subject,
      body
    );
  
    try {
      return await sesClient.send(sendEmailCommand);
    } catch (caught) {
      console.log("Email not send : -",caught);
    }
  };

  module.exports = {SendEmailFromNoReply};