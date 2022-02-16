import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';

const renderLocal = ({ locals, navigation }) => {
    const { colors } = useTheme()

    const Category = ( index, category ) => {
        return <View key={`club-category-${index}`} style={styles.categoryContainer}>
            <Text style={{ color: colors.text, fontStyle: 'italic', fontSize: 12, lineHeight: 14 }}>
                 {`${category.title}`}
            </Text>
        </View>
    }

    return (
        <>
            {
                locals.map((item, index) => (
                    item.image_url ?
                    <View key={`club-${index}`}>  
                        <TouchableOpacity style={styles.clubContainer} 
                            onPress={() => navigation.navigate('Local', { local: item })}
                            >
                            <View style={[styles.open, { backgroundColor: !item.isclosed ? '#1eb516' : '#eb4034', elevation: 12 }]}>
                                <Text style={styles.isOpenText}>{!item.is_closed ? 'OPEN' : 'CLOSED' }</Text>
                            </View>
                            <Image source={{ uri: item.image_url }} style={{ height: 120, width: "100%", borderRadius: 14 }} />
                            <View style={styles.clubInfo}>
                                <View>
                                    <Text allowFontScaling={false} style={{ color: colors.text, fontWeight: 'bold', fontSize: 18, lineHeight: 20 }}>{item.name}</Text>
                                    <Text allowFontScaling={false} style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, maxWidth: 120 }}>{item.location.address1}, {item.location.zip_code}</Text>
                                </View>
            
                                <View style={{ flexDirection: 'column', marginBottom: 4, marginLeft: 5 }}>
                                    { 
                                       item.categories.map((category, index) => 
                                        Category( index, category ) ) 
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : null
                ))
            }
        </>
    )
}

export default renderLocal

const styles = StyleSheet.create({
    clubContainer: {
        marginVertical: 10, 
        backgroundColor: '#393939', 
        height: 175, 
        width: "100%", 
        borderRadius: 14, 
        alignContent: 'center',
        justifyContent: 'center'
    },
    clubInfo: {
        marginVertical: 5,
        paddingHorizontal: 20,
        justifyContent: 'space-between', 
        flexDirection: 'row',
    },
    open: {
        position: 'absolute', 
        borderRadius: 69,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 69,
        top: 10,
        left: 10,
    },
    isOpenText: {
        color: "white",
        fontWeight: 'bold'
    },
    categoryContainer: {
        paddingHorizontal: 8,
        backgroundColor: 'black',
        borderRadius: 10,
        maxHeight: 14, 
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
