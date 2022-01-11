
import { useState, useEffect } from 'react';
import {getUserInfo, getUserAdminGroups} from './UserService'

export default function useUserInfo() {
    const [user, setUser] = useState({google_id: 0, id: 0});
  
    useEffect(() => {
        let isSubscribed = true 

        const updateUser = async () => {
            const thisUser = await getUserInfo()
            if (isSubscribed) {
                setUser(thisUser)
            }
            
        }

        updateUser().catch(console.error)

        return () => isSubscribed = false
    })

    return user
}