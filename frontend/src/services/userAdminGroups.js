
import { useState, useEffect } from 'react';
import {getUserAdminGroups} from './UserService'

export default function useAdminGroups(user_id) {
    const [adminGroups, setGroups] = useState([]);
  
    useEffect(() => {
        let isSubscribed = true 

        const updateGroups = async () => {
            const adminGroups = await getUserAdminGroups(user_id)
            if (isSubscribed) {
                setGroups(adminGroups)
            }
            
        }

        updateGroups().catch(console.error)

        return () => isSubscribed = false
    })

    return adminGroups
}