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
    actionRemoveList: (listName: string) => void
    actionSetSelectedList: (listName: string) => void
    actionToggleFavorites: (id: string, add: boolean) => void
}

const AppContext = createContext<AppContext | undefined>(undefined)

const AppContextProvider = ({ children }: { children: any }) => {
    const [ appData, setAppData ] = useState<AppContext>({
        session: null,
        lists: {},
        snackbar: { open: false, message: ""},
        actionAddSessionData,
        actionShowScnackbar,
        actionAddLists,
        actionRemoveList,
        actionSetSelectedList,
        actionToggleFavorites
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
            session: {
                ...prev.session,
                selectedList: prev.session && prev.session.selectedList === "" && !prev.lists ? listName : prev.session ? prev.session.selectedList : ""
            },
            lists: {
                ...prev.lists,
                [listName]: channels
            }
        }))
    }

    function actionSetSelectedList(listName: string) {
        setAppData((prev) => ({
            ...prev,
            session: {
                ...prev.session,
                selectedList: listName ?? null
            }
        }))
    }

    function actionRemoveList(listName: string) {
        setAppData((prev) => {
            const { [listName]: _, ...remainingLists } = prev.lists

            return {
                ...prev,
                session: {
                    ...prev.session,
                    selectedList: prev.session.selectedList === listName && Object.keys(remainingLists).length === 0
                        ? ""
                        : prev.session.selectedList === listName && Object.keys(remainingLists).length > 0
                            ? Object.keys(remainingLists)[0]
                            : prev.session.selectedList
                },
                lists: remainingLists
            }
        })
    }

    function actionToggleFavorites(channelId: string, add: boolean) {
        setAppData((prev) => ({
            ...prev,
            lists: {
                ...prev.lists,
                [prev.session.selectedList]: [
                    ...prev.lists[prev.session.selectedList].map(channel => {
                        if (channel.id === channelId) {
                            return { ...channel, favorite: add }
                        } else {
                            return channel
                        }
                    })
                ]
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
