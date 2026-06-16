export type Severity = "bug" | "security" | " style" | "suggestion" | "performance"

export interface PullRequestRef {
    owner : string,
    repo : string,
    pullNumber : number;
}

export interface ParsedFile {
    path : string,
    patch : string,
    addedLines : number[];
}

export interface ConventionRule {
    rule : string,
    rationale : string,
    severity : Severity
}

export interface FileContext {
    path : string,
    patch : string,
    addedLines : number[],
    content : string
}