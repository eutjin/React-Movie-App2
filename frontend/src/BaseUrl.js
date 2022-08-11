const baseUrl = process.env.NODE_ENV === "production"
? "https://clownfish-app-6fhry.ondigitalocean.app"
: "http://localhost:5000";
export default baseUrl;