import { Priorities } from "./priorities"

export type Task={
    id:number
    name:string
    description?:string
    priorities:Priorities
}