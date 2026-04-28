import app from "./app.js"
import {env} from "./config/envConfig.js";

app.listen((env.PORT), () => {
    console.log(`Listening on  http://${env.HOST}:${env.PORT}`);
})