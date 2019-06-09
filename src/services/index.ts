/** Services */
import { E1Service } from './e1';

export class Services {
    e1: E1Service;
    init(): Promise<any[]> {
        return Promise.all([
            this.e1.init()]);
    }
    constructor(data: Map<string, any>) {
        this.e1 = new E1Service(data);
    }
}