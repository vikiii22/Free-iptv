import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../context/AppContext";

export const useChannels = () => {
    const { lists, actionAddLists } = useAppContext()

    const initLoad = async() => {
        await loadLists()
    }

    const loadLists = async() => {
        try {
            const savedLists = await AsyncStorage.getItem('lists')
            if (savedLists) {
                const data = JSON.parse(savedLists)

                if (data?.lists) {
                    Object.keys(data.lists).forEach((listName) => {
                        actionAddLists(listName, data.lists[listName])
                    })
                }
            }
        } catch (error) {
            console.error('Error al cargar la lista de canales:', error)
        }
    }

    return {
        initLoad
    }
}