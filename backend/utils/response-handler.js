var generateError = function (res, message, responseObject, responseCode) {
  let responseMsg = message;

  if (responseObject) {
    responseMsg = responseObject.details[0].message
      ? responseObject.details[0].message
      : message;
  }

  responseCode = responseCode || 400;
  res.status(responseCode).send({
    message: responseMsg,
    data: "",
    statusCode: responseCode,
  });
  res.end();
};

var generateSuccess = function (res, message, responseObject, responseCode) {
  responseCode = responseCode || 200;
  res.status(responseCode).send({
    message: message,
    data: responseObject,
    statusCode: responseCode,
  });
  res.end();
};

module.exports = {
  generateError: generateError,
  generateSuccess: generateSuccess,
};
