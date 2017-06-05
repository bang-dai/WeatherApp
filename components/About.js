import React from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'
import style from '../Style'

export default class About extends React.Component {

    static navigationOptions = {
        tabBarIcon: () => {
           return <Image source={require('./icons/user.png')} style={{width: 32, height: 32}}/>
        }
    }

    search () {
        this.props.navigation.navigate('Search')
    }

    render () {
        return (
            <View style={style.container}>
                <Text style={style.title}>A propos de l'application</Text>
                <Text>
                    Application développé par Bang DAI avec React Native.
                    Ceci est un POC.
                </Text>
                <Button style={{paddingVertical: 20}} color={style.color} onPress={() => this.search()} title="Rechercher"/>
            </View>
        )
    }
}
