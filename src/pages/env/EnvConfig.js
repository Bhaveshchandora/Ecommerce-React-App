import devEnv from "./DevEnv";
import prodEnv from "./ProdEnv";

let envConfig;
if (process.env?.REACT_APP_ENV === "production") {
	envConfig = prodEnv; // only for prod environment
} else {
	envConfig = devEnv; // otherwise consider as dev environment
}
export default envConfig;
