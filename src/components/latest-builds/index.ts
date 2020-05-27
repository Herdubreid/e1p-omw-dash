//** Latest Builds Component */
import './style.scss';
import 'bootstrap';
import * as ko from 'knockout';
import moment from 'moment';
import 'datatables.net-bs4';
import { IPage, IBuild } from '../../state';

const COMPONENT = 'e1p-latest-builds';

class ViewModel {
    visible$: ko.Observable<boolean>;
    page: IPage;
    data: IBuild[];
    pathcode$ = ko.observable<string>();
    table: DataTables.Api;
    since = (dt) => moment().diff(dt, 'days') > 1
        ? moment(dt).from(moment().utc(true).startOf('day'))
        : 'Today';
    dateFormat = (dt) => moment(dt).format('dddd, MMMM Do YYYY');
    getDetails = (data) => {
        this.pathcode$(data.pathcode);
        const rq = {
            dataServiceType: 'BROWSE',
            outputType: 'GRID_DATA',
            targetType: 'table',
            targetName: 'F96215',
            findOnEntry: 'TRUE',
            returnControlIDs: 'PKGNAME|BLDDTE|BLDTME|BLDSTS|USER',
            maxPageSize: '50',
            aliasNaming: false,
            query: {
                matchType: 'MATCH_ALL',
                condition: [
                    {
                        value: [
                            {
                                content: data.pathcode,
                                specialValueId: 'LITERAL'
                            }
                        ],
                        controlId: 'F96215.PATHCD',
                        operator: 'EQUAL'
                    },
                    {
                        value: [
                            {
                                content: '1',
                                specialValueId: 'LITERAL'
                            }
                        ],
                        controlId: 'F96215.PKGBULFUT4',
                        operator: 'EQUAL'
                    }
                ]
            },
            aggregation: {
                orderBy: [
                    {
                        column: "F96215.BLDDTE",
                        direction: "DESC"
                    },
                    {
                        column: "F96215.BLDTME",
                        direction: "DESC"
                    }
                ]
            }
        };
        $(`#modal-${this.page.id}`).modal();
        callAISService(rq, DATA_SERVICE, response => {
            console.log(response);
            this.table
                .clear()
                .rows.add(response.fs_DATABROWSE_F96215.data.gridData.rowset)
                .draw();
        });
    };
    descendantsComplete = () => {
        // Table
        this.table = $(`#table-${this.page.id}`).DataTable({
            dom: 't',
            scrollY: '30vh',
            paging: false,
            ordering: false,
            data: [],
            columns: [
                {
                    title: 'Date',
                    data: 'F96215_BLDDTE',
                    render: data => moment(data, 'YYYYMMDD').format('ddd, MMM Do YYYY')
                },
                {
                    title: 'Time',
                    data: 'F96215_BLDTME',
                    render: data => {
                        const tm = data.toString().padStart(6, '0');
                        return `${tm.slice(0, 2)}:${tm.slice(2, 4)}`;
                    }
                },
                {
                    title: 'Package',
                    data: 'F96215_PKGNAME'
                },
                {
                    title: 'Status',
                    data: 'F96215_BLDSTS'
                },
                {
                    title: 'By',
                    data: 'F96215_USER'
                }
            ]
        });
    }
    constructor(params: { page: IPage }) {
        this.visible$ = params.page.visible$;
        this.page = params.page;
        this.data = params.page.data;
    }
}

ko.components.register(COMPONENT, {
    viewModel: {
        createViewModel: (params, componentInfo) => {
            const vm = new ViewModel(params);
            const sub = (ko as any).bindingEvent
                .subscribe(componentInfo.element, 'descendantsComplete', vm.descendantsComplete);
            (vm as any).dispose = () => sub.dispose();
            return vm;
        }
    },
    template: require('./template.html')
});
