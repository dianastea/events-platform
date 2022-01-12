
import { useState, useEffect } from 'react';
import {getUserGroups} from './UserService'

export default function useUserGroups(user_id) {
    const [groups, setGroups] = useState([]);
  
    useEffect(() => {
        let isSubscribed = true && user_id != 0

        const updateGroups = async () => {
            const groups = await getUserGroups(user_id)
            if (isSubscribed) {
                setGroups(groups)
            }
            
        }

        updateGroups().catch(console.error)

        return () => isSubscribed = false
    })

    return groups
}