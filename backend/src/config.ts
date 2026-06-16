import dotenv from "dotenv"

dotenv.config()

function required(name : string){
    const value = process.env[name];
    if(!value){
        throw new Error(`${name} environment variable is missing.`)
    }
    return value
}

export const config = {

    groqAPIKey : () => required("GROQ_API_KEY"),
    githubToken : () => required("GITHUB_TOKEN"),
    accessKey : () => process.env.APP_SECRET ?? "",
    model : process.env.model ?? "llama-3.3-70b-versatile",

    conventionsPath : "conventions/rules.json",
    maxFilesContextChars : 12000,
    maxMergedPr : 10

}