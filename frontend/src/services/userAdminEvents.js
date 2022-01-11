import { useState, useEffect } from 'react';
import { getUserAdminEvents } from './UserService';

export default function useAdminGroups(user_id) {
    const [adminEvents, setEvents] = useState([]);
    

    useEffect(() => {
        let isSubscribed = true && user_id != 0
        const fetchEvents = async () => {
            const events = await getUserAdminEvents(user_id)
            if (isSubscribed) setEvents(events)
        }

        fetchEvents()
        .catch(console.error)


        return () => isSubscribed = false
    }, [])

    return adminEvents
}
