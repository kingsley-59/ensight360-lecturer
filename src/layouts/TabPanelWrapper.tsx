import { ReactNode } from 'react';



export default function TabPanelWrapper({ children, index, currentTab }: { children: ReactNode, index: number, currentTab: number }) {
    return (
        <div style={{display: (currentTab == index) ? 'block' : 'none'}}>
            {children}
        </div>
    )
}
