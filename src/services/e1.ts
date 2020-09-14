/** E1 Service */
import * as ko from 'knockout';
import moment from 'moment';
import { Actions, StoreKeys } from '../store';
import { IE1Stats, IProjectStatus, IUserMap, TIMEZONE_ADJUST, DATE_FORMAT } from '../state';

export class E1Service {
    ready$ = ko.observable(false);
    e1Stats: IE1Stats;
    init(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.e1Stats = this.data.get(StoreKeys.e1);
            if (this.e1Stats) {
                resolve(true);
            } else {
                const sixMonthsBack = moment().subtract(5, 'months').set('date', 1).format(DATE_FORMAT);
                const fiveWeeksBack = moment().subtract(4, 'weeks').startOf('isoWeek').format(DATE_FORMAT);
                const batchRequest = {
                    outputType: 'GRID_DATA',
                    batchDataRequest: true,
                    dataRequests: [
                        {
                            dataServiceType: 'BROWSE',
                            targetName: 'F0005',
                            targetType: 'table',
                            maxPageSize: '500',
                            returnControlIDs: 'SY|RT|KY|DL01',
                            query: {
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: 'H92',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F0005.SY',
                                        operator: 'EQUAL'
                                    },
                                    {
                                        value: [
                                            {
                                                content: 'PS',
                                                specialValueId: 'LITERAL'
                                            },
                                            {
                                                content: 'AC',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F0005.RT',
                                        operator: 'LIST'
                                    }
                                ],
                                matchType: 'MATCH_ALL'
                            }
                        },
                        {
                            dataServiceType: 'AGGREGATION',
                            targetName: 'F98210',
                            targetType: 'table',
                            aggregation: {
                                aggregations: [
                                    {
                                        aggregation: 'COUNT',
                                        column: '*'
                                    }
                                ],
                                groupBy: [
                                    {
                                        column: 'OMWAC'
                                    },
                                    {
                                        column: 'UPMJ'
                                    }
                                ],
                                orderBy: []
                            },
                            query: {
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: '02',
                                                specialValueId: 'LITERAL',
                                            },
                                            {
                                                content: '38',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98210.OMWAC',
                                        operator: 'BETWEEN'
                                    },
                                    {
                                        value: [
                                            {
                                                content: sixMonthsBack,
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98210.UPMJ',
                                        operator: 'GREATER_EQUAL'
                                    }

                                ],
                                matchType: 'MATCH_ALL'
                            }
                        },
                        {
                            dataServiceType: 'AGGREGATION',
                            targetName: 'F98220',
                            targetType: 'table',
                            aggregation: {
                                aggregations: [
                                    {
                                        aggregation: 'COUNT',
                                        column: '*'
                                    }
                                ],
                                groupBy: [
                                    {
                                        column: 'OMWPS'
                                    }
                                ],
                                orderBy: [
                                    {
                                        column: 'OMWPS',
                                        direction: 'ASC'
                                    }
                                ],
                            },
                            query: {
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: 'Default',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98220.OMWDESC',
                                        operator: 'NOT_EQUAL'
                                    },
                                    {
                                        value: [
                                            {
                                                content: '11',
                                                specialValueId: 'LITERAL'
                                            },
                                            {
                                                content: '37X',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98220.OMWPS',
                                        operator: 'BETWEEN'
                                    }
                                ],
                                matchType: 'MATCH_ALL'
                            }
                        },
                        {
                            dataServiceType: 'AGGREGATION',
                            targetName: 'F98220',
                            targetType: 'table',
                            aggregation: {
                                aggregations: [
                                    {
                                        aggregation: 'COUNT',
                                        column: '*'
                                    }
                                ],
                                groupBy: [
                                    {
                                        column: 'OMWCD'
                                    }
                                ],
                                orderBy: []
                            },
                            query: {
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: 'Default',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98220.OMWDESC',
                                        operator: 'NOT_EQUAL'
                                    },
                                    {
                                        value: [
                                            {
                                                content: sixMonthsBack,
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98220.OMWCD',
                                        operator: 'GREATER_EQUAL'
                                    }
                                ],
                                matchType: 'MATCH_ALL'
                            }
                        },
                        {
                            dataServiceType: 'AGGREGATION',
                            targetName: 'F98210',
                            targetType: 'table',
                            aggregation: {
                                aggregations: [
                                    {
                                        aggregation: 'COUNT',
                                        column: '*'
                                    }
                                ],
                                groupBy: [
                                    {
                                        column: 'USER'
                                    },
                                    {
                                        column: 'UPMJ'
                                    }
                                ],
                                orderBy: []
                            },
                            query: {
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: '02',
                                                specialValueId: 'LITERAL'
                                            },
                                            {
                                                content: '38',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98210.OMWAC',
                                        operator: 'BETWEEN'
                                    },
                                    {
                                        value: [
                                            {
                                                content: fiveWeeksBack,
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F98210.UPMJ',
                                        operator: 'GREATER_EQUAL'
                                    }
                                ],
                                matchType: 'MATCH_ALL'
                            }
                        },
                        {
                            dataServiceType: 'AGGREGATION',
                            outputType: 'GRID_DATA',
                            targetType: 'table',
                            targetName: 'F96215',
                            aggregation: {
                                aggregations: [
                                    {
                                        aggregation: 'MAX',
                                        column: 'BLDDTE'
                                    }
                                ],
                                groupBy: [
                                    {
                                        column: 'PATHCD'
                                    }
                                ],
                                orderBy: []
                            },
                            query: {
                                matchType: 'MATCH_ALL',
                                condition: [
                                    {
                                        value: [
                                            {
                                                content: '1',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F96215.PKGBULFUT4',
                                        operator: 'EQUAL'
                                    },
                                    {
                                        value: [
                                            {
                                                content: '50',
                                                specialValueId: 'LITERAL'
                                            }
                                        ],
                                        controlId: 'F96215.BLDSTS',
                                        operator: 'EQUAL'
                                    }
                                ]
                            }
                        }
                    ]
                };
                callAISService(batchRequest, DATA_SERVICE, response => {
                    const udcs: any[] = response.fs_0_DATABROWSE_F0005.data.gridData.rowset;
                    const projectStatuses = udcs
                        .filter(r => r.F0005_RT === 'PS')
                        .map(r => {
                            return {
                                id: r.F0005_KY.trim(' '),
                                name: r.F0005_DL01
                            };
                        });
                    const logStats = response.ds_1_F98210.output
                        .map(r => {
                            return {
                                code: r.groupBy.OMWAC,
                                date: (r.groupBy.UPMJ / 1000 + TIMEZONE_ADJUST).toString(),
                                count: r.COUNT
                            };
                        });
                    const projects: IProjectStatus = {
                        current: response.ds_2_F98220.output
                            .map(r => {
                                const status = projectStatuses.find(s => s.id === r.groupBy.OMWPS);
                                return {
                                    status: `${r.groupBy.OMWPS} - ${status ? status.name : 'N/A'}`,
                                    count: r.COUNT
                                };
                            }),
                        map: response.ds_3_F98220.output
                            .reduce((a, r) => {
                                a[(r.groupBy.OMWCD / 1000 + TIMEZONE_ADJUST).toString()] = r.COUNT;
                                return a;
                            }, {}),
                        min: Math.min(...response.ds_3_F98220.output.map(r => r.COUNT)),
                        max: Math.max(...response.ds_3_F98220.output.map(r => r.COUNT))
                    };
                    const users = {
                        maps: response.ds_4_F98210.output
                            .reduce((a: IUserMap[], r) => {
                                const user = r.groupBy.USER;
                                const dateKey = (r.groupBy.UPMJ / 1000 + TIMEZONE_ADJUST).toString();
                                const current = a.find(e => e.user === user);
                                if (current) {
                                    current.map[dateKey] = r.COUNT;
                                } else {
                                    const value = { user, map: {} };
                                    value.map[dateKey] = r.COUNT;
                                    a.push(value);
                                }
                                return a;
                            }, []),
                        min: Math.min(...response.ds_4_F98210.output.map(r => r.COUNT)),
                        max: Math.max(...response.ds_4_F98210.output.map(r => r.COUNT))
                    };
                    const builds = response.ds_5_F96215.output
                        .sort((a, b) => b.BLDDTE_MAX - a.BLDDTE_MAX)
                        .map(r => {
                            var year = Math.trunc(r.BLDDTE_MAX / 1000) + 1900;
                            var days = r.BLDDTE_MAX % 1000 - 1;
                            var build = new Date(`${year}-01-01`);
                            build.setDate(build.getDate() + days);
                            return {
                                pathcode: r.groupBy.PATHCD,
                                build
                            }
                        });
                    const rows38: any[] = logStats
                        .filter(r => r.code === '38');
                    const rows02: any[] = logStats
                        .filter(r => r.code === '02');
                    const transferData = rows38
                        .reduce((a, r) => {
                            a[r.date] = r.count;
                            return a;
                        }, {});
                    const checkInsData = rows02
                        .reduce((a, r) => {
                            a[r.date] = r.count;
                            return a;
                        }, {});
                    this.e1Stats = {
                        projectStatuses,
                        activityStatuses: udcs
                            .filter(r => r.F0005_RT === 'AC')
                            .map(r => {
                                return {
                                    id: r.F0005_KY.trim(' '),
                                    name: r.F0005_DL01
                                };
                            }),
                        projects,
                        transfers: {
                            map: transferData,
                            max: Math.max(...rows38.map(r => r.count)),
                            min: Math.min(...rows38.map(r => r.count))
                        },
                        checkIns: {
                            map: checkInsData,
                            max: Math.max(...rows02.map(r => r.count)),
                            min: Math.min(...rows02.map(r => r.count))
                        },
                        builds,
                        users
                    };
                    Actions.KeySave([StoreKeys.e1, this.e1Stats]);
                    resolve(true);
                });
            }
        });
    }
    constructor(public data: Map<string, any>) {
    }
}