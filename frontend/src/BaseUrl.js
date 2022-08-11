const baseUrl = process.env.NODE_ENV === "production"
? "https://shark-app-veod2.ondigitalocean.app"
: "http://localhost:5000";
export default baseUrl;