import * as SecureStore from 'expo-secure-store';
import { useAppContext } from "../context/AppContext";

export const useChannels = () => {
    const { lists, actionAddLists } = useAppContext()

    const initLoad = async() => {
        await loadLists()
    }

    const loadLists = async() => {
        try {
            const savedLists = await SecureStore.getItemAsync('lists')

            if (savedLists) {
                const data = JSON.parse(savedLists)

                if (data) {
                    Object.keys(data).forEach((listName) => {
                        actionAddLists(listName, data[listName])
                    })
                }
            }
        } catch (error) {
            console.error('Error al cargar la lista de canales:', error)
        }
    }

    return {
        initLoad,
        lists
    }
}