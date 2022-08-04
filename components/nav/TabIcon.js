import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function TabActions({ iconName, color, focused }) {
    return ( 
        <Ionicons 
            name={focused? iconName : `${iconName}-outline`} 
            color={color} 
            size={22}
        />
    );     
}