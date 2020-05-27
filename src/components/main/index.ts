//** Navigation Component */
import './style.scss';
import 'bootstrap';
import * as ko from 'knockout';
import { IPage } from '../../state';
import { StoreKeys, Actions, KeyStore } from '../../store';
import { Services } from '../../services';

export const MAIN_COMPONENT = 'e1p-nav';

export let Main: ViewModel;

class ViewModel {
    services: Services;
    pages: IPage [];
    saveView() {
        Actions.KeySave([StoreKeys.view, Main.pages.map(p => [p.id, p.order$(), p.visible$()])]);
    }
    toggle(page: IPage) {
        const visible = !page.visible$();
        if (visible) {
            Main.pages
                .filter(p => p.order$() < page.order$())
                .forEach(p => p.order$(p.order$() + 1));
            page.order$(1);
        }
        page.visible$(visible);
        Main.saveView();
    }
    descendantsComplete = () => {
        const view: any[] = KeyStore.getState().data.get(StoreKeys.view);
        if (view) {
            this.pages.forEach(p => {
                const v = view.find(e => e[0] === p.id);
                p.order$(v[1]);
                p.visible$(v[2]);
            });
        } else {
            this.pages[2].visible$(true);
        }
    }
    constructor(params: { data: Map<string, any>, services: Services }) {
        Main = this;
        this.services = params.services;
        this.pages = [
            {
                id: 'omw-log-stats-1',
                component: 'e1p-omw-log-stats',
                title: 'Check-in Activity',
                icon: 'fas fa-check',
                visible$: ko.observable(false),
                order$: ko.observable(1),
                data: {
                    type: '02',
                    ...params.data.get(StoreKeys.e1).checkIns
                }
            },
            {
                id: 'omw-log-stats-2',
                component: 'e1p-omw-log-stats',
                title: 'Status Change Activity',
                icon: 'fas fa-exchange-alt',
                visible$: ko.observable(false),
                order$: ko.observable(2),
                data: {
                    type: '38',
                    ...params.data.get(StoreKeys.e1).transfers
                }
            },
            {
                id: 'omw-proj-stats-1',
                component: 'e1p-omw-proj-stats',
                title: 'Project Statistics',
                icon: 'fas fa-project-diagram',
                visible$: ko.observable(false),
                order$: ko.observable(3),
                data: params.data.get(StoreKeys.e1).projects
            },
            {
                id: 'omw-user-stats',
                component: 'e1p-omw-user-stats',
                title: 'User Statistics',
                icon: 'fas fa-user',
                visible$: ko.observable(false),
                order$: ko.observable(4),
                data: params.data.get(StoreKeys.e1).users
            },
            {
                id: 'latest-builds',
                component: 'e1p-latest-builds',
                title: 'Latest Builds',
                icon: 'fa fa-gift',
                visible$: ko.observable(false),
                order$: ko.observable(5),
                data: params.data.get(StoreKeys.e1).builds
            }
        ];
    }
}

ko.components.register(MAIN_COMPONENT, {
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
