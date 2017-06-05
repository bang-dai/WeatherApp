import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import globalStyle from '../../Style'
import moment from 'moment'
import 'moment/locale/fr'
import FadeInView from '../animation/FadeInView'

moment.locale('fr')

export default class Row extends React.Component {

    static propTypes = {
        day: React.PropTypes.object,
        index: React.PropTypes.number
    }

    day () {
        let day = moment(this.props.day.dt * 1000).format('ddd')
        return (
            <Text style={[style.white, style.bold]}>{ day.toUpperCase() }</Text>
        )
    }

    icon (size = 32) {
        const type = this.props.day.weather[0].main.toLowerCase()
        let image
        switch (type) {
            case 'clouds':
                image = require('./icons/cloudy.png')
                break
            case 'rain':
                image = require('./icons/rainy.png')
                break
            default:
                image = require('./icons/sunny.png')

        }
        return <Image source={ image } style={{width: size, height: size}} />
    }

    date () {
        let day = moment(this.props.day.dt * 1000).format('DD/MM')
        return (
            <Text style={style.white}>{ day }</Text>
        )
    }

    render () {
        if(this.props.index === 0) {
            return (
                <View style={[style.view, style.firstView]}>
                    { this.icon(90) }
                    <Text>{this.day()} {this.date()}</Text>
                    <Text style={[style.temp, {fontSize: 35}]}>{Math.round(this.props.day.temp.day)}°C</Text>
                </View>
            )
        } else {
            return (
                <View style={style.view}>
                    { this.icon() }
                    <Text>{this.day()} {this.date()}</Text>
                    <Text style={style.temp}>{Math.round(this.props.day.temp.day)}°C</Text>
                </View>
            )
        }
    }
}

const style = StyleSheet.create({
    white: {
        color: '#FFF'
    },
    bold: {
        fontWeight: 'bold'
    },
    firstView: {
        backgroundColor: '#e54b65'
    },
    view: {
        backgroundColor: globalStyle.color,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    temp: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22
    }
})