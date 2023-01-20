import { gql, useQuery } from "@apollo/client";
import React, {useState} from "react";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";


const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomParts
        }
    }
    ${ROOM_FRAGMENT}
`;

export default function Rooms() { 
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const { data, loading, refetch } = useQuery(SEE_ROOMS_QUERY);
    const renderItem = ({item: room}) => <RoomItem {...room} />; 
    //console.log(data);
  

    return (

        <ScreenLayout loading={loading}>
                <FlatList 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    data={data?.seeRooms}
                    keyExtractor={(room) => "" + room.id}
                    renderItem={renderItem}
                />
        </ScreenLayout>
    );
}