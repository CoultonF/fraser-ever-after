export const corsHeaders = {
  "Access-Control-Allow-Headers": "*", // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,HEAD", // Allowed methods. Others could be GET, PUT, DELETE etc.
  "Access-Control-Allow-Origin": "*", // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
};
