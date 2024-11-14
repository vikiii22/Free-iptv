import { createContext, useContext } from 'react'
import { useState } from 'react'
import { IChannel } from '../interfaces/channels'
import { ISession } from '../interfaces/session'
import { ISnackbar } from '../interfaces/snackbar'

interface AppContext {
    session: ISession,
    lists: {
        [listName: string]: IChannel[]
    }
    snackbar: ISnackbar
    actionAddSessionData: (data: ISession) => void
    actionShowScnackbar: (open: boolean, message: string) => void
    actionAddLists: (listName: string, channels: IChannel[]) => void
}

const AppContext = createContext<AppContext | undefined>(undefined)

const AppContextProvider = ({ children }: { children: any }) => {
    const [ appData, setAppData ] = useState<AppContext>({
        session: null,
        lists: {},
        snackbar: { open: false, message: ""},
        actionAddSessionData,
        actionShowScnackbar,
        actionAddLists
    })

    function actionAddSessionData(user: ISession) {
        setAppData((prev) => ({
            ...prev,
            session: user,
        }))
    }

    function actionShowScnackbar(open: boolean, message: string) {
        setAppData((prev: any) => {
            return {
                ...prev,
                snackbar: {
                    ...prev.snackbar,
                    open: open,
                    message: message
                }
            }
        })
    }

    function actionAddLists(listName: string, channels: IChannel[]) {
        setAppData((prev) => ({
            ...prev,
            lists: {
                ...prev.lists,
                [listName]: channels
            }
        }))
    }

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider')
    }
    return context
}

export { AppContextProvider, useAppContext }
