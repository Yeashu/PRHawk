import {Octokit} from "@octokit/rest"
import { config } from "../config.js"

let octokit : Octokit | null = null

export function getOctokitClient() : Octokit {
    if(!octokit){
        octokit = new Octokit({auth : config.githubToken})
    }
    return octokit
}