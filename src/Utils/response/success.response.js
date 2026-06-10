// 1 = > parameter is the response object (res) that allow to access the response methods and properties.
// 2 = > parameter is the status code (status) that indicate the success of the request.
// 3 = > parameter is the message (message) that provide a description of the success.
// 4 = > parameter is the data (data) that contain the actual data to be sent in the response.
// status  => as a variable (parameter) to make it more flexible and reusable
// data as => a variable (parameter) to make it more flexible and reusable
// message => as a variable (parameter) to make it more flexible and reusable

// return res.status(statusCode).json({ message } , data:{});
export const successResponse = ({
  res,
  statusCode = 200,
  message = 'Done',
  data = {}
}) => {
  return res.status(statusCode).json({
    message,
    data
  });
};
