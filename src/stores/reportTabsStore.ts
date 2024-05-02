import { create } from "zustand";


interface TabControl {
    currentTab: number;
    setCurrentTab: (tab: number) => void;
}

type TabState = {
    reportTabs: TabControl;
}

const useTabStore = create<TabState>((set) => ({
    reportTabs: {
        currentTab: 0,
        setCurrentTab: (tab) => (
            set(state => ({...state, reportTabs: {...state.reportTabs, currentTab: tab}}))
        )
    }
}))

export default useTabStore;