import { Application } from 'express';


export default interface App {
    readonly express: Application;
}
