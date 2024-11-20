import * as SecureStore from 'expo-secure-store';
import { useAppContext } from "../context/AppContext";
import { IChannel } from '../interfaces/channels';

export const useChannels = () => {
    const { actionAddLists } = useAppContext()

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

    const saveChannelList = async (listName: string, channels: IChannel[]) => {
        try {
          const storedLists = await SecureStore.getItemAsync('lists')
          const lists = storedLists ? JSON.parse(storedLists) : {}
      
          lists[listName] = channels

          await SecureStore.setItemAsync('lists', JSON.stringify(lists))
          console.log(`Lista "${listName}" guardada correctamente.`)
        } catch (error) {
          console.error('Error al guardar la lista de canales:', error)
        }
    }

    const clearChannelList = async () => {
        try {
            await SecureStore.deleteItemAsync('lists')
            console.log('Lista de canales eliminada correctamente.')
        } catch (error) {
            console.error('Error al eliminar la lista de canales:', error)
        }
    }

    return {
        initLoad,
        saveChannelList,
        clearChannelList
    }
}