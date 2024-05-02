// useOnboardingStore.ts
import { create } from 'zustand';

type OnboardingState = {
    currentStep: number;
    completedSteps: number[];
    setNextStep: () => void;
    setStepDone: (step: number) => void;
};

const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: 1,
    completedSteps: [1],
    setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1, completedSteps: [...state.completedSteps, state.currentStep] })),
    setStepDone: (step) => set((state) => ({ completedSteps: [...state.completedSteps, step], currentStep: state.currentStep + 1 })),
}));

export default useOnboardingStore;