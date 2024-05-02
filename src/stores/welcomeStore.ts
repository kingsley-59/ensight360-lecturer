import { create } from "zustand";
import { produce } from 'immer'


type WelcomeState = {
    percent: number;
    steps: {
        title: string,
        done: boolean
    }[];
    currentStep: number;
    completed: boolean;
    skipped: boolean;
    setDone: (step: number) => void;
    setComplete: () => void;
}

// allAds: {
//     data: [],
//     setData(data) {
//         set(produce((state: AdvertStore) => {state.allAds.data = data}))
//     },
//     currentPage: 1,
//     setCurrentPage(page) {
//         set(produce((state: AdvertStore) => {state.allAds.currentPage = page}))
//     },
// },

const useWelcomeStore = create<WelcomeState>((set) => ({
    percent: 25,
    steps: [
        {title: 'Create your account', done: true},
        {title: 'Add work locations', done: false},
        {title: 'Add pay rates and categories', done: false},
        {title: 'Employee Registeration', done: false},
        {title: 'Start managing shifts', done: false},
    ],
    currentStep: 1,
    completed: false,
    skipped: false,
    // setDone: (index) => {
    //     set(state => {
    //         if (index >= 1 && index <= state.steps.length) {
    //             const updatedSteps = state.steps.map((step, idx) => idx == index - 1 ? ({...step, done: true}) : step)
    //             const completedSteps = updatedSteps.filter(s => s.done).length
    //             const percentDone = (completedSteps / updatedSteps.length) * 100
    //             const completed = state.percent == 100
    //             const currentStep = !completed ? index + 1 : 5
    //             return {...state, currentStep, completed, percent: percentDone, steps: updatedSteps}
    //         } else return state
    //     })
    // },
    setDone(step: number) {
        set(produce((state: WelcomeState) => {
            state.steps[step - 1].done = true;
            state.percent = (state.steps.filter(s => s.done).length / state.steps.length) * 100
            state.currentStep = state.steps.findIndex(s => !s.done)
            state.completed = state.percent == 100
        }))
    },
    setComplete: () => set(state => ({...state, currentStep: -1, completed: true}))
}))

export default useWelcomeStore;