import * as ko from 'knockout';

/** App State */

export const TIMEZONE_ADJUST = 36000;
export const DATE_FORMAT = 'DD/MM/YYYY';

export interface IPage {
    id: string;
    component: string;
    title: string;
    icon: string;
    visible$: ko.Observable<boolean>;
    order$: ko.Observable<number>;
    data: any;
}

export interface ICalHeatMapData {
    map: any;
    min: number;
    max: number;
}

export interface IProject {
    status: string;
    count: number;
}

export interface IProjectStatus {
    map: any;
    min: number;
    max: number;
    current: IProject[];
}

export interface IUserMap {
    user: string;
    map: any;
}

export interface IBuild {
    pathcode: string
    build: Date
}

export interface IE1Stats {
    projectStatuses: any[];
    activityStatuses: any[];
    checkIns: ICalHeatMapData;
    transfers: ICalHeatMapData;
    projects: IProjectStatus;
    builds: IBuild[];
    users: {
        maps: IUserMap[];
        min: number;
        max: number;
    }
}

export interface IState {
    data: Map<string, any>;
}

export const AboutPage: IPage = {
    id: 'about',
    component: 'e1p-about',
    title: 'About OMW Dashboard',
    icon: '',
    visible$: ko.observable(false),
    order$: ko.observable(0),
    data: null
};
