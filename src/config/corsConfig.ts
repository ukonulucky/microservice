import cors from "cors"

const corseConfig = () => { 
    return cors({
        origin: (origin, callback) => { 
            const allowedUrl = [
              "http://localhost:3000"
            ]
            if (!origin || allowedUrl.indexOf(origin) !== -1) { 
               callback(null,true)
            } else { 
                callback(new Error("Blocked from cors"))
            }
        },
        methods: ["POST", "GET", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Accept-Version"
        ],
        exposedHeaders: [
            "Content-Range",
            "X-Total-Count"
        ],
        credentials: true,
        preflightContinue: true,
        maxAge: 600, // help to reduce the amount of api request to the server for a delay of 10 minutes
        optionsSuccessStatus:204

    })
}

export default corseConfig