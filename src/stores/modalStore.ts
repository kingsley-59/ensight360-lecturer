import { produce } from 'immer';
import { create } from 'zustand'


interface ModalControl {
    open: boolean;
    setOpen: (isOpen: boolean, successMsg?: string) => void;
}

type ModalState = {
    welcomeModal: ModalControl;
    addLocationModal: ModalControl;
    addPayRatesModal: ModalControl;
    assignShiftModal: ModalControl;
    availabilityModal: ModalControl;
    activeNowModal: ModalControl;
    addEmployeeModal: ModalControl;
    forgotPasswordModal: ModalControl;
    newPasswordModal: ModalControl;
    passwordChangedModal: ModalControl;
    notificationModal: ModalControl;
    successModal: ModalControl & {
        title: string,
        subTitle?: string,
        onClickNext?: () => any
    };
}

const useModalStore = create<ModalState>(set => ({
    welcomeModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, welcomeModal: { ...state.welcomeModal, open: isOpen } }))
        }
    },
    addLocationModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, addLocationModal: { ...state.addLocationModal, open: isOpen } }))
        }
    },
    addPayRatesModal: {
        open: false,
        setOpen: (isOpen, successMsg) => {
            set(produce((state: ModalState) => {
                state.addPayRatesModal.open = isOpen;
                state.successModal.title = successMsg ?? '';
                if (successMsg) {
                    state.successModal.open = true;
                }
            }))

            if (successMsg) {
                setTimeout(() => {
                    set(produce((state: ModalState) => {
                        state.successModal.open = false;
                        state.successModal.title = '';
                    }));
                }, 2000);
            }
        }
    },
    assignShiftModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, assignShiftModal: { ...state.assignShiftModal, open: isOpen } }))
        }
    },
    availabilityModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, availabilityModal: { ...state.availabilityModal, open: isOpen } }))
        }
    },
    activeNowModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, activeNowModal: { ...state.activeNowModal, open: isOpen } }))
        }
    },
    addEmployeeModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, addEmployeeModal: { ...state.addEmployeeModal, open: isOpen } }))
        }
    },
    forgotPasswordModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, forgotPasswordModal: { ...state.forgotPasswordModal, open: isOpen } }))
        }
    },
    newPasswordModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, newPasswordModal: { ...state.newPasswordModal, open: isOpen } }))
        }
    },
    passwordChangedModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, passwordChangedModal: { ...state.passwordChangedModal, open: isOpen } }))
        }
    },
    notificationModal: {
        open: false,
        setOpen: (isOpen) => {
            set(state => ({ ...state, notificationModal: { ...state.notificationModal, open: isOpen } }))
        }
    },
    successModal: {
        open: false,
        setOpen: (isOpen) => {
            set(produce((state: ModalState) => { state.successModal.open = isOpen }))
            // set(state => ({...state, successModal: {...state.successModal, open: isOpen}}))
        },
        title: '',
    },
}))

export default useModalStore;